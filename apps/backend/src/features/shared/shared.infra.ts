import { SharedPorts } from './shared.ports';
import { Database } from '@/db';
import { UserDb } from '@/types';

export class SharedInfra implements SharedPorts {
	constructor(private readonly db: Database) {}

	async findUserByUsername(username: string) {
		try {
			const result = await this.db.query('SELECT * FROM Users WHERE username = $1', [username]);

			return result[0] as UserDb;
		} catch (error) {
			throw new Error('Error finding user by username on DB');
		}
	}
}
