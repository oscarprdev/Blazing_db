import { FormAuthMode } from '../lib/types';
import FormAuth from './form-auth';
import Link from 'next/link';

function ContainerAuthPage({
	title,
	subtitle,
	text,
	actionFallback,
	actionText,
	mode,
}: {
	title: string;
	subtitle: string;
	text: string;
	actionFallback: string;
	actionText: string;
	mode: FormAuthMode;
}) {
	return (
		<main className="relative flex w-screen h-screen ">
			<div className="flex items-center gap-2 absolute top-8 left-8">
				<Link href={'/'} className="font-bold text-2xl italic text-light2 hover:text-light duration-200">
					BlazingDb
				</Link>
			</div>
			<section className="bg-dark1 w-screen grid place-items-center p-16 overflow-x-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(54,54,54,0.3),rgba(54,54,54,0))]">
				<div className="w-full max-w-[400px] flex flex-col gap-10 items-center justify-center">
					<div className="w-full">
						<h2 className="text-left text-3xl">{title}</h2>
						<p className="text-sm text-light2">{subtitle}</p>
					</div>
					<div className="w-full">
						<FormAuth mode={mode} />
						<div className="mt-10 flex gap-2">
							<p className="text-sm text-light2">{text}</p>
							<Link href={actionFallback} className="text-sm underline text-light hover:text-light1">
								{actionText}
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default ContainerAuthPage;
