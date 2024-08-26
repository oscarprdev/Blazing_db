import { DescribeProjectInfra } from '../shared/describe-project.infra';
import { DescribProjectsPostgreTypes } from './describe-project.postgre-types';
import { Database } from '@/db';
import { Client } from 'pg';

interface IDescribeProjectPostgreInfra {
	extractTables(databaseUrl: string): Promise<DescribProjectsPostgreTypes.ExtractTablesInfraOutput>;
	extractFields(
		databaseUrl: string,
		tableName: string
	): Promise<DescribProjectsPostgreTypes.ExtractFieldsInfraOutput>;
	extractValues(databaseUrl: string, tableName: string): Promise<string[]>;
	extractReference(
		databaseUrl: string,
		tableName: string,
		fieldName: string
	): Promise<DescribProjectsPostgreTypes.ExtractReferenceInfraOutput>;
}

export class DescribeProjecPostgreInfra extends DescribeProjectInfra implements IDescribeProjectPostgreInfra {
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

	async extractValues(databaseUrl: string, tableName: string) {
		const client = new Client({
			connectionString: databaseUrl,
		});

		try {
			await client.connect();

			const res1 = await client.query(
				`SELECT table_name 
				 FROM information_schema.tables 
				 WHERE table_name = $1 
				 OR table_name = lower($1) 
				 AND table_schema = 'public';`,
				[tableName]
			);

			if (res1.rows.length === 0) throw new Error(`Table "${tableName}" does not exist.`);

			const tableNameNeedsQuotes = res1.rows[0].table_name.toLowerCase() !== tableName;

			const res2 = await client.query(
				`SELECT * FROM ${tableNameNeedsQuotes ? `"${res1.rows[0].table_name}"` : tableName};`
			);

			return res2.rows;
		} catch (error) {
			console.log(error);
			throw new Error(
				error instanceof Error && error.message.includes('Table') ? error.message : 'Error fetching values'
			);
		}
	}

	async extractReference(databaseUrl: string, tableName: string, fieldName: string) {
		const client = new Client({
			connectionString: databaseUrl,
		});

		try {
			await client.connect();

			const query = `
            SELECT
                tc.table_name AS foreign_table,
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
                tc.constraint_type = 'FOREIGN KEY'
                AND tc.table_name = $1
                AND kcu.column_name = $2;
          `;

			const res = await client.query(query, [tableName, fieldName]);

			return res.rows[0] as DescribProjectsPostgreTypes.ExtractReferenceInfraOutput;
		} catch (error) {
			throw new Error('Error fetching reference');
		}
	}
}
