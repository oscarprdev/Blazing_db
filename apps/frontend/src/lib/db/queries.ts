import { API_URL } from '../constants';
import { errorResponse, successResponse } from '../types';

interface LoginInput {
	username: string;
	password: string;
}

export async function login({ username, password }: LoginInput) {
	try {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) return errorResponse(response.statusText);

		const jsonResponse = await response.json();

		if (jsonResponse.status) return errorResponse(jsonResponse.message);

		return successResponse(jsonResponse.data);
	} catch (error: unknown) {
		return errorResponse(error instanceof Error ? error.message : 'Error signing in an user');
	}
}

export async function register({ username, password }: LoginInput) {
	try {
		const response = await fetch(`${API_URL}/auth/register`, {
			method: 'POST',
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) return errorResponse(response.statusText);

		const jsonResponse = await response.json();

		if (jsonResponse.status) return errorResponse(jsonResponse.message);

		return successResponse(jsonResponse.message);
	} catch (error: unknown) {
		console.log('register', error);
		return errorResponse(error instanceof Error ? error.message : 'Error registering in an user');
	}
}
