import { RequestParams } from '../../types';

const corsHeaders = {
	'Access-Control-Allow-Origin': 'http://localhost:3000',
	'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT, DELETE',
	'Access-Control-Allow-Headers': '*',
};
const allowedOrigins = ['http://localhost:3000'];

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

		return await handler(request);
	};
};

export { corsMiddleware, corsHeaders };
