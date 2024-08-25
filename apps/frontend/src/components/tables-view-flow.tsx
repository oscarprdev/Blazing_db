'use client';

import { Table } from '../lib/types';
import TableCard from './table-card';
import { Background, BackgroundVariant, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMemo } from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */

const initialEdges = [
	{ id: 'e1-2', source: '1', target: '2' },
	{ id: 'e2-3', source: '2', target: '3' },
];
const nodeTypes = { tableCard: TableCard };

const gap = 50;
const marginX = 100;

function calculateMarginY(index: number) {
	if (index < 4) return 25;
	if (index < 8) return 250;
	if (index < 12) return 475;

	return 0;
}

function TablesViewFlow({ tables }: { tables: Table[] }) {
	const initialTableNodes = useMemo(() => {
		return tables.map((table, index) => ({
			id: `${table.title}-${index}`,
			type: 'tableCard',
			data: { title: table.title, fields: table.fields, index },
			position: { x: marginX * (index + 1) + (index > 0 ? marginX + gap : 0), y: calculateMarginY(index) },
		}));
	}, [tables]);
	const [nodes, _, onNodesChange] = useNodesState(initialTableNodes);
	// const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	return (
		<section className="w-screen h-screen mt-10 bg-dark">
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				// edges={edges}
				// onEdgesChange={onEdgesChange}
				onNodesChange={onNodesChange}>
				<Background variant={'dots' as BackgroundVariant} gap={16} size={2} color="#363636" />
			</ReactFlow>
		</section>
	);
}

export default TablesViewFlow;
