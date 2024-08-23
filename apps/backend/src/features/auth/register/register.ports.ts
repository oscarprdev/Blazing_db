export interface RegisterPorts {
	execute(userId: string, username: string, password: string): Promise<void>;
}
