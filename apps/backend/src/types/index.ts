export type RequestParams = Request & { params: Record<string, string> };

export type UserDb = {
	userId: string;
	username: string;
	password: string;
};
