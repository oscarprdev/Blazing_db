'use client';

import { formatQueryTime } from '../lib/format-time';
import { useOptimiticQueries } from '../lib/hooks/use-optimistic-queries';
import { cn } from '../lib/utils';
import DropdownQuery from './dropdown-query';
import { Query } from '@/src/lib/types';

function QueriesListOptimistic({ queries }: { queries: Query[] }) {
	const { removedId, optimisticQueries, handleDeleteQuery } = useOptimiticQueries(queries);

	return (
		<>
			{optimisticQueries.map(query => (
				<li
					key={query.queryId}
					className={cn(
						removedId === query.queryId ? 'animate-fade-out' : '',
						'relative w-full flex flex-col gap-1 p-2 h-[70px] justify-center hover:text-light bg-dark2 hover:bg-dark3 border border-dark3 duration-200'
					)}>
					<p className="truncate">{query.value}</p>
					<p className="text-light5 text-xs">{formatQueryTime(query.createdAt)}</p>
					<DropdownQuery query={query} handleDeleteQuery={handleDeleteQuery} />
				</li>
			))}
		</>
	);
}

export default QueriesListOptimistic;
