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
	handleDeleteQuery: (projectId: string) => Promise<void>;
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
				<div className="flex flex-col w-full gap-5 pt-1">
					<label className="text-sm text-light2 text-center -mb-3">
						<span className="text-destructive">{projectTitle}</span>
					</label>
					<p className="text-xs text-light2 text-center pb-1">
						The project will be only deleted from BlazingDb. Please contact with your database hosting
						provider to permanent delete.
					</p>

					<div className="flex items-center w-full gap-5 justify-center">
						<Button onClick={handleCloseModal} variant={'accent'}>
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
