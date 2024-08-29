import { RequestParams } from '../../types';

const corsHeaders = {
	'Access-Control-Allow-Origin': 'https://blazing-db.vercel.app',
	'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT, DELETE',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
const allowedOrigins = ['http://localhost:3000', 'https://blazing-db.vercel.app'];

const corsMiddleware = (handler: (request: RequestParams) => Promise<Response>) => {
	return async (request: RequestParams): Promise<Response> => {
		const origin = request.headers.get('Origin');

		const headers = { ...corsHeaders };
		if (origin && allowedOrigins.includes(origin)) {
			headers['Access-Control-Allow-Origin'] = origin;
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers,
			});
		}

		const response = await handler(request);
		return new Response(response.body, {
			status: response.status,
			headers: { ...headers, ...response.headers },
		});
	};
};

export { corsMiddleware, corsHeaders };
