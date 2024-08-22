import { UserDb } from '@/types';

export interface LoginPorts {
	execute(userId: string, username: string, password: string): Promise<void>;
}
