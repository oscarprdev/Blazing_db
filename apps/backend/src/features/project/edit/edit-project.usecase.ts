import { EditProjectPorts } from './edit-project.ports';
import { EditProjectTypes } from './edit-project.types';

export interface IEditProjectUsecase {
	execute(input: EditProjectTypes.ExecuteInput): Promise<void>;
}

export class EditProjectUsecase implements IEditProjectUsecase {
	constructor(private readonly ports: EditProjectPorts) {}

	async execute({ projectId, title }: EditProjectTypes.ExecuteInput): Promise<void> {
		const projectid = await this.ports.describeProject(projectId);
		if (!projectid) throw new Error('Project with same database url already exists');

		await this.ports.editProject({ projectId, title });
	}
}
