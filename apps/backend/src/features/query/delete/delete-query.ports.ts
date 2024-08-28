export interface DeleteQueryPorts {
	delete(input: DeleteQueryPortsTypes.DeleteInput): Promise<void>;
}

export namespace DeleteQueryPortsTypes {
	export type DeleteInput = {
		queryId: string;
	};
}
