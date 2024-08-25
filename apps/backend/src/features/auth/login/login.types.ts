export namespace LoginUsecaseTypes {
	export type LoginInput = {
		email: string;
		password: string;
		salt: string;
		secret: string;
	};

	export type CreateTokenInput = {
		userId: string;
		secret: string;
	};

	export interface VerifyPasswordInput {
		password: string;
		hashedPassword: string;
		hexSalt: string;
	}
}
