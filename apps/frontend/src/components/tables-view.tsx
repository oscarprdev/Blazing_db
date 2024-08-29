'use client';

import { describeProject } from '../lib/db/queries';
import { isError } from '../lib/utils';
import { FormAi, FormAiSkeleton } from './form-ai';
import ProjecttTitle from './project-title';
import TablesViewFlow from './tables-view-flow';
import { IconLoader2 } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

function TablesView({ projectId, token }: { projectId: string; token: string }) {
	const { data, isLoading } = useQuery({
		queryKey: ['describeProject', projectId],
		queryFn: () => describeProject({ projectId, userToken: token }),
	});

	if (data && isError(data)) {
		toast.error(data.error);
	}

	return (
		<>
			{data && !isError(data) ? (
				<>
					<TablesViewFlow tables={data.success.tables} projectTitle={data.success.title}>
						<ProjecttTitle title={data.success.title} />
					</TablesViewFlow>
					<FormAi tables={data.success.tables} type={data.success.type} />
				</>
			) : data ? (
				<p className="text-center text-xs text-destructive">{data.error}</p>
			) : (
				isLoading && <TablesViewFallback />
			)}
		</>
	);
}

function TablesViewFallback() {
	return (
		<section className="relative w-full h-full bg-dark grid place-items-center">
			<IconLoader2 className="animate-spin text-secondary" />
			<FormAiSkeleton />
		</section>
	);
}

export { TablesView, TablesViewFallback };
