'use client';

import { useOptimiticProjects } from '../lib/hooks/use-optimistic-projects';
import { Project } from '../lib/types';
import { cn } from '../lib/utils';
import DropdownProject from './dropdown-project';
import Link from 'next/link';
import React from 'react';

function ProjectListOptimistic({ currentProjectId, projects }: { currentProjectId?: string; projects: Project[] }) {
	const { removedId, optimisticProjects, handleDeleteQuery } = useOptimiticProjects(projects);

	return (
		<ul aria-label="scroll" className="overflow-y-scroll max-h-[150px] w-full">
			{optimisticProjects.map(project => (
				<li
					key={project.projectId}
					className={cn(
						removedId === project.projectId ? 'animate-fade-out' : '',
						currentProjectId === project.projectId
							? 'bg-dark3 hover:bg-dark4 text-light'
							: 'bg-dark2 hover:bg-dark3 hover:text-light',
						'relative px-5 my-1 duration-200 p-2 rounded-lg border border-dark3  w-full flex justify-between items-center font-semibold'
					)}>
					{currentProjectId === project.projectId && (
						<span className="absolute size-2 rounded-full top-0 left-0 bg-secondary"></span>
					)}
					<Link href={`/dashboard?projectId=${project.projectId}`} className="hover:underline duration-150">
						{project.title}
					</Link>
					<DropdownProject
						projectId={project.projectId}
						projectTitle={project.title}
						handleDeleteQuery={handleDeleteQuery}
					/>
				</li>
			))}
		</ul>
	);
}

export default ProjectListOptimistic;
