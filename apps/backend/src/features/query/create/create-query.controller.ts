import { provideCreateQueryPostgreUsecaseSingleton } from './create-query.index';
import { Database } from '@/db';
import { ProjectType } from '@/types';

export class CreateQueryController {
	constructor(private readonly db: Database) {}

	async serveHandler(projectId: string) {
		if (!projectId) throw new Error('Request params not valid');

		const type = await this.describeProjectType(projectId);
		if (!type) throw new Error('Project not found');

		switch (type) {
			case ProjectType.postgreSQL:
				return provideCreateQueryPostgreUsecaseSingleton(this.db);
			default:
				throw new Error('Project type not valid');
		}
	}

	private async describeProjectType(projectId: string) {
		try {
			const res = await this.db.query(`SELECT type FROM projects WHERE projectid = $1`, [projectId]);

			return res[0].type;
		} catch (error) {
			throw new Error('Error describing project type');
		}
	}
}
