import { ListProjectsHandler } from './list-project.handler';
import { ListProjectInfra } from './list-project.infra';
import { ListProjectsUsecase } from './list-project.usecase';
import { Database } from '@/db';

export const provideListProjectsPostgreUsecaseSingleton = (db: Database) => {
	const listProjectsInfra = new ListProjectInfra(db);
	const listProjectsUsecase = new ListProjectsUsecase(listProjectsInfra);

	return new ListProjectsHandler(listProjectsUsecase);
};
