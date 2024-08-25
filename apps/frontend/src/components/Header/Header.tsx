'use server';

import SignOutButton from '../Buttons/SignOutButton';
import { auth } from '@/src/auth';

async function Header() {
	const session = await auth();

	return (
		<header className="absolute w-screen top-0 flex items-center justify-between py-3 px-5">
			<h1>DAM - db ai manager</h1>
			{session?.user && <SignOutButton />}
		</header>
	);
}

export default Header;
