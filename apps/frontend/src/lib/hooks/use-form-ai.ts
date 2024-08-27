import { AiLanguage, ProjectType, Table } from '../types';
import { isError } from '../utils';
import { generateAiResponseAction } from '@/src/app/actions';
import { readStreamableValue } from 'ai/rsc';
import { useState } from 'react';
import { toast } from 'sonner';

type AiFormState = {
	prompt: string;
	aiResponse: {
		value: string;
		language: AiLanguage;
	};
};

const AI_FORM_DEFAULT_STATE: AiFormState = {
	prompt: '',
	aiResponse: {
		value: '',
		language: AiLanguage.JAVASCRIPT,
	},
};

export function useFomAi({ tables, type }: { tables: Table[]; type: ProjectType }) {
	const [formState, setFormState] = useState<AiFormState>(AI_FORM_DEFAULT_STATE);

	async function handleSubmit(formData: FormData) {
		const prompt = formData.get('prompt') as string;

		setFormState(prev => ({ ...prev, aiResponse: AI_FORM_DEFAULT_STATE.aiResponse }));

		const response = await generateAiResponseAction({ prompt, tables, type });
		if (isError(response)) return toast.error(response.error);

		try {
			for await (const delta of readStreamableValue(response.success.output)) {
				setFormState(prev => ({
					...prev,
					aiResponse: {
						value: `${prev.aiResponse.value}${delta}`,
						language: prev.aiResponse.language,
					},
				}));
			}
		} catch (error) {
			return toast.error(error as string);
		}
	}

	async function updateFormState({ prompt }: { prompt: string }) {
		setFormState(prev => ({ ...prev, prompt }));
	}

	function handleClearForm() {
		setFormState(AI_FORM_DEFAULT_STATE);
	}

	return {
		formState: {
			promp: formState.prompt,
			aiResponse: {
				value: formState.aiResponse.value
					.replaceAll('```', '')
					.replaceAll(AiLanguage.SQL, '')
					.replaceAll(AiLanguage.JAVASCRIPT, ''),
				language: formState.aiResponse.value.includes(AiLanguage.SQL) ? AiLanguage.SQL : AiLanguage.JAVASCRIPT,
			},
		},
		handleSubmit,
		handleClearForm,
		updateFormState,
	};
}
