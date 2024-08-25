import { useState } from 'react';
import { z } from 'zod';

type AuthFormState = {
	email: {
		value: string | null;
		error: string | null;
	};
	password: {
		value: string | null;
		error: string | null;
	};
};

const passwordSchema = z
	.string()
	.min(4, { message: 'Password must be at least 4 characters long' })
	.max(15, { message: 'Password must be at most 15 characters long' });
// .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
// .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
// .regex(/\d/, { message: 'Password must contain at least one number' });

const emailSchema = z.string().email({ message: 'Invalid email address format' });

const AUTH_FORM_DEFAULT_STATE: AuthFormState = {
	email: {
		value: null,
		error: null,
	},
	password: {
		value: null,
		error: null,
	},
};

export function useFormAuth({
	handleSubmit,
}: {
	handleSubmit: (values: { email: string; password: string }) => Promise<void>;
}) {
	const [authForm, setAuthForm] = useState<AuthFormState>(AUTH_FORM_DEFAULT_STATE);

	async function handleFormSubmit(formData: FormData) {
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const errors = {
			email: '',
			password: '',
		};

		if (!email) {
			errors.email = 'Email is required';
		}

		if (!password) {
			errors.password = 'Password is required';
		}

		if (errors.password || errors.email) {
			return setAuthForm(prev => ({
				email: {
					value: prev.email.value,
					error: errors.email,
				},
				password: {
					value: prev.password.value,
					error: errors.password,
				},
			}));
		}

		const emailResult = emailSchema.safeParse(email);
		if (!emailResult.success && emailResult.error.errors[0]) {
			const errorMessage = emailResult.error.errors[0].message;
			errors.email = errorMessage;
		}

		const passwordResult = passwordSchema.safeParse(password);
		if (!passwordResult.success && passwordResult.error.errors[0]) {
			const errorMessage = passwordResult.error.errors[0].message;
			errors.password = errorMessage;
		}

		if (errors.password || errors.email) {
			return setAuthForm(prev => ({
				email: {
					value: prev.email.value,
					error: errors.email,
				},
				password: {
					value: prev.password.value,
					error: errors.password,
				},
			}));
		}

		await handleSubmit({ email, password });
	}

	return {
		authForm,
		handleFormSubmit,
	};
}
