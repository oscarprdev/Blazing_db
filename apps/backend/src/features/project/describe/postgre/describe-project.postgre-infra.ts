import { DescribProjectsPostgreTypes } from './describe-project.postgre-types';
import { Database } from '@/db';
import { SharedInfra } from '@/features/shared/shared.infra';
import { Client } from 'pg';

interface IDescribeProjectPostgreInfra {
	extractTables(databaseUrl: string): Promise<DescribProjectsPostgreTypes.ExtractTablesInfraOutput>;
	extractFields(
		databaseUrl: string,
		tableName: string
	): Promise<DescribProjectsPostgreTypes.ExtractFieldsInfraOutput>;
	extractReference(databaseUrl: string): Promise<DescribProjectsPostgreTypes.ExtractReferenceInfraOutput>;
}

export class DescribeProjecPostgreInfra extends SharedInfra implements IDescribeProjectPostgreInfra {
	constructor(db: Database) {
		super(db);
	}

	async extractTables(databaseUrl: string) {
		const client = new Client({
			connectionString: databaseUrl,
		});

		try {
			await client.connect();

			const res = await client.query(`
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public';
              `);

			return {
				tablesDB: res.rows as DescribProjectsPostgreTypes.TableDb[],
			} satisfies DescribProjectsPostgreTypes.ExtractTablesInfraOutput;
		} catch (error) {
			console.log(error);
			throw new Error('Error fetching tables');
		}
	}

	async extractFields(databaseUrl: string, tableName: string) {
		const client = new Client({
			connectionString: databaseUrl,
		});

		try {
			await client.connect();

			const res = await client.query(
				`
                SELECT
                    c.column_name,
                    c.data_type,
                    (
                    SELECT
                        CASE
                        WHEN p.contype = 'p' THEN 'PRIMARY KEY'
                        WHEN p.contype = 'u' THEN 'UNIQUE'
                        WHEN p.contype = 'f' THEN 'FOREIGN KEY'
                        WHEN c.is_nullable = 'NO' THEN 'NOT NULL'
                        ELSE ''
                        END
                    FROM
                        pg_constraint AS p
                    JOIN
                        pg_class AS t ON p.conrelid = t.oid
                    JOIN
                        pg_attribute AS a ON a.attnum = ANY(p.conkey)
                    WHERE
                        t.relname = $1 AND a.attname = c.column_name
                    LIMIT 1
                    ) AS constraint_type
                FROM
                    information_schema.columns AS c
                WHERE
                    c.table_name = $1
                    AND c.table_schema = 'public'
                    AND c.is_updatable = 'YES'
                    AND c.is_generated = 'NEVER';
              `,
				[tableName]
			);

			return {
				fieldsDB: res.rows as DescribProjectsPostgreTypes.FieldDb[],
			} satisfies DescribProjectsPostgreTypes.ExtractFieldsInfraOutput;
		} catch (error) {
			throw new Error('Error fetching fields');
		}
	}

	async extractReference(databaseUrl: string) {
		const client = new Client({
			connectionString: databaseUrl,
		});

		try {
			await client.connect();
			const query = `
			SELECT DISTINCT
				kcu.table_name AS foreign_table,
				kcu.column_name AS foreign_column,
				ccu.table_name AS referenced_table,
				ccu.column_name AS referenced_column
			FROM
				information_schema.table_constraints AS tc
			JOIN
				information_schema.key_column_usage AS kcu
				ON tc.constraint_name = kcu.constraint_name
			JOIN
				information_schema.constraint_column_usage AS ccu
				ON ccu.constraint_name = tc.constraint_name
			WHERE
				tc.constraint_type = 'FOREIGN KEY';
		`;

			const res = await client.query(query);

			return res.rows as DescribProjectsPostgreTypes.ExtractReferenceInfraOutput;
		} catch (error) {
			console.log(error);
			throw new Error('Error fetching reference');
		}
	}
}
