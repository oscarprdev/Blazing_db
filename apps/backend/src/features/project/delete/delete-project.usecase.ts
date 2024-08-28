import { DeleteProjectPorts } from './delete-project.ports';
import { DeleteProjectTypes } from './delete-project.types';

export interface IDeleteProjectUsecase {
	execute(input: DeleteProjectTypes.ExecuteInput): Promise<void>;
}

export class DeleteProjectUsecase implements IDeleteProjectUsecase {
	constructor(private readonly ports: DeleteProjectPorts) {}

	async execute({ projectId }: DeleteProjectTypes.ExecuteInput): Promise<void> {
		const project = await this.ports.describeProject(projectId);
		if (!project.title) throw new Error('Project is not valid');

		await this.ports.delete(projectId);
	}
}
