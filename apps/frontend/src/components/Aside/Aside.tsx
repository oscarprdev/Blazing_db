'use client';

import { Button } from '../ui/button';
import { cn } from '@/src/lib/utils';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';

type Props = {
	children: ReactNode;
};

function Aside({ children }: Props) {
	const [open, setOpen] = useState(true);

	return (
		<>
			<Button
				variant={'secondary'}
				onClick={() => setOpen(!open)}
				className="absolute top-0 -left-2 text-light3 hover:text-light2 z-[1000]">
				{open ? <IconLayoutSidebarLeftCollapse /> : <IconLayoutSidebarLeftExpand />}
			</Button>
			<aside
				className={cn(
					open ? 'w-1/5 opacity-100' : 'w-0 opacity-0',
					'flex-shrink-0 overflow-x-hidden flex-col h-full bg-dark1 rounded-2xl border border-dark2 p-6 pt-14 duration-200 ease-in'
				)}>
				<div className="w-[200px]">{children}</div>
			</aside>
		</>
	);
}

export default Aside;
