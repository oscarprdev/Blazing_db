import { API_URL } from '../constants';
import { Project, ProjectType, Table } from '../types';
import { errorResponse, successResponse } from '../utils';

export async function login({ email, password }: { email: string; password: string }) {
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
		return errorResponse(error instanceof Error ? error.message : 'Error signing in an user');
	}
}

export async function register({ email, password }: { email: string; password: string }) {
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
		return errorResponse(error instanceof Error ? error.message : 'Error registering in an user');
	}
}

export async function listProjects({ userToken }: { userToken: string }) {
	try {
		const response = await fetch(`${API_URL}/project/list`, {
			headers: {
				Authorization: userToken,
			},
		});

		if (!response.ok) return errorResponse(response.statusText);

		const jsonResponse = await response.json();

		if (jsonResponse.status === 500) return errorResponse(jsonResponse.message);

		const dataResponse = jsonResponse.data as { projects: Project[] };

		return successResponse(dataResponse);
	} catch (error: unknown) {
		return errorResponse(error instanceof Error ? error.message : 'Error listing projects');
	}
}

export async function createProject({
	databaseUrl,
	type,
	projectTitle,
	userToken,
}: {
	databaseUrl: string;
	type: ProjectType;
	projectTitle: string;
	userToken: string;
}) {
	try {
		const response = await fetch(`${API_URL}/project/create`, {
			method: 'POST',
			body: JSON.stringify({ databaseUrl, type, projectTitle }),
			headers: {
				Authorization: userToken,
			},
		});

		if (!response.ok) return errorResponse(response.statusText);

		const jsonResponse = await response.json();

		if (jsonResponse.status === 500) return errorResponse(jsonResponse.message);

		const dataResponse = { projectId: jsonResponse.data.projectId, message: jsonResponse.message } as {
			projectId: string;
			message: string;
		};

		return successResponse(dataResponse);
	} catch (error: unknown) {
		return errorResponse(error instanceof Error ? error.message : 'Error registering in an user');
	}
}

export async function describeProject({ projectId, userToken }: { projectId: string; userToken: string }) {
	try {
		const response = await fetch(`${API_URL}/project/${projectId}`, {
			headers: {
				Authorization: userToken,
			},
		});

		if (!response.ok) return errorResponse(response.statusText);

		const jsonResponse = await response.json();

		if (jsonResponse.status === 500) return errorResponse(jsonResponse.message);

		const dataResponse = { tables: jsonResponse.data.tables, message: jsonResponse.message } as {
			tables: Table[];
			message: string;
		};

		return successResponse(dataResponse);
	} catch (error: unknown) {
		return errorResponse(error instanceof Error ? error.message : 'Error listing projects');
	}
}
