'use server';

import CreateProjectModal from '../Modals/CreateProjectModal/CreateProjectModal';
import HeaderDropdown from './HeaderDropdown';
import Link from 'next/link';

type Props = {
	email: string;
};

async function Header({ email }: Props) {
	return (
		<header className="w-full rounded-2xl bg-dark1 flex items-center justify-between px-5 h-16 border border-dark2">
			<Link href={'/'} className="text-md italic font-bold text-light1 hover:text-light">
				BlazingDb
			</Link>
			<nav className="flex items-center gap-2">
				<CreateProjectModal />
				<HeaderDropdown email={email} />
			</nav>
		</header>
	);
}

export default Header;
