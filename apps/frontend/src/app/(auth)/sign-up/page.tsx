import AuthForm from '@/src/components/Forms/AuthForm/AuthForm';
import { AuthFormMode } from '@/src/components/Forms/AuthForm/types';
import Link from 'next/link';
import React from 'react';

function SignUpPage() {
	return (
		<main className="relative flex w-screen h-screen">
			<div className="flex items-center gap-2 absolute top-8 left-8">
				<h1 className="font-bold text-2xl italic text-light2">BlazingDb</h1>
			</div>
			<section className="w-[40%] p-28 bg-dark1 flex flex-col gap-10 items-center justify-center">
				<div className="w-full">
					<h2 className="text-left text-3xl">Get started</h2>
					<p className="text-sm text-light2">Create new account</p>
				</div>
				<div className="w-full">
					<AuthForm mode={AuthFormMode.signup} />
					<div className="mt-10 flex gap-2">
						<p className="text-sm text-light2">Have an account?</p>
						<Link href={'/sign-in'} className="text-sm underline text-light hover:text-light1">
							Sing in now
						</Link>
					</div>
				</div>
			</section>
			<section className="flex-1"></section>
		</main>
	);
}

export default SignUpPage;