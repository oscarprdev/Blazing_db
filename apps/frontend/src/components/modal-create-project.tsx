import FormCreateProject from './form-create-project';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';

function ModalCreateProject() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'md'}
					className="bg-accent hover:bg-accent1 hover:border-accent2 font-semibold text-light border border-accent1">
					Create project
				</Button>
			</DialogTrigger>
			<DialogContent className="w-80">
				<DialogHeader>
					<DialogTitle>Create new project!</DialogTitle>
				</DialogHeader>
				<FormCreateProject />
			</DialogContent>
		</Dialog>
	);
}

export default ModalCreateProject;
