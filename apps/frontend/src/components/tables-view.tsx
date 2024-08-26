'use server';

import { auth } from '../auth';
import { describeProject } from '../lib/db/queries';
import { isError } from '../lib/utils';
import ProjecttTitle from './project-title';
import TablesViewFlow from './tables-view-flow';
import { IconLoader2 } from '@tabler/icons-react';

async function TablesView({ projectId }: { projectId: string }) {
	const session = await auth();
	const describeProjectResponse = await describeProject({ projectId, userToken: session?.user?.id || '' });

	return (
		<>
			{!isError(describeProjectResponse) ? (
				<TablesViewFlow tables={describeProjectResponse.success.tables} projectId={projectId}>
					<ProjecttTitle title={describeProjectResponse.success.title} />
				</TablesViewFlow>
			) : (
				<p className="text-xs text-destructive">{describeProjectResponse.error}</p>
			)}
		</>
	);
}

function TablesViewFallback() {
	return <IconLoader2 className="text-secondary1 animate-spin" />;
}

export { TablesView, TablesViewFallback };
