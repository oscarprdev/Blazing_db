import { ProjectType } from '@/types';

export interface DeleteProjectPorts {
	describeProject(projectId: string): Promise<DeleteProjectPortsTypes.DescribeProjectOutput>;
	delete(projectId: string): Promise<void>;
}

export namespace DeleteProjectPortsTypes {
	export type DescribeProjectOutput = {
		type: ProjectType;
		title: string;
		databaseUrl: string | null;
	};
}
