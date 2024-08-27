import { CreateQueryHandler } from './create-query.handler';
import { CreateQueryUsecase } from './create-query.usecase';
import { CreateQueryPostreAdapter } from './postgre/create-query.postgre-adapter';
import { CreateQueryPostgreInfra } from './postgre/create-query.postgre.infra';
import { Database } from '@/db';

export const provideCreateQueryPostgreUsecaseSingleton = (db: Database) => {
	const createQueryPostgreInfra = new CreateQueryPostgreInfra(db);
	const createQueryAdapter = new CreateQueryPostreAdapter(createQueryPostgreInfra);
	const createQueryUsecase = new CreateQueryUsecase(createQueryAdapter);

	return new CreateQueryHandler(createQueryUsecase);
};
