import { UserDb } from '@/types';

export interface SharedPorts {
	findUserByUsername(username: string): Promise<UserDb>;
}
