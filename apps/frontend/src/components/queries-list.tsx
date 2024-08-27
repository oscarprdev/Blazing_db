'use server';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion';

async function QueriesList() {
	return (
		<Accordion type="single" collapsible className="w-full text-light2">
			<AccordionItem value="item-1" className="border-none w-full mt-2">
				<AccordionTrigger className="py-1 w-full">Projects</AccordionTrigger>
				<AccordionContent className="w-full pt-2">
					<p>No queries</p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

export default QueriesList;
