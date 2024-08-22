import { ILoginUsecase } from './login.usecase';
import { Env } from '@/index';
import { RequestParams } from '@/types';
import { z } from 'zod';

export interface ILoginHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

const LoginSectionSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export class LoginHandler implements ILoginHandler {
	constructor(private readonly loginUsecase: ILoginUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const { data } = await this.extractPayload(request);

			if (!env.SECRET) throw new Error('Secret not configured');

			const loginResponse = await this.loginUsecase.execute({
				username: data.username,
				password: data.password,
				secret: env.SECRET,
			});

			return new Response(loginResponse, {
				status: 201,
			});
		} catch (error: unknown) {
			throw new Error(error instanceof Error ? error.message : 'Unexpected error');
		}
	}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body);

		const { error } = LoginSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new Error('Request payload not valid');
		}

		return { data: bodyParsed };
	}
}
