import { Env } from '..';
import { Database } from '../db';
import { corsMiddleware } from '../middleware/cors';
import { provideLoginUsecaseSingleton } from '@/features/auth/login/login.graph';
import { provideRegisterUsecaseSingleton } from '@/features/auth/register/register.graph';
import { provideCreateProjectPostgreUsecaseSingleton } from '@/features/project/create/create-project.index';
import { provideDescribeProjectPostgreUsecaseSingleton } from '@/features/project/describe/describe-project.index';
import { Router, RouterType } from 'itty-router';

interface RouterStrategy {
	handle(request: Request): Promise<Response>;
	router(db: Database, env: Env): RouterType;
}

export class DefaultRouter implements RouterStrategy {
	public internalRouter: RouterType;

	constructor() {
		this.internalRouter = Router();
	}

	router(db: Database, env: Env) {
		this.manageRoutes(db, env);

		return this.internalRouter;
	}

	handle(request: Request) {
		return Router().handle(request);
	}

	private manageRoutes(db: Database, env: Env) {
		this.internalRouter.post(
			`/auth/login`,
			corsMiddleware(async req => {
				const loginHandler = provideLoginUsecaseSingleton(db);
				return loginHandler.handleRequest(req, env);
			})
		);

		this.internalRouter.post(
			`/auth/register`,
			corsMiddleware(async req => {
				const registerHandler = provideRegisterUsecaseSingleton(db);
				return registerHandler.handleRequest(req, env);
			})
		);

		this.internalRouter.post(
			`/project/:userId/create`,
			corsMiddleware(async req => {
				const createProjectHandler = provideCreateProjectPostgreUsecaseSingleton(db);
				return createProjectHandler.handleRequest(req, env);
			})
		);

		this.internalRouter.get(
			`/project/:projectId/postgre`,
			corsMiddleware(async req => {
				const describeProjectHandler = provideDescribeProjectPostgreUsecaseSingleton(db);
				return describeProjectHandler.handleRequest(req, env);
			})
		);
	}
}
