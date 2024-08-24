'use client';

import { useAuthForm, useAuthModal } from './hooks';
import { AuthFormProps, AuthModalMode, AuthModalTriggerButtonsProps } from './types';
import { Button } from '@/src/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { IconLoader2 } from '@tabler/icons-react';
import { useFormStatus } from 'react-dom';

function AuthModal() {
	const { modalState, toggleModalVisibility, handleModalMode, handleSubmit } = useAuthModal();

	return (
		<Dialog open={modalState.open} onOpenChange={toggleModalVisibility}>
			<DialogTrigger asChild>
				<AuthModalTriggerButtons handleModalMode={handleModalMode} />
			</DialogTrigger>
			<DialogContent className="w-80">
				<DialogHeader>
					<DialogTitle>Login user</DialogTitle>
				</DialogHeader>
				<AuthForm handleSubmit={handleSubmit}>
					<AuthSubmitButton />
				</AuthForm>
			</DialogContent>
		</Dialog>
	);
}

function AuthModalTriggerButtons({ handleModalMode }: AuthModalTriggerButtonsProps) {
	return (
		<div className="flex items-center gap-2">
			<Button variant={'secondary'} onClick={() => handleModalMode(AuthModalMode.signup)}>
				Signup
			</Button>
			<Button onClick={() => handleModalMode(AuthModalMode.login)}>Login</Button>
		</div>
	);
}

function AuthForm({ handleSubmit, children }: AuthFormProps) {
	const { authForm, handleFormSubmit } = useAuthForm({ handleSubmit });

	return (
		<form action={handleFormSubmit} className="flex flex-col">
			<label htmlFor="username" className="my-2 text-sm">
				Username
			</label>
			<Input name="username" id="username-input" placeholder="Enter your username" />
			{authForm.username.error && <p className="text-xs text-destructive mt-1">{authForm.username.error}</p>}
			<label htmlFor="password" className="my-2 mt-5 text-sm">
				Password
			</label>
			<Input name="password" id="password-input" placeholder="Enter your password" type="password" />
			{authForm.password.error && <p className="text-xs text-destructive mt-1">{authForm.password.error}</p>}
			{children}
		</form>
	);
}

function AuthSubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="mt-5 ml-auto" disabled={pending}>
			{pending ? <IconLoader2 className="animate-spin" /> : 'Submit'}
		</Button>
	);
}

export default AuthModal;
