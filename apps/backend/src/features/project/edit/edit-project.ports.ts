export interface EditProjectPorts {
	describeProject(projectId: string): Promise<string | null>;
	editProject(input: { projectId: string; title: string }): Promise<void>;
}
