import AuthForm from '../components/Forms/AuthForm/AuthForm';
import { AuthFormMode } from '../components/Forms/AuthForm/types';
import Link from 'next/link';

type Props = {
	title: string;
	subtitle: string;
	text: string;
	actionFallback: string;
	actionText: string;
	mode: AuthFormMode;
};

function AuthContainer({ title, subtitle, text, actionFallback, actionText, mode }: Props) {
	return (
		<main className="relative flex w-screen h-screen">
			<div className="flex items-center gap-2 absolute top-8 left-8">
				<Link href={'/'} className="font-bold text-2xl italic text-light2 hover:text-light duration-200">
					BlazingDb
				</Link>
			</div>
			<section className="w-full bg-dark1 grid place-items-center lg:w-[45vw] p-16">
				<div className="w-full max-w-[400px] flex flex-col gap-10 items-center justify-center">
					<div className="w-full">
						<h2 className="text-left text-3xl">{title}</h2>
						<p className="text-sm text-light2">{subtitle}</p>
					</div>
					<div className="w-full">
						<AuthForm mode={mode} />
						<div className="mt-10 flex gap-2">
							<p className="text-sm text-light2">{text}</p>
							<Link href={actionFallback} className="text-sm underline text-light hover:text-light1">
								{actionText}
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="flex-1"></section>
		</main>
	);
}

export default AuthContainer;
