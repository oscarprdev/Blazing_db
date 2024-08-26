'use server';

import { auth } from '../auth';
import { listProjects } from '@/src/lib/db/queries';
import { cn, isError } from '@/src/lib/utils';
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
						<ProjectItem
							key={project.projectId}
							projectId={project.projectId}
							title={project.title}
							currentProjectId={projectId}
						/>
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

function ProjectItem({
	projectId,
	title,
	currentProjectId,
}: {
	projectId: string;
	title: string;
	currentProjectId?: string;
}) {
	return (
		<div
			key={projectId}
			className={cn(
				currentProjectId === projectId
					? 'bg-dark4 hover:bg-dark5 text-light'
					: 'bg-dark3 hover:bg-dark4 hover:text-light',
				'relative px-5 my-1 duration-200 p-2 rounded-lg  w-full flex justify-between items-center font-semibold'
			)}>
			{currentProjectId === projectId && (
				<span className="absolute size-2 rounded-full top-0 left-0 bg-secondary"></span>
			)}
			<Link
				href={{
					pathname: '/dashboard',
					query: { projectId },
				}}
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
