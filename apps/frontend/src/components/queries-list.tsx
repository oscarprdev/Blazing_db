'use server';

import { auth } from '../auth';
import { listQueries } from '../lib/db/queries';
import { isError } from '../lib/utils';
import QueriesListOptimistic from './queries-list-optimistic';
import { IconDots } from '@tabler/icons-react';
import { ReactNode } from 'react';

async function QueriesList({ projectId }: { projectId?: string }) {
	if (!projectId) {
		return (
			<QueriesListWrapper>
				<p className="text-xs text-light4">Select a project first</p>
			</QueriesListWrapper>
		);
	}
	const session = await auth();
	const response = await listQueries({ projectId, token: session?.user?.id || '' });

	return (
		<>
			{!isError(response) ? (
				<ul aria-label="scroll" className="overflow-y-scroll max-h-[350px] w-full">
					{response.success.queries.length > 0 ? (
						<QueriesListOptimistic queries={response.success.queries} />
					) : (
						<QueriesListWrapper>
							<p className="text-xs text-light4">0 queries generated on this project.</p>
						</QueriesListWrapper>
					)}
				</ul>
			) : (
				<QueriesListWrapper>
					<p className="text-xs text-destructive">{response.error}</p>
				</QueriesListWrapper>
			)}
		</>
	);
}

function QueriesListWrapper({ children }: { children: ReactNode }) {
	return <div className="bg-dark1 w-full h-[40px] rounded-xl flex items-center justify-center px-3">{children}</div>;
}

function QueriesListFallback() {
	return (
		<QueriesListWrapper>
			<IconDots className="text-light4 animate-pulse" size={14} />
		</QueriesListWrapper>
	);
}

export { QueriesList, QueriesListFallback };
