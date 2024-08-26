'use client';

import { Field } from '../lib/types';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { IconBracketsContain, IconCalendarMonth, IconDots, IconHash, IconNumber123 } from '@tabler/icons-react';
import { Binary, Braces, Type } from 'lucide-react';
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
	{ type: 'array', icon: <IconBracketsContain size={15} /> },
	{ type: 'json', icon: <Braces size={15} /> },
];

function TableCard({ data: { title, fields } }: { data: { index: number; title: string; fields: Field[] } }) {
	const indexColor = useMemo(() => Math.floor(Math.random() * TABLE_COLORS.length), [title]);

	function handleIconClick() {
		console.log('hello');
	}

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
				<Button variant={'secondary'} onClick={handleIconClick} className="p-2">
					<IconDots size={16} />
				</Button>
			</div>
			<ul className="flex flex-col w-full">
				{fields.map(field => (
					<li
						key={field.name}
						className="flex items-center gap-2 px-4 py-2 border-b border-dark3 last:border-none w-full text-light2 hover:text-light1 duration-200 text-sm">
						{
							FIELD_ICONS.find(
								f => f.type === field.type.toLowerCase() || field.type.toLowerCase().includes(f.type)
							)?.icon
						}
						{field.name}
					</li>
				))}
			</ul>
		</article>
	);
}

export default TableCard;
