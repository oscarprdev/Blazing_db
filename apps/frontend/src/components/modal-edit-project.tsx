import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { IconEdit } from '@tabler/icons-react';

function ModalEditProject() {
	return (
		<Dialog>
			<DialogTrigger className="text-light2 p-1 hover:text-light1 flex items-center gap-2 cursor-pointer">
				<IconEdit size={14} />
				Edit
			</DialogTrigger>
			<DialogContent className="w-80">
				<DialogHeader>
					<DialogTitle>Edit project</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default ModalEditProject;
