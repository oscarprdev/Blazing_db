import { IDescribeProjectUsecase } from './describe-project.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';

export interface IDescribeProjectHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

export class DescribeProjectHandler implements IDescribeProjectHandler {
	constructor(private readonly describeProjectUsecase: IDescribeProjectUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const projectId = request.params.projectId;
			if (!projectId) throw new Error('ProjectId is required');

			const response = await this.describeProjectUsecase.execute({
				projectId,
			});

			return new Response(
				JSON.stringify({
					data: response,
					message: 'Project described successfully',
				}),
				{
					status: 201,
				}
			);
		} catch (error: unknown) {
			console.log(error);
			return handleError(error);
		}
	}
}
