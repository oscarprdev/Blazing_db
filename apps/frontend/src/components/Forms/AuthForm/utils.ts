import { AuthFormState } from './types';
import { z } from 'zod';

export const AUTH_FORM_DEFAULT_STATE: AuthFormState = {
	email: {
		value: null,
		error: null,
	},
	password: {
		value: null,
		error: null,
	},
};

export const passwordSchema = z
	.string()
	.min(4, { message: 'Password must be at least 4 characters long' })
	.max(15, { message: 'Password must be at most 15 characters long' });
// .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
// .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
// .regex(/\d/, { message: 'Password must contain at least one number' });

export const emailSchema = z.string().email({ message: 'Invalid email address format' });
