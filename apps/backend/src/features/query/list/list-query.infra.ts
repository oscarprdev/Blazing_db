import { ListQueryPorts } from './list-query.ports';
import { ListQueryTypes } from './list-query.types';
import { Database } from '@/db';
import { SharedInfra } from '@/features/shared/shared.infra';

export interface IListQueryInfra {
	list({ projectId }: { projectId: string }): Promise<ListQueryTypes.QueryInfra[]>;
}

export class ListQueryInfra extends SharedInfra implements IListQueryInfra {
	private readonly database: Database;

	constructor(db: Database) {
		super(db);
		this.database = db;
	}

	async list({ projectId }: ListQueryPorts.ListInput) {
		try {
			const res = await this.database.query(
				` 
                    SELECT * FROM queries WHERE projectownerid = $1 ORDER BY createdat DESC;
                `,
				[projectId]
			);

			return res as ListQueryTypes.QueryInfra[];
		} catch (error) {
			throw new Error('Error listing queries by project id');
		}
	}
}
