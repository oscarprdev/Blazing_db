import { ProjectDb } from '@/types';

export interface ListProjectsPorts {
	list(userId: string): Promise<ListProjectsPortsTypes.ListOutput>;
}

export namespace ListProjectsPortsTypes {
	export type ListOutput = ProjectDb[];
}
