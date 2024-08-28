export namespace DescribeTableTypes {
	export type ExecuteInput = {
		tableTitle: string;
		projectId: string;
	};

	export type ExecuteOutput = {
		key: string;
		value: string;
	}[][];
}
