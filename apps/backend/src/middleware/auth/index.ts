import { ValidateAuthInput } from './types';
import jwt from '@tsndr/cloudflare-worker-jwt';

export class AuthMiddleware {
	constructor() {}

	async validateAuth(input: ValidateAuthInput) {
		const isValid = await jwt.verify(input.token, input.env.SECRET);
		if (!isValid) {
			throw new Error('Request not authorized');
		}

		const decoded = jwt.decode(input.token);
		const { userId, projectId } = decoded as { userId: string; projectId: string };

		return {
			token: input.token,
		};
	}
}
