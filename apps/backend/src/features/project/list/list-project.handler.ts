import { IListProjectsUsecase } from './list-project.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';

export interface IListProjectsHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

export class ListProjectsHandler implements IListProjectsHandler {
	constructor(private readonly listProjectsUsecase: IListProjectsUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const userId = request.params.userId;

			const response = await this.listProjectsUsecase.execute({ userId });

			return new Response(
				JSON.stringify({
					data: response,
					message: 'Project list requested successfully',
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
