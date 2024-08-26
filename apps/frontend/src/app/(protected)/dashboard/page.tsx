'use server';

import AccordionProjects from '@/src/components/accordion-projects';
import AccordionQueries from '@/src/components/accordion-queries';
import Aside from '@/src/components/aside';
import HeaderDashboard from '@/src/components/header-dashboard';
import { TablesView, TablesViewFallback } from '@/src/components/tables-view';
import { Suspense } from 'react';

async function DashboardPage({
	searchParams: { projectId },
}: {
	searchParams: {
		projectId: string | undefined;
	};
}) {
	console.log('project', projectId);

	return (
		<div className="flex flex-col m-0 h-screen p-3">
			<HeaderDashboard />
			<main className="relative flex w-full bg-dark h-full mt-2 overflow-hidden">
				<Aside>
					<AccordionProjects projectId={projectId} />
					<AccordionQueries />
				</Aside>
				<section className="relative grid place-items-center max-w-full flex-1 overflow-hidden">
					<Suspense key={projectId} fallback={<TablesViewFallback />}>
						{projectId && <TablesView projectId={projectId} />}
					</Suspense>
				</section>
			</main>
		</div>
	);
}

export default DashboardPage;
