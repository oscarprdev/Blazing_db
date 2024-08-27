import { ChangeEvent, useRef } from 'react';

export function useAiTextarea({ updateFormState }: { updateFormState: ({ prompt }: { prompt: string }) => void }) {
	const aiTextareaRef = useRef<HTMLTextAreaElement>(null);

	function handlePromptChange(e: ChangeEvent<HTMLTextAreaElement>) {
		const target = e.target;
		if (target instanceof HTMLTextAreaElement) {
			if (aiTextareaRef.current) {
				aiTextareaRef.current.style.height = 'auto';
				aiTextareaRef.current.style.height = aiTextareaRef.current.scrollHeight + 'px';
			}

			updateFormState({ prompt: target.value });
		}
	}

	return {
		ref: aiTextareaRef,
		handlePromptChange,
	};
}
