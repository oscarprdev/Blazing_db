'use client';

import { useFieldIcon } from '../lib/hooks/use-field-icons';
import { Field } from '../lib/types';
import { cn } from '../lib/utils';
import ModalTableDetails from './modal-table-details';
import { Button } from './ui/button';
import { IconZoom } from '@tabler/icons-react';
import { Handle, Position } from '@xyflow/react';
import { useMemo } from 'react';

const TABLE_COLORS = [
	'#7C9D62', // Olive Green
	'#3E818C', // Teal Blue
	'#9F5B3D', // Burnt Orange
	'#405D8D', // Slate Blue
	'#B2932C', // Dark Mustard Yellow (previously #D1B45A)
	'#49586F', // Dark Steel Blue (previously #6A7B95)
	'#8C3B51', // Dark Dusty Rose (previously #A34F68)
	'#3D4D1F', // Dark Moss Green (previously #546E2D)
	'#8C4D24', // Dark Copper (previously #B87333)
	'#1E4E65', // Dark Cyan (previously #2D6E8C)
];

function TableCard({
	data: { title, fields, isReferenced, projectTitle },
}: {
	data: { index: number; title: string; fields: Field[]; isReferenced: boolean; projectTitle: string };
}) {
	const indexColor = useMemo(() => Math.floor(Math.random() * TABLE_COLORS.length), [title]);
	const fieldWithReferences = useMemo(() => fields.filter(f => f.reference), [title]);

	return (
		<article
			className={cn(
				`hover:border-[${TABLE_COLORS[indexColor]}]`,
				'group bg-dark1 rounded-md grid place-items-center w-[200px] h-fit max-h-[400px] overflow-hidden shadow-2xl border border-dark3'
			)}>
			<div
				style={{ backgroundColor: TABLE_COLORS[indexColor] }}
				className="flex items-center justify-between w-full text-sm px-4 pr-2 capitalize font-semibold opacity-80 group-hover:opacity-100 duration-200">
				{title}
				<ModalTableDetails title={title} fields={fields} projectTitle={projectTitle}>
					<Button variant={'accent'} className="p-2 -mr-2">
						<IconZoom size={14} className="text-light" />
					</Button>
				</ModalTableDetails>
			</div>
			<ul className="flex flex-col w-full">
				{fields.map(field => (
					<li
						key={field.name}
						className="flex items-center gap-2 px-4 py-2 border-b border-dark3 last:border-none w-full text-light2 hover:text-light1 duration-200 text-sm">
						{useFieldIcon(field.type)}
						{field.name}
					</li>
				))}
			</ul>
			{isReferenced && <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />}
			{fieldWithReferences.length > 0 &&
				fieldWithReferences.map(field => {
					const index = fields.findIndex(f => f.name === field.name);

					return (
						<Handle
							key={field.name}
							id={field.name}
							type="source"
							position={Position.Right}
							style={{
								top: (index + 1) * 37 + 14,
								opacity: 0,
							}}
						/>
					);
				})}
		</article>
	);
}

export default TableCard;
