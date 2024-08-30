'use server';

import { auth } from '../auth';
import { describeProject } from '../lib/db/queries';
import { isError } from '../lib/utils';
import { FormAi, FormAiSkeleton } from './form-ai';
import ProjecttTitle from './project-title';
import TablesViewFlow from './tables-view-flow';
import { IconLoader2 } from '@tabler/icons-react';

async function TablesView({ projectId }: { projectId: string }) {
	const session = await auth();
	const describeProjectResponse = await describeProject({ projectId, userToken: session?.user?.id || '' });

	return (
		<>
			{!isError(describeProjectResponse) ? (
				<>
					<TablesViewFlow
						tables={describeProjectResponse.success.tables}
						projectTitle={describeProjectResponse.success.title}>
						<ProjecttTitle title={describeProjectResponse.success.title} />
					</TablesViewFlow>
					<FormAi
						tables={describeProjectResponse.success.tables}
						type={describeProjectResponse.success.type}
					/>
				</>
			) : (
				<p className="text-xs text-destructive">{describeProjectResponse.error}</p>
			)}
		</>
	);
}

function TablesViewFallback() {
	return (
		<section className="relative w-full h-full bg-dark grid place-items-center">
			<IconLoader2 className="animate-spin text-accent" />
			<FormAiSkeleton />
		</section>
	);
}

export { TablesView, TablesViewFallback };
