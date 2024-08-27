import { ICreateQueryUsecase } from './create-query.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';
import { z } from 'zod';

export interface ICreateQueryHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

const CreateQuerySectionSchema = z.object({
	query: z.string(),
	language: z.string(),
});

export class CreateQueryHandler implements ICreateQueryHandler {
	constructor(private readonly createQueryUsecase: ICreateQueryUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const { data } = await this.extractPayload(request);
			const projectId = request.params.projectId;
			if (!projectId) throw new Error('Project id is required');
			if (!data.query || !data.language) throw new Error('Payload not valid');

			const response = await this.createQueryUsecase.execute({
				query: data.query,
				language: data.language,
				projectId,
			});

			return new Response(
				JSON.stringify({
					data: response,
					message: 'Query created successfully',
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

		const { error } = CreateQuerySectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new Error('Request payload not valid');
		}

		return { data: bodyParsed };
	}
}
