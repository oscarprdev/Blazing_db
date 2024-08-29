import { useModal } from '../lib/hooks/use-modal';
import FormEditProject from './form-edit-project';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { IconEdit } from '@tabler/icons-react';

function ModalEditProject({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
	const { modalTriggerRef, handleCloseModal } = useModal();

	return (
		<Dialog>
			<DialogTrigger
				ref={modalTriggerRef}
				className="text-light2 p-1 hover:text-light1 flex items-center gap-2 cursor-pointer">
				<IconEdit size={14} />
				Edit
			</DialogTrigger>
			<DialogContent className="w-80">
				<DialogHeader>
					<DialogTitle>Edit project</DialogTitle>
				</DialogHeader>
				<FormEditProject
					projectId={projectId}
					projectTitle={projectTitle}
					handleCloseModal={handleCloseModal}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default ModalEditProject;
