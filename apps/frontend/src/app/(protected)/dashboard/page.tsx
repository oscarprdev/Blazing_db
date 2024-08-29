'use server';

import { auth } from '@/src/auth';
import AccordionProjects from '@/src/components/accordion-projects';
import AccordionQueries from '@/src/components/accordion-queries';
import Aside from '@/src/components/aside';
import HeaderDashboard from '@/src/components/header-dashboard';
import { TablesView } from '@/src/components/tables-view';

async function DashboardPage({
	searchParams: { projectId },
}: {
	searchParams: {
		projectId: string | undefined;
	};
}) {
	const session = await auth();

	return (
		<div className="flex flex-col m-0 h-screen p-3">
			<HeaderDashboard />
			<main className="relative flex w-full bg-dark h-full mt-2 overflow-hidden">
				<Aside>
					<AccordionProjects projectId={projectId} />
					{projectId && <AccordionQueries projectId={projectId} />}
				</Aside>
				<section className="relative grid place-items-center max-w-full flex-1 overflow-hidden">
					{/* <Suspense key={projectId} fallback={<TablesViewFallback />}>
						{projectId && session?.user?.id && <TablesView projectId={projectId} token={session.user.id} />}
					</Suspense> */}
					{projectId && session?.user?.id && <TablesView projectId={projectId} token={session.user.id} />}
				</section>
			</main>
		</div>
	);
}

export default DashboardPage;
