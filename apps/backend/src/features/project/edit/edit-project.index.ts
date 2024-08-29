import { EditProjectHandler } from './edit-project.handler';
import { EditProjectInfra } from './edit-project.infra';
import { EditProjectUsecase } from './edit-project.usecase';
import { Database } from '@/db';

export const provideEditProjectPostgreUsecaseSingleton = (db: Database) => {
	const editProjectInfra = new EditProjectInfra(db);
	const editProjectUsecase = new EditProjectUsecase(editProjectInfra);

	return new EditProjectHandler(editProjectUsecase);
};
