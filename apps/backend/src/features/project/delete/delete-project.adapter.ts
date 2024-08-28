import { DeleteProjectInfra } from './delete-project.infra';
import { DeleteProjectPorts, DeleteProjectPortsTypes } from './delete-project.ports';
import { ProjectType } from '@/types';

export class DeleteProjectAdapter implements DeleteProjectPorts {
	constructor(private readonly infra: DeleteProjectInfra) {}

	async delete(projectId: string): Promise<void> {
		await this.infra.delete(projectId);
	}

	async describeProject(projectId: string): Promise<DeleteProjectPortsTypes.DescribeProjectOutput> {
		const res = await this.infra.describeProject(projectId);

		return {
			type: res.type as ProjectType,
			title: res.title,
			databaseUrl: res.url,
		};
	}
}
