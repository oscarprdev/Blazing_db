import { loginUser, registerUser } from './actions';
import { AuthFormState, AuthModalMode, LoginPayload, ModalState } from './types';
import { AUTH_FORM_DEFAULT_STATE, passwordSchema, usernameSchema } from './utils';
import { isError } from '@/src/lib/types';
import { useState } from 'react';
import { toast } from 'sonner';

export function useAuthModal() {
	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		mode: AuthModalMode.login,
	});

	function toggleModalVisibility(open: boolean) {
		setModalState(prev => ({ ...prev, open }));
	}

	function handleModalMode(mode: AuthModalMode) {
		setModalState({ open: true, mode });
	}

	async function handleSubmit({ username, password }: LoginPayload) {
		const response =
			modalState.mode === AuthModalMode.login
				? await loginUser({ username, password })
				: await registerUser({ username, password });

		if (isError(response)) {
			toast.error(response.error);
			return;
		}

		toast.success(response.success);
		setModalState({ mode: AuthModalMode.login, open: false });
	}

	return {
		modalState,
		toggleModalVisibility,
		handleModalMode,
		handleSubmit,
	};
}

type UseAuthFormInput = {
	handleSubmit: (values: LoginPayload) => Promise<void>;
};

export function useAuthForm({ handleSubmit }: UseAuthFormInput) {
	const [authForm, setAuthForm] = useState<AuthFormState>(AUTH_FORM_DEFAULT_STATE);

	async function handleFormSubmit(formData: FormData) {
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		const errors = {
			username: '',
			password: '',
		};

		if (!username) {
			errors.username = 'Username is required';
		}

		if (!password) {
			errors.password = 'Password is required';
		}

		if (errors.password || errors.username) {
			return setAuthForm(prev => ({
				username: {
					value: prev.username.value,
					error: errors.username,
				},
				password: {
					value: prev.password.value,
					error: errors.password,
				},
			}));
		}

		const usernameResult = usernameSchema.safeParse(username);
		if (!usernameResult.success && usernameResult.error.errors[0]) {
			const errorMessage = usernameResult.error.errors[0].message;
			errors.username = errorMessage;
		}

		const passwordResult = passwordSchema.safeParse(password);
		if (!passwordResult.success && passwordResult.error.errors[0]) {
			const errorMessage = passwordResult.error.errors[0].message;
			errors.password = errorMessage;
		}

		if (errors.password || errors.username) {
			return setAuthForm(prev => ({
				username: {
					value: prev.username.value,
					error: errors.username,
				},
				password: {
					value: prev.password.value,
					error: errors.password,
				},
			}));
		}

		await handleSubmit({ username, password });
	}

	return {
		authForm,
		handleFormSubmit,
	};
}
