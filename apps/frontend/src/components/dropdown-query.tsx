'use client';

import { deleteQueryAction } from '../app/actions';
import { UpdateOptimiticQueriesPayload } from '../lib/hooks/use-optimistic-queries';
import { Query } from '../lib/types';
import ModalQueryDetails from './modal-query-details';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { IconDots } from '@tabler/icons-react';
import { Trash } from 'lucide-react';

function DropdownQuery({
	query,
	handleDeleteQuery,
}: {
	query: Query;
	handleDeleteQuery(queryId: string): Promise<string | number>;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="absolute top-2 right-2 outline-none">
				<IconDots size={14} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 ml-28 p-3 rounded-lg">
				<ModalQueryDetails query={query} />
				<DropdownMenuItem
					onClick={() => handleDeleteQuery(query.queryId)}
					className="text-light2 p-1 hover:text-light1 flex items-center gap-2 cursor-pointer">
					<Trash size={14} />
					Remove
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default DropdownQuery;
