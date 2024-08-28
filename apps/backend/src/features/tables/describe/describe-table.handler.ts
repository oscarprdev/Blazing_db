import { IDescribeTableUsecase } from './describe-table.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';

export interface IDescribeTableHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

export class DescribeTableHandler implements IDescribeTableHandler {
	constructor(private readonly describeTableUsecase: IDescribeTableUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const table = request.params.table;
			const projectId = request.params.projectId;
			if (!table) throw new Error('Table is required');
			if (!projectId) throw new Error('ProjectId is required');

			const response = await this.describeTableUsecase.execute({
				tableTitle: table,
				projectId,
			});

			return new Response(
				JSON.stringify({
					data: response,
					message: 'Table values described successfully',
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
