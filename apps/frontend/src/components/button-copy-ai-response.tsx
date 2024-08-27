import { useButtonCopy } from '../lib/hooks/use-button-copy';
import { Button } from './ui/button';
import { IconCopy, IconCopyCheckFilled } from '@tabler/icons-react';

function ButtonCopyAiResponse({ aiResponse }: { aiResponse: string }) {
	const { valueCopied, handleCopy } = useButtonCopy({ value: aiResponse });

	return (
		<Button className="absolute top-1 right-1 p-2" variant={'secondary'} onClick={handleCopy}>
			{valueCopied ? <IconCopyCheckFilled size={16} /> : <IconCopy size={16} />}
		</Button>
	);
}

export default ButtonCopyAiResponse;
