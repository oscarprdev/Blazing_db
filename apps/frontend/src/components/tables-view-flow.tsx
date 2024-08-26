'use client';

import { Table } from '../lib/types';
import TableCard from './table-card';
import { Background, BackgroundVariant, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ReactNode, useMemo } from 'react';

const initialEdges = [
	{ id: 'e1-2', source: '1', target: '2' },
	{ id: 'e2-3', source: '2', target: '3' },
];
const nodeTypes = { tableCard: TableCard };

function calculateMarginY(index: number) {
	const rowHeight = 225;
	const tablesPerRow = 4;

	const rowNumber = Math.floor(index / tablesPerRow);
	return rowNumber * rowHeight + 50;
}

function calculateMarginX(index: number) {
	const marginX = 220;
	const gap = 50;
	const tablesPerRow = 4;

	const columnIndex = index % tablesPerRow;
	return columnIndex * marginX + gap;
}
export const dynamic = 'force-dynamic';

function TablesViewFlow({ projectId, tables, children }: { projectId: string; tables: Table[]; children: ReactNode }) {
	const initialTableNodes = useMemo(
		() => [
			...tables.map((table, index) => ({
				id: `${table.title}-${index}`,
				type: 'tableCard',
				data: { title: table.title, fields: table.fields, index },
				position: { x: calculateMarginX(index), y: calculateMarginY(index) },
			})),
		],
		[projectId]
	);

	console.log(tables[0]?.fields, tables[1]?.fields, tables[2]?.fields);

	const [nodes, _, onNodesChange] = useNodesState(initialTableNodes);
	// const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	return (
		<section className="relative w-screen h-screen bg-dark">
			{children}
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				// edges={edges}
				// onEdgesChange={onEdgesChange}
				onNodesChange={onNodesChange}>
				<Background variant={'dots' as BackgroundVariant} gap={16} size={2} color="#242424" />
			</ReactFlow>
		</section>
	);
}

export default TablesViewFlow;
