import { formatQueryTime } from '../lib/format-time';
import { useModal } from '../lib/hooks/use-modal';
import { Query } from '../lib/types';
import FormUpdateQuery from './form-update-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { IconBook } from '@tabler/icons-react';

function ModalQueryDetails({ query }: { query: Query }) {
	const { modalTriggerRef, handleCloseModal } = useModal();

	return (
		<Dialog>
			<DialogTrigger
				ref={modalTriggerRef}
				className="text-light2 p-1 hover:text-light1 flex items-center gap-2 cursor-pointer">
				<IconBook size={14} />
				Details
			</DialogTrigger>
			<DialogContent className="w-[600px] max-w-[90vw] ">
				<DialogHeader>
					<DialogTitle className="text-sm gap-3 text-light1">
						<p className="text-light1 text-sm">Details of your query</p>
						<p className="text-light5 text-xs font-light">{formatQueryTime(query.createdAt)}</p>
					</DialogTitle>
				</DialogHeader>
				<FormUpdateQuery query={query} handleCloseModal={handleCloseModal} />
			</DialogContent>
		</Dialog>
	);
}

export default ModalQueryDetails;
