'use client';

import { Button } from './ui/button';
import { cn } from '@/src/lib/utils';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';

function Aside({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(true);

	return (
		<>
			<Button
				variant={'icon'}
				size={'icon'}
				onClick={() => setOpen(!open)}
				className="absolute top-0 left-2 text-light2 z-[1000]">
				{open ? <IconLayoutSidebarLeftCollapse /> : <IconLayoutSidebarLeftExpand />}
			</Button>
			<h1 className="absolute top-0 -right-10">hola</h1>
			<aside
				className={cn(
					open ? 'w-[0px] opacity-0 md:w-1/4 md:opacity-100' : 'w-[0px] opacity-0',
					'relative flex-shrink-0 overflow-x-hidden flex-col h-full bg-dark1 border border-dark2 border-t-0 duration-200 ease-in'
				)}>
				<div className="flex flex-col w-full pt-6 px-3 pb-2 h-full">{children}</div>
			</aside>
		</>
	);
}

export default Aside;
