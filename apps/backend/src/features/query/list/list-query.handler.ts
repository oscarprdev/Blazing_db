import { IListQueryUsecase } from './list-query.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';

export interface IListQueryHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

export class ListQueryHandler implements IListQueryHandler {
	constructor(private readonly listQueryUsecase: IListQueryUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const projectId = request.params.projectId;
			if (!projectId) throw new Error('ProjectId is required');

			const response = await this.listQueryUsecase.execute({
				projectId,
			});

			return new Response(
				JSON.stringify({
					data: response,
					message: 'Queries listed successfully',
				}),
				{
					status: 201,
				}
			);
		} catch (error: unknown) {
			return handleError(error);
		}
	}
}
