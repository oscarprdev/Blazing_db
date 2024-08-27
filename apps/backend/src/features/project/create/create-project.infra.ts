import { CreateProjectPorts, CreateProjectPortsTypes } from './create-project.ports';
import { Database } from '@/db';

export class CreateProjectInfra implements CreateProjectPorts {
	constructor(private readonly db: Database) {}

	async describeProject(databaseUrl: string): Promise<string | null> {
		try {
			const res = await this.db.query('SELECT * FROM projects WHERE url = $1', [databaseUrl]);

			if (res.length === 0) return null;

			return res[0].projectid;
		} catch (error) {
			console.log(error);
			throw new Error('Error describing project by its url');
		}
	}

	async intertProject({ userId, type, projectTitle, databaseUrl }: CreateProjectPortsTypes.InsertProjectInput) {
		try {
			const projectId = crypto.randomUUID().toString();
			await this.db.query(
				`
                INSERT INTO Projects (projectId, ownerId, type, title, url)
                VALUES ($1, $2, $3, $4, $5);
                `,
				[projectId, userId, type, projectTitle, databaseUrl]
			);

			return projectId;
		} catch (error) {
			throw new Error('Error inserting project');
		}
	}
}
