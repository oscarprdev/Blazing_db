import { ListQueryAdapter } from './list-query.adapter';
import { ListQueryHandler } from './list-query.handler';
import { ListQueryInfra } from './list-query.infra';
import { ListQueryUsecase } from './list-query.usecase';
import { Database } from '@/db';

export const provideListQueryUsecaseSingleton = (db: Database) => {
	const listQueryInfra = new ListQueryInfra(db);
	const listQueryAdapter = new ListQueryAdapter(listQueryInfra);
	const listQueryUsecase = new ListQueryUsecase(listQueryAdapter);

	return new ListQueryHandler(listQueryUsecase);
};
