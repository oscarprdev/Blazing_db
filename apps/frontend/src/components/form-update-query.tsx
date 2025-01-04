import { useFormUpdateQuery } from '../lib/hooks/use-form-update-query';
import { Query } from '../lib/types';
import AiViewer from './ai-viewer';
import { Button } from './ui/button';
import { IconLoader2 } from '@tabler/icons-react';
import React from 'react';
import { useFormStatus } from 'react-dom';

function FormUpdateQuery({ query, handleCloseModal }: { query: Query; handleCloseModal: () => void }) {
	const { codeRef, queryResponse, handleSubmit } = useFormUpdateQuery({ query });

	return (
		<article className="w-full flex flex-col gap-3 overflow-hidden">
			<label className=" text-xs text-light2">Query:</label>
			<AiViewer
				key={crypto.randomUUID().toString()}
				aiResponse={{ value: query.value, language: query.language }}
				codeRef={codeRef}
				editable
			/>
			<label className=" text-xs text-light2">Output:</label>
			<AiViewer key={crypto.randomUUID().toString()} aiResponse={{ value: queryResponse }} />
			<form action={handleSubmit} className="ml-auto mt-auto flex gap-5 items-center">
				<Button onClick={handleCloseModal} type="button" variant={'ghost'}>
					Close
				</Button>
				<FormUpdateQuerySubmitButton />
			</form>
		</article>
	);
}

function FormUpdateQuerySubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" variant={'accent'} disabled={pending}>
			{pending ? <IconLoader2 className="animate-spin" size={20} /> : 'Apply'}
		</Button>
	);
}

export default FormUpdateQuery;
