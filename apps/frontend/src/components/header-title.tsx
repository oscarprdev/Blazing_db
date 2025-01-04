import Link from 'next/link';
import React from 'react';

function HeaderTitle() {
	return (
		<Link href={'/'} className="text-md italic font-bold text-light1 hover:text-light">
			BlazingDb <span className="text-xs text-light2 font-light">- v.0.01</span>
		</Link>
	);
}

export default HeaderTitle;
