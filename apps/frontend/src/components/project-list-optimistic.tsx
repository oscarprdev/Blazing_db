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
			{optimisticProjects.length > 0 ? (
				optimisticProjects.map(project => (
					<li
						key={project.projectId}
						className={cn(
							removedId === project.projectId ? 'animate-fade-out' : '',
							currentProjectId === project.projectId
								? 'bg-dark3 hover:bg-dark3 text-light'
								: 'bg-dark2 hover:bg-dark3 hover:text-light',
							'relative px-5 duration-200 p-2 border border-dark3  w-full flex justify-between items-center font-semibold'
						)}>
						<Link
							href={`/dashboard?projectId=${project.projectId}`}
							className="hover:underline duration-150">
							{project.title}
						</Link>
						<DropdownProject
							projectId={project.projectId}
							projectTitle={project.title}
							handleDeleteQuery={handleDeleteQuery}
						/>
					</li>
				))
			) : (
				<p className="text-center text-xs text-light2">Create a project first</p>
			)}
		</ul>
	);
}

export default ProjectListOptimistic;
