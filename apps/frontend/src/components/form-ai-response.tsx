'use client';

import { applyQueryAction } from '../app/actions';
import { AiLanguage } from '../lib/types';
import { cn, isError } from '../lib/utils';
import AiViewer from './ai-viewer';
import { Button } from './ui/button';
import { IconLayoutNavbarCollapse, IconLayoutNavbarExpand, IconLoader2 } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

function FormAiResponse({
	aiResponse,
	handleClearForm,
}: {
	aiResponse: { value: string; language: AiLanguage };
	handleClearForm: () => void;
}) {
	const [isVisible, setIsVisible] = useState(aiResponse.value.length > 0);
	const searchParams = useSearchParams();
	const [queryResponse, setQueryResponse] = useState<string>();

	async function handleSubmit() {
		const projectId = searchParams.get('projectId');
		if (!projectId) return toast.error('Project is not found and is required to apply the query generated');

		const response = await applyQueryAction({ projectId, query: aiResponse.value, language: aiResponse.language });
		if (isError(response)) return toast.error(response.error);

		setQueryResponse(response.success.response);
	}

	function handleIsVisible() {
		setIsVisible(!isVisible);
	}

	useEffect(() => {
		setIsVisible(aiResponse.value.length > 0);
	}, [aiResponse.value]);

	return (
		<div
			className={cn(
				isVisible ? 'max-h-[500px]' : 'max-h-[0px]',
				'h-fit overflow-y-auto shadow-lg duration-200 ease-in'
			)}>
			{aiResponse.value.length > 0 && (
				<>
					<Button
						onClick={handleIsVisible}
						variant={'secondary'}
						className="absolute bottom-16 left-0 text-dark5 hover:text-light5 duration-200">
						{isVisible ? <IconLayoutNavbarExpand /> : <IconLayoutNavbarCollapse />}
					</Button>
					<div
						className={cn(
							isVisible ? 'opacity-100' : 'opacity-0',
							'flex flex-col w-full h-full duration-100 ease-in gap-3 bg-dark2 border border-dark3 rounded-3xl p-5 pb-2'
						)}>
						<label className=" text-xs text-light2">Query:</label>
						<AiViewer aiResponse={aiResponse} />
						{queryResponse && (
							<>
								<label className="text-xs text-light2">Output:</label>
								<AiViewer aiResponse={{ value: queryResponse }} />
							</>
						)}
						<form action={handleSubmit} className="ml-auto mt-auto flex gap-5 items-center">
							<Button type="button" variant={'secondary'} onClick={handleClearForm}>
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
		<Button type="submit" className="font-semibold" disabled={pending}>
			{pending ? <IconLoader2 className="animate-spin" size={20} /> : 'Apply'}
		</Button>
	);
}

export default FormAiResponse;
