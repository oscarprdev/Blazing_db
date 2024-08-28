import { ProjectType, QueryLanguage } from '@/types';

export interface CreateQueryPorts {
	describeProject(projectId: string): Promise<CreateQueryPortsTypes.DescribeProjectOutput>;
	describeQuery(queryId: string): Promise<CreateQueryPortsTypes.DescribeQueryOutput>;
	applyQuery(input: CreateQueryPortsTypes.ApplyQueryInput): Promise<CreateQueryPortsTypes.ApplyQueryOutput>;
	storeQuery(input: CreateQueryPortsTypes.StoreQueryInput): Promise<void>;
	updateQuery(input: CreateQueryPortsTypes.UpdateQueryInput): Promise<void>;
}

export namespace CreateQueryPortsTypes {
	export type DescribeProjectOutput = {
		type: ProjectType;
		title: string;
		databaseUrl: string | null;
	};

	export type DescribeQueryOutput = {
		queryId: string;
	};

	export type ApplyQueryInput = {
		query: string;
		databaseUrl: string;
	};

	export type ApplyQueryOutput = {
		response: string;
	};

	export type StoreQueryInput = {
		projectId: string;
		query: string;
		language: QueryLanguage;
		response: string;
	};

	export type UpdateQueryInput = {
		queryId: string;
		query: string;
		response: string;
		language: QueryLanguage;
	};
}
