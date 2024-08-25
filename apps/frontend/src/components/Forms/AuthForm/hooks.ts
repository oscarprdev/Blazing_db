import { AuthFormState, LoginPayload } from './types';
import { AUTH_FORM_DEFAULT_STATE, emailSchema, passwordSchema } from './utils';
import { useState } from 'react';

type UseAuthFormInput = {
	handleSubmit: (values: LoginPayload) => Promise<void>;
};

export function useAuthForm({ handleSubmit }: UseAuthFormInput) {
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
