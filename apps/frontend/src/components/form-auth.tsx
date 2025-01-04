'use client';

import { AuthFormState, useFormAuth } from '../lib/hooks/use-form-auth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FormAuthMode } from '@/src/lib/types';
import { IconEyeOff, IconLoader2 } from '@tabler/icons-react';
import { IconEye } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';
import { useFormStatus } from 'react-dom';

function FormAuth({ mode }: { mode: FormAuthMode }) {
	const { authForm, handleFormSubmit } = useFormAuth({ mode });

	return (
		<Form authForm={authForm} handleFormSubmit={handleFormSubmit}>
			<AuthSubmitButton label={mode === FormAuthMode.login ? 'Log In' : 'Sign Up'} />
		</Form>
	);
}

function Form({
	authForm,
	handleFormSubmit,
	children,
}: {
	authForm: AuthFormState;
	handleFormSubmit(formData: FormData): Promise<void>;
	children: ReactNode;
}) {
	const [passwordVisible, setPasswordVisible] = useState(false);

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
					variant={'accent'}
					onClick={() => setPasswordVisible(!passwordVisible)}
					className="absolute top-7 -right-3 text-light2 hover:text-light2">
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
		<Button type="submit" className="mt-10 bg-accent hover:bg-accent1 rounded-lg" disabled={pending}>
			{pending ? <IconLoader2 className="animate-spin" /> : label}
		</Button>
	);
}

export default FormAuth;
