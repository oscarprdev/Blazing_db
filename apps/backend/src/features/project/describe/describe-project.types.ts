import { DatabaseTable, TableField } from '@/types';

export namespace DescribeProjectTypes {
	export type DescribeProjectInput = {
		projectId: string;
	};

	export type DescribeProjectOutput = {
		title: string;
		tables: DatabaseTable[];
	};

	export type EnrichedField = Pick<TableField, 'values' | 'name' | 'fieldConstraint' | 'type'>;
}
