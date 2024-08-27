import { ProjectType, QueryDb } from '@/types';

export interface ListQueryPorts {
	describeProject(projectId: string): Promise<ListQueryPorts.DescribeDatabaseUrlOutput>;
	list(input: ListQueryPorts.ListInput): Promise<ListQueryPorts.ListOutput>;
}

export namespace ListQueryPorts {
	export type ListInput = {
		projectId: string;
	};

	export type ListOutput = {
		queries: QueryDb[];
	};

	export type DescribeDatabaseUrlOutput = {
		type: ProjectType;
		title: string;
		databaseUrl: string | null;
	};
}
