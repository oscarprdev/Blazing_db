'use server';

import { LoginPayload } from './types';
import { signIn } from '@/src/auth';
import { register } from '@/src/lib/db/queries';
import { errorResponse, successResponse } from '@/src/lib/types';
import { AuthError } from 'next-auth';

export async function loginUser({ email, password }: LoginPayload) {
	try {
		await signIn('credentials', { email, password });

		return successResponse('User logged successfully');
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return errorResponse('User credentials not valid');
				case 'CallbackRouteError':
					return errorResponse('User not found');
				default:
					return errorResponse('Unexpected error');
			}
		}

		if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
			return successResponse('User logged successfully');
		}

		return errorResponse('Unexpected error');
	}
}

export async function registerUser({ email, password }: LoginPayload) {
	return await register({ email, password });
}
