import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion';

function AccordionQueries() {
	return (
		<article className="pt-1 flex w-full gap-3 items-center justify-between rounded-xl pr-2">
			<Accordion type="single" collapsible className="w-full ">
				<AccordionItem value="item-1" className="border-none w-full mt-2">
					<AccordionTrigger className="py-1 w-full text-light1 font-semibold">
						History of queries
					</AccordionTrigger>
					<AccordionContent className="w-full pt-2 text-light2">
						<p className="text-sm text-light2">No queries yet.</p>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</article>
	);
}

export default AccordionQueries;
