import { ProjectType } from '@/types';

export interface DescribeTablePorts {
	describeTable(input: DescribeTablePortsTypes.DescribeInput): Promise<DescribeTablePortsTypes.DescribeOutput>;
	describeProjectInfo(projectId: string): Promise<DescribeTablePortsTypes.DescribeProjectOutput>;
}

export namespace DescribeTablePortsTypes {
	export type DescribeInput = {
		tableTitle: string;
		databaseUrl: string;
	};

	export type DescribeOutput = Record<string, any>[];

	export type DescribeProjectOutput = {
		type: ProjectType;
		title: string;
		databaseUrl: string | null;
	};
}
