import { DatabaseTable, ProjectType, TableField } from '@/types';

export namespace CreateProjectTypes {
	export type CreateProjectInput = {
		userId: string;
		projectTitle: string;
		databaseUrl: string;
		type: string;
	};

	export type CreateProjectOutput = {
		projectId: string;
	};
}
