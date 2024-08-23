export namespace RegisterUsecaseTypes {
	export type RegisterInput = {
		username: string;
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
