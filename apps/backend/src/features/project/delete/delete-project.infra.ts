import { Database } from '@/db';
import { SharedInfra } from '@/features/shared/shared.infra';

interface IDeleteProjectInfra {
	delete(projectId: string): Promise<void>;
}

export class DeleteProjectInfra extends SharedInfra implements IDeleteProjectInfra {
	private readonly database: Database;

	constructor(db: Database) {
		super(db);

		this.database = db;
	}

	async delete(projectId: string): Promise<void> {
		try {
			await this.database.query('DELETE FROM projects WHERE projectid = $1', [projectId]);
		} catch (error) {
			throw new Error('Error deleting project');
		}
	}
}
