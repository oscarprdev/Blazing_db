'use server';

import { auth } from '../auth';
import DropdownHeaderDashboard from './dropdown-header-dashboard';
import HeaderTitle from './header-title';
import ModalCreateProject from './modal-create-project';
import { redirect } from 'next/navigation';

async function HeaderDashboard() {
	const session = await auth();
	if (!session?.user?.email) return redirect('/');

	return (
		<header className="w-full bg-dark1 flex items-center justify-between px-5 h-14 border border-dark2">
			<HeaderTitle />
			<nav className="flex items-center gap-2">
				<ModalCreateProject />
				<DropdownHeaderDashboard />
			</nav>
		</header>
	);
}

export default HeaderDashboard;
