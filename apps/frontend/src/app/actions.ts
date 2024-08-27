'use server';

import { OPEN_API_KEY } from '../lib/constants';
import { AiLanguage, ProjectType, Table } from '../lib/types';
import { errorResponse, successResponse } from '../lib/utils';
import { auth, signIn, signOut } from '@/src/auth';
import { applyQuery, createProject, register } from '@/src/lib/db/queries';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { AuthError } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';

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

export async function generateAiResponseAction({
	prompt,
	tables,
	type,
}: {
	prompt: string;
	tables: Table[];
	type: ProjectType;
}) {
	try {
		const session = await auth();
		const userToken = session?.user?.id;

		if (!userToken) return errorResponse('Authorization token not found');

		const customPrompt = `
		Your role is to be an experienced backend developer with a huge expertise in generating queries for ${type} database.
		So based on these tables: ${JSON.stringify(tables)} I want you to respond to this prompt: ${prompt}.

		Hint: The fields which are foreign keys or references to other tables will always have an underscore at position 0 on their names, examples: _userid, _projectid, _bookid.

		Your response will be injected directly into a <code/> html tag. So your response must be only the query needed.
		Not provide any context or extra information, just stick to the current prompt.
		The language used to generate the query will be SQL if the table type is PostgreSQL and in case of MongoDb the language will be Javascript
		`;

		const openai = createOpenAI({
			compatibility: 'strict',
			apiKey: OPEN_API_KEY,
		});

		const stream = createStreamableValue('');

		(async () => {
			try {
				const { textStream } = await streamText({
					model: openai('gpt-4o-mini'),
					prompt: customPrompt,
				});

				for await (const delta of textStream) {
					stream.update(delta);
				}

				stream.done();
			} catch (error) {
				stream.error('Error generating ai response, please try again later.');
			}
		})();

		return successResponse({ output: stream.value });
	} catch (error) {
		return errorResponse('Error generating ai response, please try again later.');
	}
}

export async function applyQueryAction({
	projectId,
	query,
	language,
}: {
	projectId: string;
	query: string;
	language: AiLanguage;
}) {
	const session = await auth();
	const userToken = session?.user?.id;

	if (!userToken) return errorResponse('Authorization token not found');

	const response = await applyQuery({ projectId, query, language, userToken });

	revalidateTag('describeProject');

	return response;
}
