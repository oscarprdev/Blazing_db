import { IRegisterUsecase } from './register.usecase';
import { handleError } from '@/features/utils';
import { Env } from '@/index';
import { RequestParams } from '@/types';
import { z } from 'zod';

export interface IRegisterHandler {
	handleRequest(request: RequestParams, env: Env): Promise<Response>;
}

const RegisterSectionSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export class RegisterHandler implements IRegisterHandler {
	constructor(private readonly registerUsecase: IRegisterUsecase) {}

	public async handleRequest(request: RequestParams, env: Env) {
		try {
			const { data } = await this.extractPayload(request);

			if (!env.SECRET) throw new Error('Secret not configured');

			await this.registerUsecase.execute({
				username: data.username,
				password: data.password,
				salt: env.SALT,
			});

			return new Response(
				JSON.stringify({
					data: null,
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

		const { error } = RegisterSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new Error('Request payload not valid');
		}

		return { data: bodyParsed };
	}
}
