import { UserDb } from '@/types';

export interface SharedPorts {
	findUserByEmail(email: string): Promise<UserDb>;
}
