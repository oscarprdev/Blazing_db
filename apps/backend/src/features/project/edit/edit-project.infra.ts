import { EditProjectPorts } from './edit-project.ports';
import { Database } from '@/db';

export class EditProjectInfra implements EditProjectPorts {
	constructor(private readonly db: Database) {}

	async describeProject(projectId: string): Promise<string | null> {
		try {
			const res = await this.db.query('SELECT * FROM projects WHERE projectid = $1', [projectId]);

			if (res.length === 0) return null;

			return res[0].projectid;
		} catch (error) {
			console.log(error);
			throw new Error('Error describing project by its id');
		}
	}

	async editProject({ projectId, title }: { projectId: string; title: string }): Promise<void> {
		try {
			await this.db.query(
				`
                    UPDATE projects SET title = $1 WHERE projectid = $2;
                `,
				[title, projectId]
			);
		} catch (error) {
			console.log(error);
			throw new Error('Error editting project');
		}
	}
}
