import { QueryLanguage } from '@/types';

export namespace CreateQueryTypes {
	export type CreateQueryInput = {
		projectId: string;
		query: string;
		language: QueryLanguage;
		queryId?: string;
	};

	export type CreateQueryOutput = {
		response: string;
	};
}
