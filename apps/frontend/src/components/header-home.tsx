import HeaderTitle from './header-title';
import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

function HeaderHome() {
	return (
		<header className="absolute top-0 w-full bg-transparent flex items-center justify-between px-8 h-16 border-b border-dark3">
			<HeaderTitle />
			<nav className="flex items-center gap-5">
				<Link
					href={'https://github.com/oscarprdev/Blazing_db'}
					target="_blank"
					className="p-2 rounded-full border border-dark3 text-light2 hover:text-light duration-300">
					<IconBrandGithub size={20} />
				</Link>
				<Link
					href={'/sign-up'}
					className="p-2 border border-dark3 text-light2 rounded-lg text-sm hover:text-light1 hover:bg-dark3 duration-200">
					Sign up
				</Link>
				<Link
					href={'/sign-in'}
					className="p-2  bg-accent text-light font-semibold border border-accent1 hover:border-accent2 rounded-lg text-sm  hover:bg-accent1 duration-200">
					Start your project
				</Link>
			</nav>
		</header>
	);
}

export default HeaderHome;
