'use server';

import { auth } from '../auth';
import { listProjects } from '@/src/lib/db/queries';
import { isError } from '@/src/lib/utils';
import { IconDots } from '@tabler/icons-react';
import Link from 'next/link';
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
				<>
					{response.success.projects.map(project => (
						<ProjectItem key={project.projectId} projectId={project.projectId} title={project.title} />
					))}
				</>
			) : (
				<ProjectListWrapper>
					<p className="text-xs text-destructive">{response.error}</p>
				</ProjectListWrapper>
			)}
		</>
	);
}

function ProjectItem({ projectId, title }: { projectId: string; title: string }) {
	return (
		<div
			key={projectId}
			className="hover:text-light px-4 my-1 duration-200 p-2 rounded-lg bg-dark3 w-full flex justify-between items-center hover:bg-dark4 font-semibold">
			<Link
				href={{
					pathname: '/dashboard',
					query: { projectId },
				}}
				replace
				className="hover:underline duration-150">
				{title}
			</Link>
			<IconDots size={16} />
		</div>
	);
}

function ProjectListWrapper({ children }: { children: ReactNode }) {
	return <div className="bg-dark1 w-full h-[40px] rounded-xl flex items-center justify-center px-3">{children}</div>;
}

function ProjectListFallback() {
	return (
		<ProjectListWrapper>
			<IconDots className="text-light4 animate-pulse" size={14} />
		</ProjectListWrapper>
	);
}

export { ProjectList, ProjectListFallback };
