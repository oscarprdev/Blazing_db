'use client';

import { useFormAiResponse } from '../lib/hooks/use-form-ai-response';
import { AiLanguage } from '../lib/types';
import { cn } from '../lib/utils';
import AiViewer from './ai-viewer';
import { Button } from './ui/button';
import { IconLayoutNavbarCollapse, IconLayoutNavbarExpand, IconLoader2 } from '@tabler/icons-react';
import { useFormStatus } from 'react-dom';

function FormAiResponse({
	aiResponse,
	handleClearForm,
}: {
	aiResponse: { value: string; language: AiLanguage };
	handleClearForm: () => void;
}) {
	const { codeRef, isVisible, queryResponse, handleIsVisible, handleSubmit } = useFormAiResponse({
		aiResponse,
	});

	return (
		<div
			className={cn(
				isVisible ? 'max-h-[550px]' : 'max-h-[0px]',
				'h-fit overflow-y-hidden shadow-lg duration-200 ease-in'
			)}>
			{aiResponse.value.length > 0 && (
				<>
					<Button
						onClick={handleIsVisible}
						variant={'icon'}
						className="absolute bottom-16 left-0 text-light2 hover:text-light duration-200">
						{isVisible ? <IconLayoutNavbarExpand /> : <IconLayoutNavbarCollapse />}
					</Button>
					<div
						className={cn(
							isVisible ? 'opacity-100' : 'opacity-0',
							'flex flex-col w-full h-full duration-100 ease-in gap-3 bg-dark2 border border-dark3 rounded-3xl p-5 pb-2'
						)}>
						<label className="text-xs text-light2">Query:</label>
						<AiViewer
							aiResponse={aiResponse}
							codeRef={codeRef}
							editable
							key={crypto.randomUUID().toString()}
						/>
						{queryResponse && (
							<>
								<label className="text-xs text-light2">Output:</label>
								<AiViewer aiResponse={{ value: queryResponse }} key={crypto.randomUUID().toString()} />
							</>
						)}
						<form action={handleSubmit} className="ml-auto mt-auto flex gap-5 items-center">
							<Button type="button" variant={'ghost'} onClick={handleClearForm}>
								Clear
							</Button>
							<FormAiResponseSubmitButton />
						</form>
					</div>
				</>
			)}
		</div>
	);
}

function FormAiResponseSubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" variant={'accent'} className="font-semibold" disabled={pending}>
			{pending ? <IconLoader2 className="animate-spin" size={20} /> : 'Apply'}
		</Button>
	);
}

export default FormAiResponse;
