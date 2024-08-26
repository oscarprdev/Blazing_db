'use server';

import { auth } from '../auth';
import DropdownHeaderDashboard from './dropdown-header-dashboard';
import ModalCreateProject from './modal-create-project';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function HeaderDashboard() {
	const session = await auth();
	if (!session?.user?.email) return redirect('/');

	return (
		<header className="w-full rounded-2xl bg-dark1 flex items-center justify-between px-5 h-16 border border-dark2">
			<Link href={'/'} className="text-md italic font-bold text-light1 hover:text-light">
				BlazingDb
			</Link>
			<nav className="flex items-center gap-2">
				<ModalCreateProject />
				<DropdownHeaderDashboard email={session.user.email} />
			</nav>
		</header>
	);
}

export default HeaderDashboard;
