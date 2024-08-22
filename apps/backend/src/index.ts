import { Database } from './db';
import { DefaultRouter } from './router';
import { RouterType } from 'itty-router';

export interface Env {
	router?: RouterType;
	DATABASE_URL: string;
	SALT: string;
	SECRET: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response | void> {
		try {
			const database = new Database(env);
			env.router = new DefaultRouter().router(database, env);

			if (!env.router) {
				throw new Error('Router not configured');
			}

			return env.router.handle(request);
		} catch (error: unknown) {
			return new Response(error instanceof Error ? error.message : 'Internal error', { status: 500 });
		}
	},
};
