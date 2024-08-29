import { hexStringToUint8Array } from '../utils';
import { RegisterPorts } from './register.ports';
import { RegisterUsecaseTypes } from './register.types';
import { SharedPorts } from '@/features/shared/shared.ports';
import jwt from '@tsndr/cloudflare-worker-jwt';

export interface IRegisterUsecase {
	execute(input: RegisterUsecaseTypes.RegisterInput): Promise<string>;
}

export class RegisterUsecase implements IRegisterUsecase {
	constructor(
		private readonly ports: RegisterPorts,
		private readonly sharedPorts: SharedPorts
	) {}

	async execute({ email, password, salt, secret }: RegisterUsecaseTypes.RegisterInput) {
		if (await this.isUserAlreadyCreated(email)) {
			throw new Error('User is already created');
		}

		const userId = crypto.randomUUID().toString();
		const hashedPassword = await this.hashPassword({ password, hexSalt: salt });

		await this.ports.execute(userId, email, hashedPassword);
		return await this.createToken({ userId, secret });
	}

	private async isUserAlreadyCreated(email: string) {
		const user = await this.sharedPorts.findUserByEmail(email);

		return Boolean(user);
	}

	protected async hashPassword({ password, hexSalt }: RegisterUsecaseTypes.HashPasswordInput): Promise<string> {
		const encoder = new TextEncoder();

		const passwordBuffer = encoder.encode(password);

		const salt = hexStringToUint8Array(hexSalt);

		const saltedPassword = new Uint8Array(salt.length + passwordBuffer.length);
		saltedPassword.set(salt, 0);
		saltedPassword.set(passwordBuffer, salt.length);

		const hashedBuffer = await crypto.subtle.digest('SHA-256', saltedPassword);

		const hashedPassword = Array.from(new Uint8Array(hashedBuffer))
			.map(byte => byte.toString(16).padStart(2, '0'))
			.join('');

		return hashedPassword;
	}

	private async createToken({ userId, secret }: { userId: string; secret: string }) {
		try {
			return await jwt.sign({ userId }, secret);
		} catch (error) {
			throw new Error('Error creating JWT');
		}
	}
}
