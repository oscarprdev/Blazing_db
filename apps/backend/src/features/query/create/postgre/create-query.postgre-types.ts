import { QueryLanguage } from '@/types';

export namespace CreateQueryPostgreTypes {
	export type ApplyQueryInput = {
		query: string;
		databaseUrl: string;
	};

	export type StoreQueryInput = {
		projectId: string;
		query: string;
		response: string;
		language: QueryLanguage;
	};

	export type UpdateQueryInput = {
		queryId: string;
		query: string;
		response: string;
		language: QueryLanguage;
	};
}
