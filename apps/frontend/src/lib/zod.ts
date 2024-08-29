import { ProjectType } from './types';
import { z } from 'zod';

export const defaultUrlSchema = z.string();

export const titleSchema = z
	.string()
	.min(4, { message: 'Project title must be at least 4 characters long' })
	.max(15, { message: 'Project title must be at most 15 characters long' });

export const postgresUrlSchema = z
	.string()
	.regex(
		/^postgresql:\/\/(?<user>[^:]+):(?<password>[^@]+)@(?<host>[^:/]+)(:(?<port>\d+))?\/(?<database>[^?]+)(\?(.+))?$/,
		{
			message: 'Invalid PostgreSQL connection URL format',
		}
	);

export const mongodbUrlSchema = z
	.string()
	.regex(
		/^mongodb:\/\/(?<user>[^:]+):(?<password>[^@]+)@(?<host>[^:/]+)(:(?<port>\d+))?\/(?<database>[^?]+)(\?(.+))?$/,
		{
			message: 'Invalid MongoDB connection URL format',
		}
	);

export const typeSchema = z.enum([ProjectType.postgreSQL, ProjectType.mongoDb]);
