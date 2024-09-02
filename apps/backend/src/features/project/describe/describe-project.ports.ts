import { ProjectType } from '@/types';

export interface DescribeProjectPorts {
	describeProject(projectId: string): Promise<DescribeProjectPortsTypes.DescribeDatabaseUrlOutput>;
	extractTables(databaseUrl: string): Promise<DescribeProjectPortsTypes.ExtractTablesOutput>;
	extractFields(databaseUrl: string, tableName: string): Promise<DescribeProjectPortsTypes.ExtractFieldsOutput>;
	extractReference(databaseUrl: string): Promise<DescribeProjectPortsTypes.ExtractReferencesOutput>;
}

export namespace DescribeProjectPortsTypes {
	export type DescribeDatabaseUrlOutput = {
		type: ProjectType;
		title: string;
		databaseUrl: string | null;
	};

	export type ExtractTablesOutput = string[];

	export type ExtractReferencesOutput = {
		referenced: string;
		table: string;
		originalField: string;
	}[];

	export type ExtractFieldsOutput = {
		fields: FieldPortResponse[];
	};

	export type ExtractReference = string;

	export type FieldPortResponse = {
		name: string;
		type: string;
		fieldConstraint: string;
	};
}
