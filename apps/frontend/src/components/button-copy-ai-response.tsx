import { useButtonCopy } from '../lib/hooks/use-button-copy';
import { Button } from './ui/button';
import { IconCopy, IconCopyCheckFilled } from '@tabler/icons-react';

function ButtonCopyAiResponse({ aiResponse }: { aiResponse: string }) {
	const { valueCopied, handleCopy } = useButtonCopy({ value: aiResponse });

	return (
		<Button className="absolute top-1 right-1 p-2 z-50" variant={'secondary'} onClick={handleCopy}>
			{valueCopied ? <IconCopyCheckFilled size={16} /> : <IconCopy size={16} />}
		</Button>
	);
}

export default ButtonCopyAiResponse;

// <Editor
// style={{
// 	background: '#101010',
// 	padding: '1.5em',
// 	margin: '0',
// 	borderRadius: '16px',
// 	fontSize: '14px',
// }}
// value={code}
// onValueChange={code => setCode(code)}
// highlight={code => highlight(code, languages.jsx!, 'jsx')}
// />
