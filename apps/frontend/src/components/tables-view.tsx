'use server';

import { describeProject } from '../lib/db/queries';
import { isError } from '../lib/utils';
import TablesViewFlow from './tables-view-flow';

async function TablesView({ projectId, token }: { projectId: string; token: string }) {
	const describeProjectResponse = await describeProject({ projectId, userToken: token });
	return (
		<>
			{!isError(describeProjectResponse) ? (
				<ul>
					{/* {describeProjectResponse.success.tables.map(table => (
						<li>{table.title}</li>
					))} */}
					<TablesViewFlow tables={describeProjectResponse.success.tables} />
				</ul>
			) : (
				<p>{describeProjectResponse.error}</p>
			)}
		</>
	);
}

function TablesViewFallback() {
	return <p>loading</p>;
}

export { TablesView, TablesViewFallback };
