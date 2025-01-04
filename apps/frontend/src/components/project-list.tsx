'use server';

import { auth } from '../auth';
import ProjectListOptimistic from './project-list-optimistic';
import { listProjects } from '@/src/lib/db/queries';
import { isError } from '@/src/lib/utils';
import { IconDots } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

async function ProjectList({ projectId }: { projectId?: string }) {
	const session = await auth();
	const response = await listProjects({ token: session?.user?.id || '' });

	if (
		!projectId &&
		!isError(response) &&
		response.success.projects.length > 0 &&
		response.success.projects[0] &&
		'projectId' in response.success.projects[0]
	) {
		redirect(`/dashboard?projectId=${response.success.projects[0]?.projectId}`);
	}

	return (
		<>
			{!isError(response) ? (
				<ProjectListOptimistic currentProjectId={projectId} projects={response.success.projects} />
			) : (
				<ProjectListWrapper>
					<p className="text-xs text-destructive">{response.error}</p>
				</ProjectListWrapper>
			)}
		</>
	);
}

function ProjectListWrapper({ children }: { children: ReactNode }) {
	return <div className="bg-dark1 w-full h-[40px] flex items-center justify-center px-3">{children}</div>;
}

function ProjectListFallback() {
	return (
		<ProjectListWrapper>
			<IconDots className="text-light2 animate-pulse" size={14} />
		</ProjectListWrapper>
	);
}

export { ProjectList, ProjectListFallback };
