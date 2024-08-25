'use client';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { loginUser, registerUser } from './actions';
import { useAuthForm } from './hooks';
import { AuthFormMode, AuthFormProps, FormProps, LoginPayload } from './types';
import { isError } from '@/src/lib/types';
import { IconEyeOff, IconLoader2 } from '@tabler/icons-react';
import { IconEye } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

function AuthForm({ mode }: AuthFormProps) {
	async function handleSubmit({ email, password }: LoginPayload) {
		const response =
			mode === AuthFormMode.login
				? await loginUser({ email, password })
				: await registerUser({ email, password });

		if (isError(response)) {
			toast.error(response.error);
			return;
		}

		toast.success(response.success);
		mode === AuthFormMode.signup ? redirect('/sign-in') : redirect('/dashboard');
	}

	return (
		<Form handleSubmit={handleSubmit}>
			<AuthSubmitButton label={mode === AuthFormMode.login ? 'Log In' : 'Sign Up'} />
		</Form>
	);
}

function Form({ handleSubmit, children }: FormProps) {
	const [passwordVisible, setPasswordVisible] = useState(false);

	const { authForm, handleFormSubmit } = useAuthForm({ handleSubmit });

	return (
		<form action={handleFormSubmit} className="flex flex-col w-full">
			<label htmlFor="email" className="my-2 text-sm text-light1">
				Email
				<Input name="email" placeholder="you@example.com" className="mt-2" />
			</label>
			{authForm.email.error && <p className="text-xs text-destructive mt-1">{authForm.email.error}</p>}
			<label htmlFor="password" className="relative my-2 mt-5 text-sm text-light1">
				Password
				<Input
					name="password"
					placeholder="*****"
					type={passwordVisible ? 'text' : 'password'}
					className="mt-2"
				/>
				<Button
					type="button"
					variant={'secondary'}
					onClick={() => setPasswordVisible(!passwordVisible)}
					className="absolute top-7 -right-3 text-light5 hover:text-light3">
					{passwordVisible ? <IconEyeOff /> : <IconEye />}
				</Button>
			</label>
			{authForm.password.error && <p className="text-xs text-destructive mt-1">{authForm.password.error}</p>}
			{children}
		</form>
	);
}

function AuthSubmitButton({ label }: { label: string }) {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="mt-10 bg-secondary hover:bg-secondary1 rounded-lg" disabled={pending}>
			{pending ? <IconLoader2 className="animate-spin" /> : label}
		</Button>
	);
}

export default AuthForm;
