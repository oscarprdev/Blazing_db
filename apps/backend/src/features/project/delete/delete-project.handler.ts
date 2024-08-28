import { IDeleteProjectUsecase } from './delete-project.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';

export interface IDeleteProjectHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

export class DeleteProjectHandler implements IDeleteProjectHandler {
	constructor(private readonly deleteProjectUsecase: IDeleteProjectUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const projectId = request.params.projectId;
			if (!projectId) throw new Error('Project id is required');

			await this.deleteProjectUsecase.execute({
				projectId,
			});

			return new Response(
				JSON.stringify({
					message: 'Project deleted successfully',
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
