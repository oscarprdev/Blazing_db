import { ICreateProjectUsecase } from './create-project.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';
import { z } from 'zod';

export interface ICreateProjectHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

const CreateProjectSectionSchema = z.object({
	databaseUrl: z.string(),
	projectTitle: z.string(),
	type: z.string(),
});

export class CreateProjectHandler implements ICreateProjectHandler {
	constructor(private readonly createProjectUsecase: ICreateProjectUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const { data } = await this.extractPayload(request);
			const userId = request.params.userId;
			if (!userId) throw new Error('UserId is required');
			if (!data.type || !data.projectTitle || !data.databaseUrl) throw new Error('Payload not valid');

			const response = await this.createProjectUsecase.execute({
				databaseUrl: data.databaseUrl,
				projectTitle: data.projectTitle,
				type: data.type,
				userId,
			});

			return new Response(
				JSON.stringify({
					data: response,
					message: 'Project created successfully',
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

		const { error } = CreateProjectSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new Error('Request payload not valid');
		}

		return { data: bodyParsed };
	}
}
