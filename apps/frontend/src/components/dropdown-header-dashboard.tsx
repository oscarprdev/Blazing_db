'use client';

import { signOutAction } from '@/src/app/actions';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { IconLogout } from '@tabler/icons-react';
import { Bolt, CircleUserRound } from 'lucide-react';
import { ReactNode } from 'react';

function DropdownHeaderDashboard() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="uppercase outline-none grid place-items-center font-semibold text-sm border border-dark2 rounded-full size-9 bg-white text-dark hover:bg-primary duration-200">
				<CircleUserRound className="text-light2" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 mr-3 p-3">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownHeaderItem handleClick={async () => undefined} icon={<Bolt size={16} />} text="Settings" />
				<DropdownHeaderItem
					handleClick={async () => await signOutAction()}
					icon={<IconLogout size={16} />}
					text="Sign Out"
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function DropdownHeaderItem({
	handleClick,
	icon,
	text,
}: {
	handleClick: () => Promise<void>;
	icon: ReactNode;
	text: string;
}) {
	return (
		<DropdownMenuItem
			onClick={handleClick}
			className="text-light2 p-1 hover:text-light1 flex items-center gap-2 cursor-pointer">
			{icon}
			{text}
		</DropdownMenuItem>
	);
}

export default DropdownHeaderDashboard;
