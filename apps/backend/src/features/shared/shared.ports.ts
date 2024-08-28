import { DescribeProjectInfraOutput, DescribeQueryInfraOutput } from './shared.types';
import { UserDb } from '@/types';

export interface SharedPorts {
	findUserByEmail(email: string): Promise<UserDb>;
	describeProject(projectId: string): Promise<DescribeProjectInfraOutput>;
	describeQuery(queryId: string): Promise<DescribeQueryInfraOutput>;
}
