export namespace DescribProjectsPostgreTypes {
	export type ExtractFieldsInfraOutput = {
		fieldsDB: FieldDb[];
	};

	export type ExtractTablesInfraOutput = {
		tablesDB: TableDb[];
	};

	export type ExtractReferenceInfraOutput = {
		foreign_table: string;
		foreign_column: string;
		referenced_table: string;
		referenced_column: string;
	}[];

	export type TableDb = {
		table_name: string;
	};

	export type FieldDb = {
		column_name: string;
		data_type: string;
		constraint_type: string;
	};
}
