'use client';

import { nodeTypes, useTableViewFlow } from '../lib/hooks/use-table-view-flow';
import { Table } from '../lib/types';
import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ReactNode } from 'react';

function TablesViewFlow({
	tables,
	projectTitle,
	children,
}: {
	tables: Table[];
	projectTitle: string;
	children: ReactNode;
}) {
	const { nodes, onNodesChange, edges, onEdgesChange } = useTableViewFlow({
		tables,
		projectTitle,
	});

	return (
		<section className="relative w-screen h-screen bg-dark05">
			{children}
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onNodesChange={onNodesChange}>
				<Background variant={'dots' as BackgroundVariant} gap={16} size={2} color="#363636" />
			</ReactFlow>
		</section>
	);
}

export default TablesViewFlow;
