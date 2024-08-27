import { ProjectType, QueryLanguage } from '@/types';

export interface CreateQueryPorts {
	describeProject(projectId: string): Promise<CreateQueryPortsTypes.DescribeDatabaseUrlOutput>;
	applyQuery(input: CreateQueryPortsTypes.ApplyQueryInput): Promise<CreateQueryPortsTypes.ApplyQueryOutput>;
	storeQuery(input: CreateQueryPortsTypes.StoreQueryInput): Promise<void>;
}

export namespace CreateQueryPortsTypes {
	export type DescribeDatabaseUrlOutput = {
		type: ProjectType;
		title: string;
		databaseUrl: string | null;
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
}
