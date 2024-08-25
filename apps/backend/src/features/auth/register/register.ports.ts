export interface RegisterPorts {
	execute(userId: string, email: string, password: string): Promise<void>;
}
