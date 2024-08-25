import { Env } from '@/index';
import { RequestParams } from '@/types';
import jwt from '@tsndr/cloudflare-worker-jwt';

const authMiddleware = (handler: (request: RequestParams) => Promise<Response>, env: Env) => {
	return async (request: RequestParams): Promise<Response> => {
		const authorizationToken = request.headers.get('Authorization');
		if (!authorizationToken) throw new Error('Authorization is required');

		const isValid = await jwt.verify(authorizationToken, env.SECRET);
		if (!isValid) {
			throw new Error('Request not authorized');
		}

		const decoded = jwt.decode(authorizationToken);
		if (!decoded.payload) throw new Error('Authorization token not valid');

		const userId = (decoded.payload as { userId: string })?.userId || null;
		if (!userId) throw new Error('Authorization token not valid');

		request.params.userId = userId;

		return await handler(request);
	};
};

export { authMiddleware };
