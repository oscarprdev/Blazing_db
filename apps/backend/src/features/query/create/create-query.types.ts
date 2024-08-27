import { QueryLanguage } from '@/types';

export namespace CreateQueryTypes {
	export type CreateQueryInput = {
		projectId: string;
		query: string;
		language: QueryLanguage;
	};

	export type CreateQueryOutput = {
		response: string;
	};
}
