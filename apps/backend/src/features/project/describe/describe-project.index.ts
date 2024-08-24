import { DescribeProjectHandler } from './describe-project.handler';
import { DescribeProjectUsecase } from './describe-project.usecase';
import { DescribeProjectPostgreAdapter } from './postgre/describe-project.postgre-adapter';
import { DescribeProjecPostgreInfra } from './postgre/describe-project.postgre-infra';
import { Database } from '@/db';

export const provideDescribeProjectPostgreUsecaseSingleton = (db: Database) => {
	const describeProjectPostgreInfra = new DescribeProjecPostgreInfra(db);
	const describeProjectAdapter = new DescribeProjectPostgreAdapter(describeProjectPostgreInfra);
	const describeProjectUsecase = new DescribeProjectUsecase(describeProjectAdapter);

	return new DescribeProjectHandler(describeProjectUsecase);
};
