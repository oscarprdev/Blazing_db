import { IListQueryInfra, ListQueryInfra } from './list-query.infra';
import { ListQueryPorts } from './list-query.ports';
import { ProjectType } from '@/types';

export class ListQueryAdapter implements ListQueryPorts {
	constructor(private readonly infra: ListQueryInfra) {}

	async list({ projectId }: ListQueryPorts.ListInput): Promise<ListQueryPorts.ListOutput> {
		const res = await this.infra.list({ projectId });

		return {
			queries: res.map(q => ({
				queryId: q.queryid,
				value: q.value,
				language: q.language,
				createdAt: q.createdat,
				response: q.response,
			})),
		};
	}

	async describeProject(projectId: string): Promise<ListQueryPorts.DescribeDatabaseUrlOutput> {
		const res = await this.infra.describeProject(projectId);

		return {
			type: res.type as ProjectType,
			title: res.title,
			databaseUrl: res.url,
		};
	}
}
