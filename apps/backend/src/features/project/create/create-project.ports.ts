export interface CreateProjectPorts {
	describeProject(databaseUrl: string): Promise<string | null>;
	intertProject(input: CreateProjectPortsTypes.InsertProjectInput): Promise<string>;
}

export namespace CreateProjectPortsTypes {
	export type InsertProjectInput = {
		userId: string;
		type: string;
		projectTitle: string;
		databaseUrl: string;
	};
}
