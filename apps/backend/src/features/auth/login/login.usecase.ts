import { LoginPorts } from './login.ports';
import { LoginUsecaseTypes } from './login.types';
import { SharedPorts } from '@/features/shared/shared.ports';
import jwt from '@tsndr/cloudflare-worker-jwt';

export interface ILoginUsecase {
	execute(input: LoginUsecaseTypes.LoginInput): Promise<string>;
}

export class LoginUsecase implements ILoginUsecase {
	constructor(
		private readonly ports: LoginPorts,
		private readonly sharedPorts: SharedPorts
	) {}

	async execute({ username, password, secret }: LoginUsecaseTypes.LoginInput) {
		if (await this.isUserAlreadyCreated(username)) {
			throw new Error('User is already created');
		}

		const userId = crypto.randomUUID().toString();
		const token = await this.createToken({ userId, secret });

		await this.ports.execute(userId, username, password);

		return token;
	}

	private async createToken({ userId, secret }: LoginUsecaseTypes.CreateTokenInput) {
		try {
			return await jwt.sign({ userId }, secret);
		} catch (error) {
			throw new Error('Error creating JWT');
		}
	}

	private async isUserAlreadyCreated(username: string) {
		const user = await this.sharedPorts.findUserByUsername(username);

		return Boolean(user);
	}
}
