import ModalDeleteProject from './modal-delete-project';
import ModalEditProject from './modal-edit-project';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu';
import { IconDots } from '@tabler/icons-react';

function DropdownProject({
	projectId,
	projectTitle,
	handleDeleteQuery,
}: {
	projectId: string;
	projectTitle: string;
	handleDeleteQuery: (projectId: string) => Promise<string | number>;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="absolute top-2 right-2 outline-none">
				<IconDots size={16} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 ml-28 p-3 rounded-lg">
				<ModalEditProject />
				<ModalDeleteProject
					projectId={projectId}
					projectTitle={projectTitle}
					handleDeleteQuery={handleDeleteQuery}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default DropdownProject;
