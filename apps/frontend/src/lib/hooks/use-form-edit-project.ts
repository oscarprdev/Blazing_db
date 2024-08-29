import { isError } from '../utils';
import { titleSchema } from '../zod';
import { editProjectAction } from '@/src/app/actions';
import { useState } from 'react';
import { toast } from 'sonner';

export type EditProjectFormState = {
	title: {
		value: string | null;
		error: string | null;
	};
};

const EDIT_PROJECT_FORM_DEFAULT_STATE: EditProjectFormState = {
	title: {
		value: null,
		error: null,
	},
};

export function useFormEditProject({
	projectId,
	projectTitle,
	handleCloseModal,
}: {
	projectId: string;
	projectTitle: string;
	handleCloseModal: () => void;
}) {
	const [formState, setFormState] = useState<EditProjectFormState>({
		...EDIT_PROJECT_FORM_DEFAULT_STATE,
		title: { ...EDIT_PROJECT_FORM_DEFAULT_STATE.title, value: projectTitle },
	});

	async function handleSubmit({ projectTitle }: { projectTitle: string }) {
		const response = await editProjectAction({ projectId, projectTitle });

		if (isError(response)) {
			toast.error(response.error);
			return;
		}

		setTimeout(() => {
			toast.success(response.success.message);
			handleCloseModal();
		}, 1000);
	}

	async function handleFormSubmit(formData: FormData) {
		const title = formData.get('title') as string;

		const errors = {
			title: '',
		};

		if (!title) {
			errors.title = 'Project title is required';
		}

		if (errors.title) {
			return setFormState(prev => ({
				title: {
					value: prev.title.value,
					error: errors.title,
				},
			}));
		}

		const titleResult = titleSchema.safeParse(title);
		if (!titleResult.success && titleResult.error.errors[0]) {
			const errorMessage = titleResult.error.errors[0].message;
			errors.title = errorMessage;
		}

		if (errors.title) {
			return setFormState(prev => ({
				title: {
					value: prev.title.value,
					error: errors.title,
				},
			}));
		}

		await handleSubmit({ projectTitle: title });
	}

	return {
		formState,
		handleFormSubmit,
	};
}
