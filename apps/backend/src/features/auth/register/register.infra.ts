import { Database } from '../../../db';
import { RegisterPorts } from './register.ports';

export class RegisterInfra implements RegisterPorts {
	constructor(private readonly db: Database) {}

	async execute(userId: string, username: string, password: string) {
		try {
			await this.db.query(
				`
                INSERT INTO Users (userId, username, password)
                VALUES ($1, $2, $3);
            `,
				[userId, username, password]
			);
		} catch (error: unknown) {
			throw new Error('Error inserting user on Users table');
		}
	}
}
