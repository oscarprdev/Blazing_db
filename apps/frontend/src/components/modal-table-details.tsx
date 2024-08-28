'use client';

import { describeTableAction } from '../app/actions';
import { useFieldIcon } from '../lib/hooks/use-field-icons';
import { Field } from '../lib/types';
import { cn, isError } from '../lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/src/components/ui/tooltip';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { toast } from 'sonner';

function ModalTableDetails({ title, fields, children }: { title: string; fields: Field[]; children: ReactNode }) {
	return (
		<Dialog>
			<DialogTrigger asChild className="text-light2 p-1 hover:text-light1 flex items-center gap-2 cursor-pointer">
				{children}
			</DialogTrigger>
			<DialogContent className="w-[800px] max-w-[95vw] bg-dark3">
				<DialogHeader>
					<DialogTitle className="text-sm gap-3 text-light1">
						<p className="text-light1 text-sm">Details of your query</p>
					</DialogTitle>
				</DialogHeader>
				<ModalTableDetailsContent title={title} fields={fields} />
			</DialogContent>
		</Dialog>
	);
}

function ModalTableDetailsContent({ title, fields }: { title: string; fields: Field[] }) {
	const params = useSearchParams();

	const { data, isLoading } = useQuery({
		queryKey: [title],
		queryFn: async () => {
			const projectId = params.get('projectId') || '';
			if (!projectId) {
				toast.error('Project id is mandatory to see table details');
				return;
			}

			const res = await describeTableAction({
				projectId,
				tableTitle: title,
			});
			if (isError(res)) {
				toast.error(res.error);
				return;
			}

			toast.success(res.success.message);

			return res.success.data;
		},
	});

	const tableValuesMapped = useMemo(() => {
		return (
			data &&
			data.map(item =>
				item.map(field => {
					const sameField = fields.find(f => f.name === field.key);

					if (!sameField) return;

					return {
						type: sameField.type,
						name: sameField.name,
						value: field.value,
						constraint: sameField.fieldConstraint,
						referenced: sameField.reference,
					};
				})
			)
		);
	}, [data]);

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
						tableValuesMapped.map((item, index) => (
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
											<>
												{field && (
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
																				: field.type.includes('timestamp') ||
																					  field.type === 'boolean'
																					? 'text-fuchsia-400'
																					: field.type === 'integer'
																						? 'text-red-400'
																						: 'text-light4',
																			'w-[27%] truncate ml-[0.1rem] font-light'
																		)}>
																		{field?.value}
																	</label>
																</TooltipTrigger>
																<TooltipContent className="max-w-[400px]">
																	{field?.value}
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>

														<label className="w-[11%] text-light5 truncate ml-[0.2rem]">
															{field?.type}
														</label>

														{field.constraint && (
															<TooltipProvider>
																<Tooltip>
																	<TooltipTrigger asChild>
																		<label className="w-[8%] text-light5 lowercase truncate ml-[0.2rem]">
																			{field.constraint}
																		</label>
																	</TooltipTrigger>
																	<TooltipContent className="capitalize">
																		{field.constraint.toLowerCase()}
																	</TooltipContent>
																</Tooltip>
															</TooltipProvider>
														)}
													</div>
												)}
											</>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						))
					) : !isLoading ? (
						<p>No values on this table</p>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
		</>
	);
}

export default ModalTableDetails;
