import { EditProjectFormState, useFormEditProject } from '../lib/hooks/use-form-edit-project';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { IconLoader2 } from '@tabler/icons-react';
import React, { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

function FormEditProject({
	projectId,
	projectTitle,
	handleCloseModal,
}: {
	projectId: string;
	projectTitle: string;
	handleCloseModal: () => void;
}) {
	const { formState, handleFormSubmit } = useFormEditProject({ projectTitle, projectId, handleCloseModal });

	return (
		<Form formState={formState} handleFormSubmit={handleFormSubmit} projectTitle={projectTitle}>
			<EditProjectSubmitButton />
		</Form>
	);
}

function Form({
	formState,
	projectTitle,
	handleFormSubmit,
	children,
}: {
	formState: EditProjectFormState;
	projectTitle: string;
	handleFormSubmit(formData: FormData): Promise<void>;
	children: ReactNode;
}) {
	return (
		<form action={handleFormSubmit} className="flex flex-col w-full">
			<label htmlFor="title" className="my-2 text-sm text-light1">
				Project title
				<Input name="title" placeholder="Project.io" className="mt-2" defaultValue={projectTitle} />
			</label>
			{formState.title.error && <p className="text-xs text-destructive mt-1">{formState.title.error}</p>}

			{children}
		</form>
	);
}

function EditProjectSubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="mt-10 bg-secondary hover:bg-secondary1 rounded-lg" disabled={pending}>
			{pending ? <IconLoader2 className="animate-spin" /> : 'Submit'}
		</Button>
	);
}

export default FormEditProject;
