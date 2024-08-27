'use server';

import { auth } from '../auth';
import { listQueries } from '../lib/db/queries';
import { isError } from '../lib/utils';
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
				<ul aria-label="scroll" className="overflow-y-scroll max-h-[320px]">
					{response.success.queries.length > 0 ? (
						response.success.queries.map(query => (
							<li className="flex flex-col gap-1 p-2 h-[70px] my-2 justify-center rounded-lg hover:text-light bg-dark2 hover:bg-dark3 border border-dark3 duration-200">
								<p className="truncate">{query.value}</p>
								<p className="text-light5 text-xs">{query.createdAt}</p>
							</li>
						))
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
