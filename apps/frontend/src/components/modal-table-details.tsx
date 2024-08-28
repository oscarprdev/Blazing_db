'use client';

import { useFieldIcon } from '../lib/hooks/use-field-icons';
import { ModalContentField, useModalTableDetails } from '../lib/hooks/use-modal-table-details';
import { Field } from '../lib/types';
import { cn } from '../lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/src/components/ui/tooltip';
import { IconLoader2 } from '@tabler/icons-react';
import { ReactNode } from 'react';

function ModalTableDetails({
	title,
	fields,
	projectTitle,
	children,
}: {
	title: string;
	fields: Field[];
	projectTitle: string;
	children: ReactNode;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild className="text-light2 p-1 hover:text-light1 flex items-center gap-2 cursor-pointer">
				{children}
			</DialogTrigger>
			<DialogContent className="w-[800px] max-w-[95vw] bg-dark3">
				<DialogHeader>
					<DialogTitle className="gap-1 text-xs flex items-center">
						<label className="text-light4">{projectTitle} - </label>
						<label className="text-light1 text-xs font-semibold capitalize">{title}</label>
					</DialogTitle>
				</DialogHeader>
				<ModalTableDetailsContent title={title} fields={fields} />
			</DialogContent>
		</Dialog>
	);
}

function ModalTableDetailsContent({ title, fields }: { title: string; fields: Field[] }) {
	const { isLoading, tableValuesMapped } = useModalTableDetails({ title, fields });

	return (
		<>
			<div aria-label="scroll" className="flex flex-col w-full  overflow-hidden max-h-[500px] overflow-y-scroll">
				<div className="w-full h-full border border-dark3 rounded-lg">
					<div className="w-full p-3 flex items-center bg-dark1 rounded-t-lg text-light4 text-xs justify-between">
						<label className="w-[45%]">Key</label>
						<label className="w-[26%] ml-3">Value</label>
						<label className="w-[11%]">Type</label>
						<label className="w-[10%]">Constraint</label>
					</div>
					{!isLoading && tableValuesMapped && tableValuesMapped.length > 0 ? (
						tableValuesMapped.map((item, index) => <TableDetailsAccordionItem item={item} index={index} />)
					) : !isLoading ? (
						<ModalTableDetailsContentWrapper>
							<p className="text-light4 text-sm">The table is empty</p>
						</ModalTableDetailsContentWrapper>
					) : (
						<ModalTableDetailsContentWrapper>
							<IconLoader2 className="animate-spin text-secondary" />
						</ModalTableDetailsContentWrapper>
					)}
				</div>
			</div>
		</>
	);
}

function TableDetailsAccordionItem({ item, index }: { item: (ModalContentField | undefined)[]; index: number }) {
	return (
		<Accordion
			key={crypto.randomUUID()}
			type="single"
			collapsible
			className="w-full border-b-lg"
			defaultValue="item-0">
			<AccordionItem value={`item-${index}`} className="border-none w-full">
				<AccordionTrigger
					side="left"
					className="flex items-center w-full gap-2 text-xs p-3 text-light1 font-semibold justify-between bg-dark2 hover:bg-dark1">
					<div className="w-[42%] flex items-center justify-start gap-1 -ml-2">
						<label>({index + 1})</label>
						<label className="truncate">{`{${item[0]?.name}: ${item[0]?.value}}`}</label>
					</div>
					<label className="w-[26%] flex justify-start">{`{ ${item.length} fields }`}</label>
					<label className="w-[23%] flex justify-start">Document</label>
				</AccordionTrigger>
				<AccordionContent className="w-full flex flex-col h-full text-xs">
					{item.map((field, index) => (
						<>{field && <TableDetailsAccordionItemField field={field} index={index} />}</>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

function TableDetailsAccordionItemField({ field, index }: { field: ModalContentField; index: number }) {
	return (
		<div className="flex items-center w-full p-2 odd:bg-dark1 bg-dark2 gap-2">
			<div className="w-[47%] text-light5 flex items-center gap-2">
				{useFieldIcon(field.type)}
				<label>{field?.name}</label>
			</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<label
							className={cn(
								field.type === 'uuid' && index === 0
									? 'text-emerald-400'
									: field.type.includes('timestamp') || field.type === 'boolean'
										? 'text-fuchsia-400'
										: field.type === 'integer'
											? 'text-red-400'
											: 'text-light4',
								'w-[27%] truncate ml-[0.1rem] font-light'
							)}>
							{field?.value}
						</label>
					</TooltipTrigger>
					<TooltipContent className="max-w-[400px]">{field?.value}</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<label className="w-[11%] text-light5 truncate ml-[0.2rem]">{field?.type}</label>

			{field.constraint && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<label className="w-[8%] text-light5 lowercase truncate ml-[0.2rem]">
								{field.constraint}
							</label>
						</TooltipTrigger>
						<TooltipContent className="capitalize">{field.constraint.toLowerCase()}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</div>
	);
}

function ModalTableDetailsContentWrapper({ children }: { children: ReactNode }) {
	return <div className="grid place-items-center w-full h-[200px] bg-dark1 rounded-b-lg">{children}</div>;
}

export default ModalTableDetails;
