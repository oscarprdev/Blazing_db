import { QueryDb } from '@/types';

export namespace ListQueryTypes {
	export type ListQueryUsecaseInput = {
		projectId: string;
	};

	export type ListQueryUsecaseOutput = {
		queries: QueryDb[];
	};

	export type QueryInfra = {
		queryid: string;
		value: string;
		language: string;
		createdat: string;
		response: string;
		projectownerid: string;
	};
}
