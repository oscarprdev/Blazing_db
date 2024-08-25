'use server';

import { ProjectType } from '../lib/types';
import { errorResponse, successResponse } from '../lib/utils';
import { auth, signIn, signOut } from '@/src/auth';
import { createProject, register } from '@/src/lib/db/queries';
import { AuthError } from 'next-auth';

export async function loginUserAction({ email, password }: { email: string; password: string }) {
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

export async function registerUserAction({ email, password }: { email: string; password: string }) {
	return await register({ email, password });
}

export async function signOutAction() {
	await signOut({ redirectTo: '/' });
}

export async function createProjectAction({
	databaseUrl,
	type,
	projectTitle,
}: {
	databaseUrl: string;
	type: ProjectType;
	projectTitle: string;
}) {
	const session = await auth();
	const userToken = session?.user?.id;

	if (!userToken) return errorResponse('Authorization token not found');

	return await createProject({ databaseUrl, type, projectTitle, userToken });
}
