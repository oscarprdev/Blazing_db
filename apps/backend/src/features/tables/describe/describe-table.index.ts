import { DescribeTableHandler } from './describe-table.handler';
import { DescribeTableInfra } from './describe-table.infra';
import { DescribeTableUsecase } from './describe-table.usecase';
import { Database } from '@/db';

export const provideDescribeTableUsecaseSingleton = (db: Database) => {
	const describeTableInfra = new DescribeTableInfra(db);
	const describeTableUsecase = new DescribeTableUsecase(describeTableInfra);

	return new DescribeTableHandler(describeTableUsecase);
};
