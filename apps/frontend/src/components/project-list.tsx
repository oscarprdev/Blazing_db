'use server';

import DropdownProjectList from './dropdown-project-list';
import { listProjects } from '@/src/lib/db/queries';
import { isError } from '@/src/lib/utils';
import { IconDots } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

async function ProjectList({ userToken, projectId }: { userToken: string; projectId?: string }) {
	const response = await listProjects({ userToken });

	if (
		!projectId &&
		!isError(response) &&
		response.success.projects.length > 0 &&
		response.success.projects[0] &&
		'projectId' in response.success.projects[0]
	) {
		redirect(`/dashboard?project=${response.success.projects[0]?.projectId}`);
	}

	return (
		<>
			{!isError(response) ? (
				<DropdownProjectList projectId={projectId} projects={response.success.projects} />
			) : (
				<ProjectListWrapper>
					<p className="text-xs text-destructive">{response.error}</p>
				</ProjectListWrapper>
			)}
		</>
	);
}

function ProjectListWrapper({ children }: { children: ReactNode }) {
	return (
		<div className="bg-dark1 min-w-[180px] w-fit h-[40px] rounded-xl flex items-center justify-start px-3">
			{children}
		</div>
	);
}

function ProjectListFallback() {
	return (
		<ProjectListWrapper>
			<IconDots className="text-light4 animate-pulse" size={14} />
		</ProjectListWrapper>
	);
}

export { ProjectList, ProjectListFallback };
