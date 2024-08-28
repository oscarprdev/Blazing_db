'use server';

import { ProjectList, ProjectListFallback } from './project-list';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion';
import { Suspense } from 'react';

function AccordionProjects({ projectId }: { projectId?: string }) {
	return (
		<article className="pt-1 flex w-full gap-3 items-center justify-between rounded-xl">
			<Accordion type="single" collapsible className="w-full" defaultValue="item-1">
				<AccordionItem value="item-1" className="border-none w-full mt-5">
					<AccordionTrigger className="py-1 w-full text-light1 font-semibold">Projects</AccordionTrigger>
					<AccordionContent className="w-full pt-2 text-light2">
						<Suspense fallback={<ProjectListFallback />}>
							<ProjectList projectId={projectId} />
						</Suspense>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</article>
	);
}

export default AccordionProjects;
