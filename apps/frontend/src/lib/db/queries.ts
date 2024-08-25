import { API_URL } from '../constants';
import { ListProjectsOutput } from '../types';
import { errorResponse, successResponse } from '../utils';

interface LoginInput {
	email: string;
	password: string;
}

export async function login({ email, password }: LoginInput) {
	try {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) return errorResponse(response.statusText);

		const jsonResponse = await response.json();

		if (jsonResponse.status === 500) return errorResponse(jsonResponse.message);

		return successResponse(jsonResponse.data);
	} catch (error: unknown) {
		console.log(error);
		return errorResponse(error instanceof Error ? error.message : 'Error signing in an user');
	}
}

export async function register({ email, password }: LoginInput) {
	try {
		const response = await fetch(`${API_URL}/auth/register`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) return errorResponse(response.statusText);

		const jsonResponse = await response.json();

		if (jsonResponse.status === 500) return errorResponse(jsonResponse.message);

		return successResponse(jsonResponse.message);
	} catch (error: unknown) {
		console.log('register', error);
		return errorResponse(error instanceof Error ? error.message : 'Error registering in an user');
	}
}

interface ListProjectsInput {
	userToken: string;
}

export async function listProjects({ userToken }: ListProjectsInput) {
	try {
		const response = await fetch(`${API_URL}/project/list`, {
			headers: {
				Authorization: userToken,
			},
		});

		if (!response.ok) return errorResponse(response.statusText);

		const jsonResponse = await response.json();

		if (jsonResponse.status === 500) return errorResponse(jsonResponse.message);

		const dataResponse = jsonResponse.data as ListProjectsOutput;

		return successResponse(dataResponse);
	} catch (error: unknown) {
		console.log('register', error);
		return errorResponse(error instanceof Error ? error.message : 'Error listing projects');
	}
}
