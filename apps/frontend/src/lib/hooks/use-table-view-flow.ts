import { Table } from '../types';
import TableCard from '@/src/components/table-card';
import { useNodesState } from '@xyflow/react';
import { useMemo } from 'react';

const initialEdges = [
	{ id: 'e1-2', source: '1', target: '2' },
	{ id: 'e2-3', source: '2', target: '3' },
];
export const nodeTypes = { tableCard: TableCard };

function calculateMarginY(index: number) {
	const rowHeight = 325;
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

export function useTableViewFlow({ projectId, tables }: { projectId: string; tables: Table[] }) {
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

	const [nodes, setNodes, onNodesChange] = useNodesState(initialTableNodes);
	// const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	return {
		nodes,
		setNodes,
		onNodesChange,
	};
}
