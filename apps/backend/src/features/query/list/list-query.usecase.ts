import { ListQueryPorts } from './list-query.ports';
import { ListQueryTypes } from './list-query.types';

export interface IListQueryUsecase {
	execute(input: ListQueryTypes.ListQueryUsecaseInput): Promise<ListQueryTypes.ListQueryUsecaseOutput>;
}

export class ListQueryUsecase implements IListQueryUsecase {
	constructor(private readonly ports: ListQueryPorts) {}

	async execute({ projectId }: ListQueryTypes.ListQueryUsecaseInput): Promise<ListQueryTypes.ListQueryUsecaseOutput> {
		const project = await this.ports.describeProject(projectId);
		if (!project || !project.databaseUrl) throw new Error('Error project not found');

		return this.ports.list({ projectId });
	}
}
