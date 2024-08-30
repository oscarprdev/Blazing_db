import { IconBracketsContain, IconCalendarMonth, IconHash, IconNumber123 } from '@tabler/icons-react';
import { Binary, Braces, Brackets, Type } from 'lucide-react';
import { ReactNode } from 'react';

export function useFieldIcon(type: string) {
	const FIELD_ICONS: { type: string; icon: ReactNode }[] = [
		{ type: 'text', icon: <Type size={15} /> },
		{ type: 'char', icon: <Type size={15} /> },
		{ type: 'timestamp', icon: <IconCalendarMonth size={15} /> },
		{ type: 'bool', icon: <Binary size={15} /> },
		{ type: 'int', icon: <IconNumber123 size={15} /> },
		{ type: 'uuid', icon: <IconHash size={15} /> },
		{ type: 'array', icon: <IconBracketsContain size={15} /> },
		{ type: 'json', icon: <Braces size={15} /> },
	];

	return (
		FIELD_ICONS.find(field => field.type === type || type.includes(field.type.toLowerCase()))?.icon || (
			<Brackets size={15} />
		)
	);
}
