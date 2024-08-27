import { AiLanguage } from '../lib/types';
import ButtonCopyAiResponse from './button-copy-ai-response';
import { Badge } from './ui/badge';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function AiViewer({ aiResponse }: { aiResponse: { value: string; language?: AiLanguage } }) {
	return (
		<div aria-label="scroll" className="relative max-h-[250px] overflow-y-scroll">
			{aiResponse.language && <Badge className="absolute top-3 left-3">{aiResponse.language}</Badge>}
			<ButtonCopyAiResponse aiResponse={aiResponse.value} />
			<SyntaxHighlighter
				language={aiResponse.language || AiLanguage.JAVASCRIPT}
				style={vscDarkPlus}
				customStyle={{
					background: '#101010',
					padding: '1.5em',
					margin: '0',
					borderRadius: '16px',
				}}>
				{aiResponse.value}
			</SyntaxHighlighter>
		</div>
	);
}

export default AiViewer;
