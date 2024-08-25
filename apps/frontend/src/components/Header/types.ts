import { ReactNode } from 'react';

export type HeaderDropdownProps = {
	email: string;
};

export type HeaderDropdownItemProps = {
	handleClick(): Promise<void>;
	icon: ReactNode;
	text: string;
};
