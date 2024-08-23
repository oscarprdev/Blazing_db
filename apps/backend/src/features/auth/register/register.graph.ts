import { RegisterHandler } from './register.handler';
import { RegisterInfra } from './register.infra';
import { RegisterUsecase } from './register.usecase';
import { Database } from '@/db';
import { SharedInfra } from '@/features/shared/shared.infra';

export const provideRegisterUsecaseSingleton = (db: Database) => {
	const registerInfra = new RegisterInfra(db);
	const sharedInfra = new SharedInfra(db);
	const registerUsecase = new RegisterUsecase(registerInfra, sharedInfra);

	return new RegisterHandler(registerUsecase);
};
