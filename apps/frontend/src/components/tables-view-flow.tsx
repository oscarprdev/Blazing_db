'use client';

import { nodeTypes, useTableViewFlow } from '../lib/hooks/use-table-view-flow';
import { Table } from '../lib/types';
import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ReactNode } from 'react';

function TablesViewFlow({ tables, children }: { tables: Table[]; children: ReactNode }) {
	const { nodes, onNodesChange, edges, onEdgesChange } = useTableViewFlow({
		tables,
	});

	return (
		<section className="relative w-screen h-screen bg-dark">
			{children}
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onNodesChange={onNodesChange}>
				<Background variant={'dots' as BackgroundVariant} gap={16} size={2} color="#242424" />
			</ReactFlow>
		</section>
	);
}

export default TablesViewFlow;