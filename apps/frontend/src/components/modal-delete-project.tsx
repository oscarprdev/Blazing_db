import { useModal } from '../lib/hooks/use-modal';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Trash } from 'lucide-react';

function ModalDeleteProject({
	projectId,
	projectTitle,
	handleDeleteQuery,
}: {
	projectId: string;
	projectTitle: string;
	handleDeleteQuery: (projectId: string) => Promise<string | number>;
}) {
	const { modalTriggerRef, handleCloseModal } = useModal();

	return (
		<Dialog>
			<DialogTrigger
				ref={modalTriggerRef}
				className="text-light2 p-1 hover:text-light1 flex items-center gap-2 cursor-pointer">
				<Trash size={14} />
				Remove
			</DialogTrigger>
			<DialogContent className="w-80">
				<DialogHeader>
					<DialogTitle>Delete project</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col w-full gap-5">
					<p className="text-light2 text-center py-2">
						Are you about deleting the project: <span className="text-destructive">{projectTitle}</span>
					</p>
					<div className="flex items-center w-full gap-5 justify-center">
						<Button onClick={handleCloseModal} variant={'secondary'}>
							Close
						</Button>
						<Button onClick={() => handleDeleteQuery(projectId)}>Delete</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ModalDeleteProject;
