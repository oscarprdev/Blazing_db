import { ListProjectsTypes } from './list-project.types';
import { ListProjectsPorts } from './list-projects.ports';

export interface IListProjectsUsecase {
	execute(input: ListProjectsTypes.ListProjectsInput): Promise<ListProjectsTypes.ListProjectsOutput>;
}

export class ListProjectsUsecase implements IListProjectsUsecase {
	constructor(private readonly ports: ListProjectsPorts) {}

	async execute({ userId }: ListProjectsTypes.ListProjectsInput): Promise<ListProjectsTypes.ListProjectsOutput> {
		const projects = await this.ports.list(userId);

		return {
			projects: projects.map(project => ({
				projectId: project.projectid,
				title: project.title,
				type: project.type,
			})),
		};
	}
}
