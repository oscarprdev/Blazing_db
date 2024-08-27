import { CreateQueryPorts, CreateQueryPortsTypes } from '../create-query.ports';
import { CreateQueryPostgreInfra, ICreateQueryPostgreInfra } from './create-query.postgre.infra';
import { ProjectType } from '@/types';

export class CreateQueryPostreAdapter implements CreateQueryPorts {
	constructor(private readonly infra: CreateQueryPostgreInfra) {}

	async applyQuery({
		query,
		databaseUrl,
	}: CreateQueryPortsTypes.ApplyQueryInput): Promise<CreateQueryPortsTypes.ApplyQueryOutput> {
		const res = await this.infra.applyQuery({ databaseUrl, query });

		return {
			response: JSON.stringify(res, null, 2),
		};
	}

	async storeQuery(input: CreateQueryPortsTypes.StoreQueryInput): Promise<void> {
		await this.infra.storeQuery(input);
	}

	async describeProject(projectId: string): Promise<CreateQueryPortsTypes.DescribeDatabaseUrlOutput> {
		const res = await this.infra.describeProject(projectId);

		return {
			type: res.type as ProjectType,
			title: res.title,
			databaseUrl: res.url,
		};
	}
}
