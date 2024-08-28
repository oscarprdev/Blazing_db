import { Env } from '..';
import { Database } from '../db';
import { corsMiddleware } from '../middleware/cors';
import { provideLoginUsecaseSingleton } from '@/features/auth/login/login.graph';
import { provideRegisterUsecaseSingleton } from '@/features/auth/register/register.graph';
import { provideCreateProjectPostgreUsecaseSingleton } from '@/features/project/create/create-project.index';
import { provideDeleteProjectUsecaseSingleton } from '@/features/project/delete/delete-project.index';
import { DescribeProjectController } from '@/features/project/describe/describe-project.controller';
import { provideDescribeProjectPostgreUsecaseSingleton } from '@/features/project/describe/describe-project.index';
import { provideListProjectsPostgreUsecaseSingleton } from '@/features/project/list/list-project.index';
import { CreateQueryController } from '@/features/query/create/create-query.controller';
import { provideDeleteQueryUsecaseSingleton } from '@/features/query/delete/delete-query.index';
import { provideListQueryUsecaseSingleton } from '@/features/query/list/list-query.index';
import { provideDescribeTableUsecaseSingleton } from '@/features/tables/describe/describe-table.index';
import { authMiddleware } from '@/middleware/auth';
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
		/**
		 * Login user
		 * */
		this.internalRouter.post(
			`/auth/login`,
			corsMiddleware(async req => {
				const loginHandler = provideLoginUsecaseSingleton(db);
				return loginHandler.handleRequest(req, env);
			})
		);

		/**
		 * Register user
		 * */
		this.internalRouter.post(
			`/auth/register`,
			corsMiddleware(async req => {
				const registerHandler = provideRegisterUsecaseSingleton(db);
				return registerHandler.handleRequest(req, env);
			})
		);

		/**
		 * Create new project
		 * */
		this.internalRouter.post(
			`/project/create`,
			corsMiddleware(
				authMiddleware(
					async req => {
						const handler = provideCreateProjectPostgreUsecaseSingleton(db);
						return handler.handleRequest(req, env);
					},
					env,
					db
				)
			)
		);

		/**
		 * List projects
		 * */
		this.internalRouter.get(
			`/project/list`,
			corsMiddleware(
				authMiddleware(
					async req => {
						const handler = provideListProjectsPostgreUsecaseSingleton(db);
						return handler.handleRequest(req, env);
					},
					env,
					db
				)
			)
		);

		/**
		 * Describe project by project id
		 * */
		this.internalRouter.get(
			`/project/:projectId`,
			corsMiddleware(
				authMiddleware(
					async req => {
						const handler = await new DescribeProjectController(db).serveHandler(req.params.projectId);
						return handler.handleRequest(req, env);
					},
					env,
					db
				)
			)
		);

		/**
		 * Delete project
		 * */
		this.internalRouter.delete(
			`/project/:projectId`,
			corsMiddleware(
				authMiddleware(
					async req => {
						const handler = provideDeleteProjectUsecaseSingleton(db);
						return handler.handleRequest(req, env);
					},
					env,
					db
				)
			)
		);

		/**
		 * List queries by project id
		 * */
		this.internalRouter.get(
			`/query/list/:projectId`,
			corsMiddleware(
				authMiddleware(
					async req => {
						const handler = provideListQueryUsecaseSingleton(db);
						return handler.handleRequest(req, env);
					},
					env,
					db
				)
			)
		);

		/**
		 * Create new query
		 * */
		this.internalRouter.post(
			`/query/:projectId`,
			corsMiddleware(
				authMiddleware(
					async req => {
						const handler = await new CreateQueryController(db).serveHandler(req.params.projectId);
						return handler.handleRequest(req, env);
					},
					env,
					db
				)
			)
		);

		/**
		 * Delete query
		 * */
		this.internalRouter.delete(
			`/query/:queryId`,
			corsMiddleware(
				authMiddleware(
					async req => {
						const handler = provideDeleteQueryUsecaseSingleton(db);
						return handler.handleRequest(req, env);
					},
					env,
					db
				)
			)
		);

		/**
		 * Describe table values
		 * */
		this.internalRouter.get(
			`/table/:projectId/:table`,
			corsMiddleware(
				authMiddleware(
					async req => {
						const handler = provideDescribeTableUsecaseSingleton(db);
						return handler.handleRequest(req, env);
					},
					env,
					db
				)
			)
		);
	}
}
