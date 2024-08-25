'use client';

import { useFormCreateProject } from '../lib/hooks/use-form-create-project';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { createProjectAction } from '@/src/app/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { ProjectType } from '@/src/lib/types';
import { isError } from '@/src/lib/utils';
import { IconLoader2 } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

function FormCreateProject() {
	async function handleSubmit({
		databaseUrl,
		type,
		projectTitle,
	}: {
		databaseUrl: string;
		type: ProjectType;
		projectTitle: string;
	}) {
		const response = await createProjectAction({ databaseUrl, type, projectTitle });

		if (isError(response)) {
			toast.error(response.error);
			return;
		}

		toast.success(response.success.message);
		redirect(`/dashboard?project=${response.success.projectId}`);
	}

	return (
		<Form handleSubmit={handleSubmit}>
			<CreateProjectSubmitButton />
		</Form>
	);
}

function Form({
	handleSubmit,
	children,
}: {
	handleSubmit: (input: { databaseUrl: string; type: ProjectType; projectTitle: string }) => Promise<void>;
	children: ReactNode;
}) {
	const { formState, handleFormSubmit } = useFormCreateProject({ handleSubmit });

	return (
		<form action={handleFormSubmit} className="flex flex-col w-full">
			<label htmlFor="title" className="my-2 text-sm text-light1">
				Project title
				<Input name="title" placeholder="Project.io" className="mt-2" />
			</label>
			{formState.title.error && <p className="text-xs text-destructive mt-1">{formState.title.error}</p>}
			<label htmlFor="url" className="my-2 text-sm text-light1">
				Database url
				<Input name="url" placeholder="postgresql://abc:a1b2c3@db" className="mt-2" />
			</label>
			{formState.url.error && <p className="text-xs text-destructive mt-1">{formState.url.error}</p>}
			<label htmlFor="type" className="my-2 text-sm text-light1">
				Database type{' '}
				<Select name="type">
					<SelectTrigger className="w-[180px] bg-dark2 border-dark4 rounded-lg mt-2 capitalize">
						<SelectValue placeholder="Select type" />
					</SelectTrigger>
					<SelectContent className="bg-dark2 gap-2 flex flex-col border border-dark4">
						{Object.values(ProjectType).map(type => (
							<SelectItem value={type} className="bg-dark2 hover:bg-dark3 capitalize">
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</label>
			{formState.type.error && <p className="text-xs text-destructive mt-1">{formState.type.error}</p>}
			{children}
		</form>
	);
}

function CreateProjectSubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="mt-10 bg-secondary hover:bg-secondary1 rounded-lg" disabled={pending}>
			{pending ? <IconLoader2 className="animate-spin" /> : 'Submit'}
		</Button>
	);
}

export default FormCreateProject;
