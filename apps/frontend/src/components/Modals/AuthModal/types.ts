import { ReactNode } from 'react';

export type ModalState = {
	mode: AuthModalMode;
	open: boolean;
};

export enum AuthModalMode {
	login = 'login',
	signup = 'signup',
}

export type AuthModalTriggerButtonsProps = {
	handleModalMode(mode: AuthModalMode): void;
};

export type AuthFormProps = {
	handleSubmit(input: LoginPayload): Promise<void>;
	children: ReactNode;
};

export type LoginPayload = {
	username: string;
	password: string;
};

export type AuthFormState = {
	username: {
		value: string | null;
		error: string | null;
	};
	password: {
		value: string | null;
		error: string | null;
	};
};
