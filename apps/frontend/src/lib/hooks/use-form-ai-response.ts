import { AiLanguage } from '../types';
import { isError } from '../utils';
import { applyQueryAction } from '@/src/app/actions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useFormAiResponse({
	aiResponse: { value, language },
}: {
	aiResponse: { value: string; language: AiLanguage };
}) {
	const [isVisible, setIsVisible] = useState(value.length > 0);
	const searchParams = useSearchParams();
	const [queryResponse, setQueryResponse] = useState<string>();

	async function handleSubmit() {
		const projectId = searchParams.get('projectId');
		if (!projectId) return toast.error('Project is not found and is required to apply the query generated');

		const response = await applyQueryAction({ projectId, query: value, language: language });
		if (isError(response)) return toast.error(response.error);

		setQueryResponse(response.success.response);

		setTimeout(() => {
			toast.success(response.success.message);
		}, 2500);
	}

	function handleIsVisible() {
		setIsVisible(!isVisible);
	}

	useEffect(() => {
		setIsVisible(value.length > 0);
		setQueryResponse('');
	}, [value]);

	return {
		isVisible,
		queryResponse,
		handleIsVisible,
		handleSubmit,
	};
}
