import { DescribeTablePorts } from './describe-table.ports';
import { DescribeTableTypes } from './describe-table.types';

export interface IDescribeTableUsecase {
	execute(input: DescribeTableTypes.ExecuteInput): Promise<DescribeTableTypes.ExecuteOutput>;
}

export class DescribeTableUsecase implements IDescribeTableUsecase {
	constructor(private readonly ports: DescribeTablePorts) {}

	async execute({
		projectId,
		tableTitle,
	}: DescribeTableTypes.ExecuteInput): Promise<DescribeTableTypes.ExecuteOutput> {
		const project = await this.ports.describeProjectInfo(projectId);
		if (!project || !project.databaseUrl) throw new Error('Error project not found');

		const res = await this.ports.describeTable({ tableTitle, databaseUrl: project.databaseUrl });

		return res.map(obj => Object.entries(obj).map(entry => ({ key: entry[0], value: entry[1] })));
	}
}
