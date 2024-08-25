import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';

function CreateProjectModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Create project</Button>
			</DialogTrigger>
			<DialogContent className="w-80">
				<DialogHeader>
					<DialogTitle>Create new project!</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default CreateProjectModal;
