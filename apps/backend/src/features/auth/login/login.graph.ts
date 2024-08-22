import { LoginHandler } from './login.handler';
import { LoginInfra } from './login.infra';
import { LoginUsecase } from './login.usecase';
import { Database } from '@/db';
import { SharedInfra } from '@/features/shared/shared.infra';

export const provideLoginUsecaseSingleton = (db: Database) => {
	const loginInfra = new LoginInfra(db);
	const sharedInfra = new SharedInfra(db);
	const loginUsecase = new LoginUsecase(loginInfra, sharedInfra);

	return new LoginHandler(loginUsecase);
};
