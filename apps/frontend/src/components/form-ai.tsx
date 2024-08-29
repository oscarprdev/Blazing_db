'use client';

import { useAiTextarea } from '../lib/hooks/use-ai-textarea';
import { useFomAi } from '../lib/hooks/use-form-ai';
import { ProjectType, Table } from '../lib/types';
import FormAiResponse from './form-ai-response';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { IconArrowUp, IconLoader2 } from '@tabler/icons-react';
import { useMemo } from 'react';
import { useFormStatus } from 'react-dom';

function FormAi({ tables, type }: { tables: Table[]; type: ProjectType }) {
	const { formState, updateFormState, handleSubmit, handleClearForm } = useFomAi({ tables, type });

	return (
		<div className="absolute bottom-5 flex flex-col gap-2 w-full max-w-[36rem] lg:max-w-[40rem] xl:max-w-[48rem]">
			<FormAiResponse aiResponse={formState.aiResponse} handleClearForm={handleClearForm} />
			<div className="w-full rounded-full">
				<form
					action={handleSubmit}
					className="flex items-center md:gap-5 lg:gap-6 w-full rounded-3xl p-2 border border-dark3 bg-dark2 hover:bg-dark1 duration-200">
					<FormAiTextarea value={formState.promp} updateFormState={updateFormState} />
					<FormAiSubmitButton prompt={formState.promp} />
				</form>
			</div>
		</div>
	);
}

function FormAiTextarea({
	value,
	updateFormState,
}: {
	value: string;
	updateFormState: ({ prompt }: { prompt: string }) => void;
}) {
	const { ref, handlePromptChange } = useAiTextarea({ updateFormState });

	return (
		<Textarea
			name="prompt"
			ref={ref}
			value={value}
			onChange={handlePromptChange}
			placeholder="Ask something about your database"
			rows={1}
			className="m-0 pl-2 py-1 resize-none bg-transparent border-0 text-token-text-light2 overflow-hidden h-[34px]"
		/>
	);
}

function FormAiSubmitButton({ prompt }: { prompt: string }) {
	const { pending } = useFormStatus();
	const isDisabled = useMemo(() => pending || prompt.length === 0, [prompt]);

	return (
		<Button type="submit" className="rounded-full p-1.5 grid place-items-center mt-auto" disabled={isDisabled}>
			{pending ? <IconLoader2 className="animate-spin" /> : <IconArrowUp />}
		</Button>
	);
}

function FormAiSkeleton() {
	return (
		<div className="absolute bottom-5 flex flex-col gap-2 w-full max-w-[36rem] lg:max-w-[40rem] xl:max-w-[48rem]">
			<div className="w-full rounded-full">
				<div className="flex items-center md:gap-5 lg:gap-6 w-full rounded-3xl p-2 border border-dark3 bg-dark2">
					<Textarea
						placeholder="Ask something about your database"
						rows={1}
						className="m-0 pl-2 py-1 resize-none bg-transparent border-0 text-token-text-light2 overflow-hidden h-[34px]"
					/>
					<Button type="submit" className="rounded-full p-1.5 grid place-items-center mt-auto" disabled>
						<IconArrowUp />
					</Button>
				</div>
			</div>
		</div>
	);
}
export { FormAi, FormAiSkeleton };
