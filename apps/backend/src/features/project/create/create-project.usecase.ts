import { CreateProjectPorts } from './create-project.ports';
import { CreateProjectTypes } from './create-project.types';

export interface ICreateProjectUsecase {
	execute(input: CreateProjectTypes.CreateProjectInput): Promise<CreateProjectTypes.CreateProjectOutput>;
}

export class CreateProjectUsecase implements ICreateProjectUsecase {
	constructor(private readonly ports: CreateProjectPorts) {}

	async execute({ userId, databaseUrl, projectTitle, type }: CreateProjectTypes.CreateProjectInput) {
		const projectid = await this.ports.describeProject(databaseUrl);
		if (projectid) throw new Error('Project with same database url already exists');

		return { projectId: await this.ports.intertProject({ userId, databaseUrl, projectTitle, type }) };
	}
}
