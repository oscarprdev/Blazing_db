import { DescribeProjectPorts, DescribeProjectPortsTypes } from '../describe-project.ports';
import { DescribeProjecPostgreInfra } from './describe-project.postgre-infra';

export class DescribeProjectPostgreAdapter implements DescribeProjectPorts {
	constructor(private readonly infra: DescribeProjecPostgreInfra) {}

	async describeDatabaseUrl(projectId: string): Promise<DescribeProjectPortsTypes.DescribeDatabaseUrlOutput> {
		const res = await this.infra.describeProject(projectId);

		return {
			databaseUrl: res.url,
		};
	}

	async extractTables(databaseUrl: string) {
		const output = await this.infra.extractTables(databaseUrl);

		return output.tablesDB.map(tab => tab.table_name);
	}

	async extractFields(databaseUrl: string, tableName: string) {
		const output = await this.infra.extractFields(databaseUrl, tableName);

		return {
			fields: output.fieldsDB.map(field => ({
				name: field.column_name,
				type: field.data_type,
				fieldConstraint: field.constraint_type,
			})),
		};
	}

	async extractValues(databaseUrl: string, tableName: string) {
		return await this.infra.extractValues(databaseUrl, tableName);
	}

	async extractReference(databaseUrl: string, tableName: string, fieldName: string) {
		const res = await this.infra.extractReference(databaseUrl, tableName, fieldName);

		return res.referenced_table;
	}
}
