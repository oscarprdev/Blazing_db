export namespace LoginUsecaseTypes {
	export type LoginInput = {
		username: string;
		password: string;
		secret: string;
	};

	export type CreateTokenInput = {
		userId: string;
		secret: string;
	};
}
