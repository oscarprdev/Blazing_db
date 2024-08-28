import { DescribeTablePorts, DescribeTablePortsTypes } from './describe-table.ports';
import { Database } from '@/db';
import { SharedInfra } from '@/features/shared/shared.infra';
import { DescribeProjectInfraOutput } from '@/features/shared/shared.types';
import { ProjectType } from '@/types';
import { Client } from 'pg';

export class DescribeTableInfra extends SharedInfra implements DescribeTablePorts {
	constructor(db: Database) {
		super(db);
	}

	async describeTable({
		tableTitle,
		databaseUrl,
	}: DescribeTablePortsTypes.DescribeInput): Promise<DescribeTablePortsTypes.DescribeOutput> {
		const client = new Client({
			connectionString: databaseUrl,
		});

		try {
			await client.connect();

			if (!/^[a-zA-Z0-9_]+$/.test(tableTitle)) throw new Error();

			const res = await client.query(
				`
                    SELECT * FROM "${tableTitle}";
                `
			);

			return res.rows;
		} catch (error) {
			console.log(error);
			throw new Error('Error describing values from table');
		}
	}

	async describeProjectInfo(projectId: string) {
		const res = await this.describeProject(projectId);

		return {
			type: res.type as ProjectType,
			title: res.title,
			databaseUrl: res.url,
		};
	}
}
