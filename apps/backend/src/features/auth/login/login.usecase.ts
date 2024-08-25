import { hexStringToUint8Array } from '../utils';
import { LoginUsecaseTypes } from './login.types';
import { SharedPorts } from '@/features/shared/shared.ports';
import jwt from '@tsndr/cloudflare-worker-jwt';

export interface ILoginUsecase {
	execute(input: LoginUsecaseTypes.LoginInput): Promise<string>;
}

export class LoginUsecase implements ILoginUsecase {
	constructor(private readonly ports: SharedPorts) {}

	async execute({ username, password, salt, secret }: LoginUsecaseTypes.LoginInput): Promise<string> {
		const user = await this.ports.findUserByUsername(username);
		if (!user) throw new Error('User not found');

		const isPasswordValid = await this.verifyPassword({ password, hashedPassword: user.password, hexSalt: salt });
		if (!isPasswordValid) throw new Error('Request payload not valid');

		console.log(user.userid);

		return await this.createToken({ userId: user.userid, secret });
	}

	private async createToken({ userId, secret }: LoginUsecaseTypes.CreateTokenInput) {
		try {
			return await jwt.sign({ userId }, secret);
		} catch (error) {
			throw new Error('Error creating JWT');
		}
	}

	protected async verifyPassword({
		password,
		hashedPassword,
		hexSalt,
	}: LoginUsecaseTypes.VerifyPasswordInput): Promise<boolean> {
		const encoder = new TextEncoder();

		const inputPasswordBuffer = encoder.encode(password);

		const salt = hexStringToUint8Array(hexSalt);

		const saltedInputPassword = new Uint8Array(salt.length + inputPasswordBuffer.length);
		saltedInputPassword.set(salt, 0);
		saltedInputPassword.set(inputPasswordBuffer, salt.length);

		const hashedBuffer = await crypto.subtle.digest('SHA-256', saltedInputPassword);

		const hashedInputPassword = Array.from(new Uint8Array(hashedBuffer))
			.map(byte => byte.toString(16).padStart(2, '0'))
			.join('');

		return hashedInputPassword === hashedPassword;
	}
}
