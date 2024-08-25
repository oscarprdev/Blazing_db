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
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import { ReactNode } from 'react';

function DropdownHeaderDashboard({ email }: { email: string }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="uppercase outline-none grid place-items-center font-semibold text-sm border border-dark3 rounded-full size-10 bg-white text-dark hover:bg-primary duration-200">
				{email.slice(0, 2)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 mr-3 p-3">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownHeaderItem handleClick={async () => undefined} icon={<IconUser size={16} />} text="Account" />
				<DropdownHeaderItem
					handleClick={async () => undefined}
					icon={<IconSettings size={16} />}
					text="Settings"
				/>
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
