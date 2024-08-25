'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Project } from '@/src/lib/types';
import { useRouter } from 'next/navigation';

type Props = {
	projects: Project[];
	projectId?: string;
};

function ProjectListDropdown({ projectId, projects }: Props) {
	const router = useRouter();

	function handleSelectProjectChange(value: string) {
		router.push(`/dashboard?project=${value}`);
	}

	return (
		<Select onValueChange={handleSelectProjectChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue
					placeholder={projects.find(project => project.projectId === projectId)?.title || 'Select project'}
				/>
			</SelectTrigger>
			<SelectContent>
				{projects.map(project => (
					<SelectItem value={project.projectId}>{project.title}</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export default ProjectListDropdown;
