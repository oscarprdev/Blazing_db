'use server';

import { Pool } from 'pg';

const pool = new Pool({
	connectionString:
		'postgresql://opr:QGhkJOag18dB@ep-withered-bread-a2vwrug9-pooler.eu-central-1.aws.neon.tech/resume-builder?sslmode=require',
	ssl: {
		rejectUnauthorized: false,
	},
});

export default async function handler() {
	try {
		const client = await pool.connect();

		const result = await client.query(
			`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
		);

		const tables = result.rows.map(row => row.table_name);

		const result2 = await client.query(
			`SELECT kcu.column_name
			 FROM information_schema.table_constraints AS tc
			 JOIN information_schema.key_column_usage AS kcu
			 ON tc.constraint_name = kcu.constraint_name
			 AND tc.table_schema = kcu.table_schema
			 WHERE tc.constraint_type = 'PRIMARY KEY'
			 AND tc.table_name = $1;`,
			[tables[0]]
		);

		client.release();

		console.log(result2);
	} catch (err) {
		console.log(err);
	}
}
