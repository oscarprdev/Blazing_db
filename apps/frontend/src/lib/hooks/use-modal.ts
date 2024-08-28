import { useRef } from 'react';

export function useModal() {
	const modalTriggerRef = useRef<HTMLButtonElement>(null);

	function handleCloseModal() {
		modalTriggerRef.current?.click();
	}

	return {
		modalTriggerRef,
		handleCloseModal,
	};
}
