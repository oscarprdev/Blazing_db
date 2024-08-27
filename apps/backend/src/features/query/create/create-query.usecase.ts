import { CreateQueryPorts } from './create-query.ports';
import { CreateQueryTypes } from './create-query.types';

export interface ICreateQueryUsecase {
	execute(input: CreateQueryTypes.CreateQueryInput): Promise<CreateQueryTypes.CreateQueryOutput>;
}

export class CreateQueryUsecase implements ICreateQueryUsecase {
	constructor(private readonly ports: CreateQueryPorts) {}

	async execute({ projectId, query, language }: CreateQueryTypes.CreateQueryInput) {
		const project = await this.ports.describeProject(projectId);
		if (!project || !project.databaseUrl) throw new Error('Error project not found');

		const { response } = await this.ports.applyQuery({ query, databaseUrl: project.databaseUrl });
		await this.ports.storeQuery({ projectId, query, language, response });

		return {
			response,
		};
	}
}
