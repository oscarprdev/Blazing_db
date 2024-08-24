export interface DescribeProjectPorts {
	describeDatabaseUrl(projectId: string): Promise<DescribeProjectPortsTypes.DescribeDatabaseUrlOutput>;
	extractTables(databaseUrl: string): Promise<DescribeProjectPortsTypes.ExtractTablesOutput>;
	extractFields(databaseUrl: string, tableName: string): Promise<DescribeProjectPortsTypes.ExtractFieldsOutput>;
	extractValues(databaseUrl: string, tableName: string): Promise<DescribeProjectPortsTypes.ExtractValuesOutput>;
	extractReference(databaseUrl: string, tableName: string, fieldName: string): Promise<string>;
}

export namespace DescribeProjectPortsTypes {
	export type DescribeDatabaseUrlOutput = {
		databaseUrl: string | null;
	};

	export type ExtractTablesOutput = string[];

	export type ExtractFieldsOutput = {
		fields: FieldPortResponse[];
	};

	export type ExtractValuesOutput = string[];

	export type ExtractReference = string;

	export type FieldPortResponse = {
		name: string;
		type: string;
		fieldConstraint: string;
	};
}
