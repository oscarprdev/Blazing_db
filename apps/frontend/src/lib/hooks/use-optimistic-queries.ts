import { Query } from '../types';
import { isError } from '../utils';
import { deleteQueryAction } from '@/src/app/actions';
import { useOptimistic, useState } from 'react';
import { toast } from 'sonner';

export type UpdateOptimiticQueriesPayload = { action: 'DELETE'; data: { query: Query } };

export function useOptimiticQueries(queries: Query[]) {
	const [removedId, setRemovedId] = useState<string>();

	const [optimisticQueries, updateOptimisticQueries] = useOptimistic(
		queries,
		(currentState: Query[], { action, data: { query } }: UpdateOptimiticQueriesPayload) => {
			switch (action) {
				case 'DELETE':
					return currentState.filter(q => q.queryId !== query.queryId);
				default:
					return currentState;
			}
		}
	);

	async function handleDeleteQuery(queryId: string) {
		const query = queries.find(q => q.queryId === queryId);
		if (!query) return toast.error('Query not found');

		setRemovedId(queryId);

		setTimeout(() => {
			updateOptimisticQueries({ action: 'DELETE', data: { query } });
		}, 300);

		const response = await deleteQueryAction({ queryId });
		if (isError(response)) return toast.error(response.error);

		return toast.success(response.success);
	}

	return {
		removedId,
		optimisticQueries,
		handleDeleteQuery,
	};
}
