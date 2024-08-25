'use client';

import { signOutAction } from './actions';
import { HeaderDropdownItemProps, HeaderDropdownProps } from './types';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';

function HeaderDropdown({ email }: HeaderDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="uppercase outline-none grid place-items-center font-semibold text-sm border border-dark3 rounded-full size-10 bg-white text-dark hover:bg-primary duration-200">
				{email.slice(0, 2)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 mr-3 p-3">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<HeaderDropdwonItem handleClick={async () => undefined} icon={<IconUser size={16} />} text="Account" />
				<HeaderDropdwonItem
					handleClick={async () => undefined}
					icon={<IconSettings size={16} />}
					text="Settings"
				/>
				<HeaderDropdwonItem
					handleClick={async () => await signOutAction()}
					icon={<IconLogout size={16} />}
					text="Sign Out"
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function HeaderDropdwonItem({ handleClick, icon, text }: HeaderDropdownItemProps) {
	return (
		<DropdownMenuItem
			onClick={handleClick}
			className="text-light2 p-1 hover:text-light1 flex items-center gap-2 cursor-pointer">
			{icon}
			{text}
		</DropdownMenuItem>
	);
}

export default HeaderDropdown;
