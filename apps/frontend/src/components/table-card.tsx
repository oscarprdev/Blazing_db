'use client';

import { Field } from '../lib/types';
import { IconCalendarMonth, IconDots, IconHash, IconNumber123 } from '@tabler/icons-react';
import { Binary, Type } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

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

const FIELD_ICONS: { type: string; icon: ReactNode }[] = [
	{ type: 'text', icon: <Type size={15} /> },
	{ type: 'timestamp', icon: <IconCalendarMonth size={15} /> },
	{ type: 'boolean', icon: <Binary size={15} /> },
	{ type: 'integer', icon: <IconNumber123 size={15} /> },
	{ type: 'uuid', icon: <IconHash size={15} /> },
];

function TableCard({ data: { title, fields } }: { data: { index: number; title: string; fields: Field[] } }) {
	const color = useMemo(() => {
		const randomIndex = Math.floor(Math.random() * TABLE_COLORS.length);
		return TABLE_COLORS[randomIndex];
	}, [title]);

	console.log(fields);

	return (
		<article className="bg-dark1 rounded-md grid place-items-center w-[200px] h-fit max-h-[400px] overflow-hidden shadow-2xl">
			<div
				style={{ backgroundColor: color }}
				className="flex items-center justify-between w-full py-2 text-sm px-4 capitalize font-semibold">
				{title}
				<IconDots size={16} />
			</div>
			<ul className="flex flex-col w-full">
				{fields.map(field => (
					<li
						key={field.name}
						className="flex items-center gap-2 px-4 py-2 border-b border-dark3 last:border-none w-full text-light2 hover:text-light1 duration-200 text-sm">
						{FIELD_ICONS.find(f => f.type === field.type)?.icon}
						<p className="">{field.name}</p>
					</li>
				))}
			</ul>
		</article>
	);
}

export default TableCard;
