import { Database } from '../../../db';
import { RegisterPorts } from './register.ports';

export class RegisterInfra implements RegisterPorts {
	constructor(private readonly db: Database) {}

	async execute(userId: string, email: string, password: string) {
		try {
			await this.db.query(
				`
                INSERT INTO Users (userId, email, password, verified)
                VALUES ($1, $2, $3, $4);
            `,
				[userId, email, password, 'true']
			);
		} catch (error: unknown) {
			throw new Error('Error inserting user on Users table');
		}
	}
}
