'use client';

import { CreateProjectFormState, useFormCreateProject } from '../lib/hooks/use-form-create-project';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { ProjectType } from '@/src/lib/types';
import { IconLoader2 } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

function FormCreateProject() {
	const { formState, handleFormSubmit } = useFormCreateProject();

	return (
		<Form formState={formState} handleFormSubmit={handleFormSubmit}>
			<CreateProjectSubmitButton />
		</Form>
	);
}

function Form({
	formState,
	handleFormSubmit,
	children,
}: {
	formState: CreateProjectFormState;
	handleFormSubmit(formData: FormData): Promise<void>;
	children: ReactNode;
}) {
	return (
		<form action={handleFormSubmit} className="flex flex-col w-full">
			<label htmlFor="title" className="my-2 text-sm text-light1">
				Project title
				<Input name="title" placeholder="Project.io" className="mt-2" />
			</label>
			{formState.title.error && <p className="text-xs text-destructive mt-1">{formState.title.error}</p>}
			<label htmlFor="url" className="my-2 text-sm text-light1">
				Database url
				<Input type="password" name="url" placeholder="postgresql://abc:a1b2c3@db" className="mt-2" />
			</label>
			{formState.url.error && <p className="text-xs text-destructive mt-1">{formState.url.error}</p>}
			<label htmlFor="type" className="my-2 text-sm text-light1">
				Database type{' '}
				<Select name="type" value={ProjectType.postgreSQL}>
					<SelectTrigger disabled className="w-[180px] bg-dark2 border-dark4 rounded-lg mt-2 capitalize">
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
		<Button type="submit" variant={'accent'} className="mt-10" disabled={pending}>
			{pending ? <IconLoader2 className="animate-spin" /> : 'Submit'}
		</Button>
	);
}

export default FormCreateProject;
