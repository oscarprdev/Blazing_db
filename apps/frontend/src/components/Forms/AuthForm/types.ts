import { ReactNode } from 'react';

export enum AuthFormMode {
	login = 'login',
	signup = 'signup',
}

export type AuthFormProps = {
	mode: AuthFormMode;
};

export type FormProps = {
	handleSubmit(input: LoginPayload): Promise<void>;
	children: ReactNode;
};

export type LoginPayload = {
	email: string;
	password: string;
};

export type AuthFormState = {
	email: {
		value: string | null;
		error: string | null;
	};
	password: {
		value: string | null;
		error: string | null;
	};
};
