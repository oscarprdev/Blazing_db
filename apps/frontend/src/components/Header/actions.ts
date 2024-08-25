'use server';

import { signOut } from '@/src/auth';

export async function signOutAction() {
	await signOut({ redirectTo: '/' });
}
