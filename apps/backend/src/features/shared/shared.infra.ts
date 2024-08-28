import { SharedPorts } from './shared.ports';
import { DescribeProjectInfraOutput, DescribeQueryInfraOutput } from './shared.types';
import { Database } from '@/db';
import { UserDb } from '@/types';

export class SharedInfra implements SharedPorts {
	constructor(private readonly db: Database) {}

	async findUserByEmail(email: string) {
		try {
			const result = await this.db.query('SELECT * FROM Users WHERE email = $1', [email]);

			return result[0] as UserDb;
		} catch (error) {
			throw new Error('Error finding user by email on DB');
		}
	}

	async describeProject(projectId: string) {
		try {
			const res = await this.db.query('SELECT * FROM projects WHERE projectid = $1', [projectId]);

			return res[0] as DescribeProjectInfraOutput;
		} catch (error) {
			throw new Error('Error describing project by its id');
		}
	}

	async describeQuery(queryId: string) {
		try {
			const res = await this.db.query('SELECT * FROM queries WHERE queryid = $1', [queryId]);

			return res[0] as DescribeQueryInfraOutput;
		} catch (error) {
			throw new Error('Error describing query by its id');
		}
	}
}
