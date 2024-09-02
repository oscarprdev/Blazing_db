import HeaderTitle from './header-title';
import Link from 'next/link';
import React from 'react';

function HeaderHome() {
	return (
		<header className="absolute top-0 w-full bg-transparent flex items-center justify-between px-8 h-16 border-b border-dark3">
			<HeaderTitle />
			<nav className="flex items-center gap-5">
				<Link
					href={'/sign-up'}
					className="p-2 border border-dark3 text-light3 rounded-lg text-sm hover:text-light1 hover:bg-dark3 duration-200">
					Sign up
				</Link>
				<Link
					href={'/sign-in'}
					className="p-2 border border-accent bg-accent font-semibold text-dark rounded-lg text-sm  hover:bg-accent1 duration-200">
					Start your project
				</Link>
			</nav>
		</header>
	);
}

export default HeaderHome;
