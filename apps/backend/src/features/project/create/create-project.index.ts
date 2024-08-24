import { CreateProjectHandler } from './create-project.handler';
import { CreateProjectInfra } from './create-project.infra';
import { CreateProjectUsecase } from './create-project.usecase';
import { Database } from '@/db';

export const provideCreateProjectPostgreUsecaseSingleton = (db: Database) => {
	const createProjectInfra = new CreateProjectInfra(db);
	const createProjectUsecase = new CreateProjectUsecase(createProjectInfra);

	return new CreateProjectHandler(createProjectUsecase);
};
