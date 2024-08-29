import { IEditProjectUsecase } from './edit-project.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';
import { z } from 'zod';

export interface IEditProjectHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

const EditProjectSectionSchema = z.object({
	title: z.string(),
});

export class EditProjectHandler implements IEditProjectHandler {
	constructor(private readonly editProjectUsecase: IEditProjectUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const { data } = await this.extractPayload(request);
			const projectId = request.params.projectId;
			if (!projectId) throw new Error('Project id is required');
			if (!data.title) throw new Error('Payload not valid');

			const response = await this.editProjectUsecase.execute({
				projectId,
				title: data.title,
			});

			return new Response(
				JSON.stringify({
					data: response,
					message: 'Project edited successfully',
				}),
				{
					status: 201,
				}
			);
		} catch (error: unknown) {
			return handleError(error);
		}
	}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body);

		const { error } = EditProjectSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new Error('Request payload not valid');
		}

		return { data: bodyParsed };
	}
}
