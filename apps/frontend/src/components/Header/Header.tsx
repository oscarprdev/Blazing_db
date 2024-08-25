'use server';

import HeaderDropdown from './HeaderDropdown';
import { auth } from '@/src/auth';
import Link from 'next/link';

async function Header() {
	const session = await auth();

	return (
		<header className="absolute w-screen top-0 grid place-items-center p-3 ">
			<div className="w-full rounded-2xl bg-dark1 flex items-center justify-between px-5 h-16 border border-dark2">
				<Link href={'/'} className="text-md italic font-bold text-light1 hover:text-light">
					BlazingDb
				</Link>
				{session?.user && session.user.email && <HeaderDropdown email={session.user.email} />}
			</div>
		</header>
	);
}

export default Header;
