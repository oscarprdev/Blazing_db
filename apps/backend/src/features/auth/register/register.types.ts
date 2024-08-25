export namespace RegisterUsecaseTypes {
	export type RegisterInput = {
		email: string;
		password: string;
		salt: string;
	};

	export type CreateTokenInput = {
		userId: string;
		secret: string;
	};

	export type HashPasswordInput = {
		password: string;
		hexSalt: string;
	};
}
