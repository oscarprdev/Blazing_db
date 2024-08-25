'use server';

import ProjectListDropdown from '../ProjectListDropdown/ProjectListDropdown';
import { listProjects } from '@/src/lib/db/queries';
import { isError } from '@/src/lib/types';
import { IconDots } from '@tabler/icons-react';

type Props = {
	userToken: string;
	projectId?: string;
};

async function ProjectList({ userToken, projectId }: Props) {
	const response = await listProjects({ userToken });

	return (
		<>
			{!isError(response) ? (
				<ProjectListDropdown projectId={projectId} projects={response.success.projects} />
			) : (
				<p className="text-xs text-destructive">{response.error}</p>
			)}
		</>
	);
}

function ProjectListFallback() {
	return (
		<div className="bg-dark1 w-[180px] h-[40px] animate-pulse rounded-xl flex items-center justify-start pl-3">
			<IconDots className="text-light4" size={14} />
		</div>
	);
}

export { ProjectList, ProjectListFallback };
