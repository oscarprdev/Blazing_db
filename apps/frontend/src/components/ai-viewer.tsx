'use client';

import { AiLanguage } from '../lib/types';
import ButtonCopyAiResponse from './button-copy-ai-response';
import { Badge } from './ui/badge';
import '@/public/themes/custom-prismjs.css';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import { RefObject, useEffect } from 'react';

function AiViewer({
	codeRef,
	aiResponse,
	editable = false,
	key,
}: {
	editable?: boolean;
	codeRef?: RefObject<HTMLElement>;
	aiResponse: { value: string; language?: AiLanguage };
	key: string;
}) {
	useEffect(() => {
		const codeElements = document.querySelectorAll('#code');
		codeElements.forEach(code => Prism.highlightElement(code));
	}, [key]);

	return (
		<div className="relative rounded-md bg-dark border border-dark2">
			{aiResponse.language && <Badge className="absolute top-3 left-3 z-50">{aiResponse.language}</Badge>}
			<ButtonCopyAiResponse aiResponse={aiResponse.value} />
			<pre aria-label="scroll" className="p-4 max-h-[230px] overflow-y-scroll outline-none">
				<code
					id="code"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(
							codeRef && codeRef.current
								? codeRef.current.textContent || aiResponse.value
								: aiResponse.value
						),
					}}
					ref={codeRef}
					contentEditable={editable}
					className={`language-javascript`}
					style={{
						fontSize: '14px',
						outline: 'none',
					}}
				/>
			</pre>
		</div>
	);
}

export default AiViewer;
