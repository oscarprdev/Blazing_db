'use server';

import { IconBolt } from '@tabler/icons-react';

function ProjecttTitle({ title }: { title: string }) {
	return (
		<div className="absolute left-12 top-2 flex gap-1 items-center text-light1">
			<IconBolt size={16} />
			<h1>{title}</h1>
		</div>
	);
}

export default ProjecttTitle;
