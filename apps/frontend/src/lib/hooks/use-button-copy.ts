import { useState } from 'react';

export function useButtonCopy({ value }: { value: string }) {
	const [valueCopied, setValueCopied] = useState(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(value);
		setValueCopied(true);
		setTimeout(() => {
			setValueCopied(false);
		}, 2000);
	}
	return {
		valueCopied,
		handleCopy,
	};
}
