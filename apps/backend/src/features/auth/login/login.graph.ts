import { LoginHandler } from './login.handler';
import { LoginUsecase } from './login.usecase';
import { Database } from '@/db';
import { SharedInfra } from '@/features/shared/shared.infra';

export const provideLoginUsecaseSingleton = (db: Database) => {
	const sharedInfra = new SharedInfra(db);
	const loginUsecase = new LoginUsecase(sharedInfra);

	return new LoginHandler(loginUsecase);
};
