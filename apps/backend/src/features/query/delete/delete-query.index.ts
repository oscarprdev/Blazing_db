import { DeleteQueryHandler } from './delete-query.handler';
import { DeleteQueryInfra } from './delete-query.infra';
import { DeleteQueryUsecase } from './delete-query.usecase';
import { Database } from '@/db';

export const provideDeleteQueryUsecaseSingleton = (db: Database) => {
	const deleteQueryInfra = new DeleteQueryInfra(db);
	const deleteQueryUsecase = new DeleteQueryUsecase(deleteQueryInfra);

	return new DeleteQueryHandler(deleteQueryUsecase);
};
