import { Project } from '../types';
import { isError } from '../utils';
import { deleteProjectAction } from '@/src/app/actions';
import { useOptimistic, useState } from 'react';
import { toast } from 'sonner';

export type UpdateOptimiticProjectsPayload = { action: 'DELETE'; data: { project: Project } };

export function useOptimiticProjects(projects: Project[]) {
	const [removedId, setRemovedId] = useState<string>();

	const [optimisticProjects, updateOptimisticProjects] = useOptimistic(
		projects,
		(currentState: Project[], { action, data: { project } }: UpdateOptimiticProjectsPayload) => {
			switch (action) {
				case 'DELETE':
					return currentState.filter(q => q.projectId !== project.projectId);
				default:
					return currentState;
			}
		}
	);

	async function handleDeleteQuery(projectId: string) {
		const project = projects.find(p => p.projectId === projectId);
		if (!project) return toast.error('Project not found');

		setRemovedId(projectId);

		setTimeout(() => {
			updateOptimisticProjects({ action: 'DELETE', data: { project } });
		}, 300);

		const response = await deleteProjectAction({ projectId });
		if (isError(response)) return toast.error(response.error);

		return toast.success(response.success);
	}

	return {
		removedId,
		optimisticProjects,
		handleDeleteQuery,
	};
}