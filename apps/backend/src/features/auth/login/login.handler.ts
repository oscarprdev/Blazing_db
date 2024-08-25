import { ILoginUsecase } from './login.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';
import { z } from 'zod';

export interface ILoginHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

const LoginSectionSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export class LoginHandler implements ILoginHandler {
	constructor(private readonly loginUsecase: ILoginUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const { data } = await this.extractPayload(request);

			if (!env.SECRET || !env.SALT) throw new Error('Environment variables not configured');

			const token = await this.loginUsecase.execute({
				email: data.email,
				password: data.password,
				salt: env.SALT,
				secret: env.SECRET,
			});

			return new Response(
				JSON.stringify({
					data: token,
					message: 'User successufully logged',
				}),
				{
					status: 201,
				}
			);
		} catch (error: unknown) {
			return handleError(error);
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
