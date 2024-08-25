import { ProjectType } from '../types';
import { useState } from 'react';
import { z } from 'zod';

type CreateProjectFormState = {
	title: {
		value: string | null;
		error: string | null;
	};
	url: {
		value: string | null;
		error: string | null;
	};
	type: {
		value: string | null;
		error: string | null;
	};
};

const titleSchema = z
	.string()
	.min(4, { message: 'Project title must be at least 4 characters long' })
	.max(15, { message: 'Project title must be at most 15 characters long' });

const typeSchema = z.enum([ProjectType.postgreSQL, ProjectType.mongo]);

const postgresUrlSchema = z
	.string()
	.regex(
		/^postgresql:\/\/(?<user>[^:]+):(?<password>[^@]+)@(?<host>[^:/]+)(:(?<port>\d+))?\/(?<database>[^?]+)(\?(.+))?$/,
		{
			message: 'Invalid PostgreSQL connection URL format',
		}
	);

const mongodbUrlSchema = z
	.string()
	.regex(
		/^mongodb:\/\/(?<user>[^:]+):(?<password>[^@]+)@(?<host>[^:/]+)(:(?<port>\d+))?\/(?<database>[^?]+)(\?(.+))?$/,
		{
			message: 'Invalid MongoDB connection URL format',
		}
	);

const defaultUrlSchema = z.string();

const CREATE_PROJECT_FORM_DEFAULT_STATE: CreateProjectFormState = {
	title: {
		value: null,
		error: null,
	},
	url: {
		value: null,
		error: null,
	},
	type: {
		value: null,
		error: null,
	},
};

export function useFormCreateProject({
	handleSubmit,
}: {
	handleSubmit: (values: { databaseUrl: string; type: ProjectType; projectTitle: string }) => Promise<void>;
}) {
	const [formState, setFormState] = useState<CreateProjectFormState>(CREATE_PROJECT_FORM_DEFAULT_STATE);

	async function handleFormSubmit(formData: FormData) {
		const url = formData.get('url') as string;
		const title = formData.get('title') as string;
		const type = formData.get('type') as string;

		const errors = {
			url: '',
			title: '',
			type: '',
		};

		if (!url) {
			errors.url = 'Database URL is required';
		}

		if (!title) {
			errors.title = 'Project title is required';
		}

		if (!type) {
			errors.type = 'Project type is required';
		}

		if (errors.title || errors.url || errors.type) {
			return setFormState(prev => ({
				title: {
					value: prev.title.value,
					error: errors.title,
				},
				type: {
					value: prev.type.value,
					error: errors.type,
				},
				url: {
					value: prev.url.value,
					error: errors.url,
				},
			}));
		}

		const titleResult = titleSchema.safeParse(title);
		if (!titleResult.success && titleResult.error.errors[0]) {
			const errorMessage = titleResult.error.errors[0].message;
			errors.title = errorMessage;
		}

		const typeResult = typeSchema.safeParse(type);
		if (!typeResult.success && typeResult.error.errors[0]) {
			const errorMessage = typeResult.error.errors[0].message;
			errors.type = errorMessage;
		}

		const urlResult =
			type === ProjectType.postgreSQL
				? postgresUrlSchema.safeParse(url)
				: type === ProjectType.mongo
					? mongodbUrlSchema.safeParse(url)
					: defaultUrlSchema.safeParse(url);
		if (!urlResult.success && urlResult.error.errors[0]) {
			const errorMessage = urlResult.error.errors[0].message;
			errors.url = errorMessage;
		}

		if (errors.title || errors.type || errors.url) {
			return setFormState(prev => ({
				title: {
					value: prev.title.value,
					error: errors.title,
				},
				type: {
					value: prev.type.value,
					error: errors.type,
				},
				url: {
					value: prev.url.value,
					error: errors.url,
				},
			}));
		}

		await handleSubmit({ projectTitle: title, databaseUrl: url, type: type as ProjectType });
	}

	return {
		formState,
		handleFormSubmit,
	};
}
