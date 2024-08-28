import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { IconDots } from '@tabler/icons-react';
import { Trash } from 'lucide-react';

function DropdownProject({
	projectId,
	handleDeleteQuery,
}: {
	projectId: string;
	handleDeleteQuery: (projectId: string) => Promise<string | number>;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="absolute top-2 right-2 outline-none">
				<IconDots size={16} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 ml-28 p-3 rounded-lg">
				<DropdownMenuItem
					onClick={() => handleDeleteQuery(projectId)}
					className="text-light2 p-1 hover:text-light1 flex items-center gap-2 cursor-pointer">
					<Trash size={14} />
					Remove
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default DropdownProject;
