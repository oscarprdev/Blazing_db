import { useRef } from 'react';

export function useModalQueryDetails() {
	const modalTriggerRef = useRef<HTMLButtonElement>(null);

	function handleCloseModal() {
		modalTriggerRef.current?.click();
	}

	return {
		modalTriggerRef,
		handleCloseModal,
	};
}
