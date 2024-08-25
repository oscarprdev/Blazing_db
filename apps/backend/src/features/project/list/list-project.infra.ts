import { ListProjectsPorts, ListProjectsPortsTypes } from './list-projects.ports';
import { Database } from '@/db';

export class ListProjectInfra implements ListProjectsPorts {
	constructor(private readonly db: Database) {}

	async list(userId: string): Promise<any> {
		try {
			const res = await this.db.query('SELECT * FROM projects WHERE ownerid = $1', [userId]);

			return res as ListProjectsPortsTypes.ListOutput;
		} catch (error) {
			throw new Error('Error fetching projects');
		}
	}
}
