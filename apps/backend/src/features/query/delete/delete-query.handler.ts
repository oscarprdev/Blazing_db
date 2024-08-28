import { IDeleteQueryUsecase } from './delete-query.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';

export interface IDeleteQueryHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

export class DeleteQueryHandler implements IDeleteQueryHandler {
	constructor(private readonly deleteQueryUsecase: IDeleteQueryUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const queryId = request.params.queryId;
			if (!queryId) throw new Error('QueryId is required');

			const response = await this.deleteQueryUsecase.execute({
				queryId,
			});

			return new Response(
				JSON.stringify({
					data: response,
					message: 'Query deleted successfully',
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
