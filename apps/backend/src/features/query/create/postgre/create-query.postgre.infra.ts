import { CreateQueryPostgreTypes } from './create-query.postgre-types';
import { Database } from '@/db';
import { SharedInfra } from '@/features/shared/shared.infra';
import { Client } from 'pg';

export interface ICreateQueryPostgreInfra {
	applyQuery(input: CreateQueryPostgreTypes.ApplyQueryInput): Promise<any>;
	storeQuery(input: CreateQueryPostgreTypes.StoreQueryInput): Promise<void>;
	updateQuery(input: CreateQueryPostgreTypes.UpdateQueryInput): Promise<void>;
}

export class CreateQueryPostgreInfra extends SharedInfra implements ICreateQueryPostgreInfra {
	private readonly database: Database;

	constructor(db: Database) {
		super(db);

		this.database = db;
	}

	async applyQuery({ databaseUrl, query }: CreateQueryPostgreTypes.ApplyQueryInput): Promise<any> {
		const client = new Client({
			connectionString: databaseUrl,
		});

		try {
			await client.connect();

			if (query.includes('$')) throw new Error('Expressions as $ are not allowed, insert a value instead');

			const res = await client.query(query);

			return res.rows;
		} catch (error) {
			throw new Error(
				error instanceof Error && error.message.includes('$') ? error.message : 'Error applying query'
			);
		}
	}

	async storeQuery({ projectId, query, language, response }: CreateQueryPostgreTypes.StoreQueryInput): Promise<void> {
		try {
			await this.database.query(
				`
                INSERT INTO 
                    queries (queryid, projectownerid, value, language, response, createdat) 
                    VALUES ($1, $2, $3, $4, $5, $6::timestamptz AT TIME ZONE 'Europe/Berlin');
                `,
				[crypto.randomUUID().toString(), projectId, query, language, response, new Date().toISOString()]
			);
		} catch (error) {
			console.log(error);
			throw new Error('Error storing query on database');
		}
	}

	async updateQuery({ queryId, query, language, response }: CreateQueryPostgreTypes.UpdateQueryInput): Promise<void> {
		try {
			await this.database.query(
				`
				UPDATE queries 
					SET value = $1, language = $2, response = $3, createdAt = $4::timestamptz AT TIME ZONE 'Europe/Berlin'
				WHERE queryid = $5;
                `,
				[query, language, response, new Date().toISOString(), queryId]
			);
		} catch (error) {
			console.log(error);
			throw new Error('Error storing query on database');
		}
	}
}
