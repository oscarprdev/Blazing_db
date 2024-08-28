import { Query } from '../types';
import { isError } from '../utils';
import { updateQueryAction } from '@/src/app/actions';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useFormUpdateQuery({ query: { queryId, value, language, response } }: { query: Query }) {
	const [queryResponse, setQueryResponse] = useState<string>(response);
	const searchParams = useSearchParams();

	async function handleSubmit() {
		const projectId = searchParams.get('projectId');
		if (!projectId) return toast.error('Project is not found and is required to apply the query');

		const response = await updateQueryAction({ projectId, queryId, query: value, language });
		if (isError(response)) return toast.error(response.error);

		setQueryResponse(response.success.response);

		setTimeout(() => {
			toast.success(response.success.message);
		}, 2500);
	}

	return {
		queryResponse,
		handleSubmit,
	};
}
