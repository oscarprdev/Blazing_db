'use server';

import { auth } from '@/src/auth';
import Aside from '@/src/components/aside';
import HeaderDashboard from '@/src/components/header-dashboard';
import { ProjectList, ProjectListFallback } from '@/src/components/project-list';
import { TablesView, TablesViewFallback } from '@/src/components/tables-view';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function DashboardPage({
	searchParams: { project },
}: {
	searchParams: {
		project: string | undefined;
	};
}) {
	const session = await auth();
	if (!session?.user?.id || !session.user.email) return redirect('/');

	return (
		<div className="flex flex-col m-0 h-screen p-3">
			<HeaderDashboard email={session.user.email} />
			<main className="relative flex w-full bg-dark h-full mt-2 overflow-hidden">
				<Aside>
					<p className="text-sm text-light2">No queries yet.</p>
				</Aside>
				<section className="relative grid place-items-center max-w-full flex-1 overflow-hidden">
					<article className="absolute top-0 left-2 flex w-full gap-3 items-center justify-between rounded-xl pr-2">
						<Suspense fallback={<ProjectListFallback />}>
							<ProjectList userToken={session.user.id} projectId={project} />
						</Suspense>
					</article>
					{project && (
						<Suspense fallback={<TablesViewFallback />}>
							<TablesView projectId={project} token={session.user.id} />
						</Suspense>
					)}
				</section>
			</main>
		</div>
	);
}

export default DashboardPage;
