import { DeleteQueryPorts, DeleteQueryPortsTypes } from './delete-query.ports';
import { Database } from '@/db';

export class DeleteQueryInfra implements DeleteQueryPorts {
	constructor(private readonly db: Database) {}

	async delete({ queryId }: DeleteQueryPortsTypes.DeleteInput): Promise<void> {
		try {
			await this.db.query(
				`
                    DELETE FROM queries WHERE queryid = $1;
                `,
				[queryId]
			);
		} catch (error) {
			throw new Error('Error deleting query from database');
		}
	}
}
