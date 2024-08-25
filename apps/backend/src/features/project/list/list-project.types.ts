import { DatabaseTable, ProjectType, TableField } from '@/types';

export namespace ListProjectsTypes {
	export type ListProjectsInput = {
		userId: string;
	};

	export type ListProjectsOutput = {
		projects: PojectInfo[];
	};

	export type PojectInfo = {
		projectId: string;
		title: string;
		type: ProjectType;
	};
}
