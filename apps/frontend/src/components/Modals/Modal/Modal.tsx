import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { IconExclamationCircle, IconLoader2 } from '@tabler/icons-react';
import { ReactNode } from 'react';

export enum ModalState {
	DEFAULT = 'DEFAULT',
	LOADING = 'LOADING',
	ERROR = 'ERROR',
}

interface Props {
	trigger: ReactNode;
	open: boolean;
	title?: string;
	state?: ModalState;
	message?: string;
	toggleModalVisibility(open: boolean): void;
	children: ReactNode;
}

const Modal = ({
	trigger,
	open,
	title,
	state = ModalState.DEFAULT,
	message,
	toggleModalVisibility,
	children,
}: Props) => {
	return (
		<Dialog open={open} onOpenChange={toggleModalVisibility}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			{state === ModalState.DEFAULT && (
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
					{children}
				</DialogContent>
			)}
			{state === ModalState.LOADING && (
				<DialogContent>
					<DialogHeader>
						<IconLoader2 className="animate-spin" />
					</DialogHeader>
					<p>{message}</p>
				</DialogContent>
			)}
			{state === ModalState.ERROR && (
				<DialogContent>
					<DialogHeader>
						<IconExclamationCircle />
					</DialogHeader>
					<p>{message}</p>
				</DialogContent>
			)}
		</Dialog>
	);
};

export default Modal;
