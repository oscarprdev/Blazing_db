import { DeleteProjectAdapter } from './delete-project.adapter';
import { DeleteProjectHandler } from './delete-project.handler';
import { DeleteProjectInfra } from './delete-project.infra';
import { DeleteProjectUsecase } from './delete-project.usecase';
import { Database } from '@/db';

export const provideDeleteProjectUsecaseSingleton = (db: Database) => {
	const deleteProjectInfra = new DeleteProjectInfra(db);
	const deleteProjectAdapter = new DeleteProjectAdapter(deleteProjectInfra);
	const deleteProjectUsecase = new DeleteProjectUsecase(deleteProjectAdapter);

	return new DeleteProjectHandler(deleteProjectUsecase);
};
