import AuthModal from '../Modals/AuthModal/AuthModal';
import React from 'react';

const Header = () => {
	return (
		<header className="absolute w-screen top-0 flex items-center justify-between py-3 px-5">
			<h1>DAM - db ai manager</h1>
			<div>
				<AuthModal />
			</div>
		</header>
	);
};

export default Header;
