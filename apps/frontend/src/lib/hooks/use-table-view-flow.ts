import { Table } from '../types';
import TableCard from '@/src/components/table-card';
import { MarkerType, useEdgesState, useNodesState } from '@xyflow/react';
import { useEffect, useMemo } from 'react';

export const nodeTypes = { tableCard: TableCard };

function calculateMarginY(index: number) {
	const rowHeight = 325;
	const tablesPerRow = 4;

	const rowNumber = Math.floor(index / tablesPerRow);
	return rowNumber * rowHeight + 50;
}

function calculateMarginX(index: number) {
	const marginX = 250;
	const gap = 50;
	const tablesPerRow = 4;

	const columnIndex = index % tablesPerRow;
	return columnIndex * marginX + gap;
}

export function useTableViewFlow({ tables }: { tables: Table[] }) {
	const initialTableNodes = useMemo(
		() => [
			...tables.map((table, index) => ({
				id: table.id,
				type: 'tableCard',
				data: { title: table.title, fields: table.fields, index, isReferenced: table.isReferenced },
				position: { x: calculateMarginX(index), y: calculateMarginY(index) },
			})),
		],
		[tables]
	);

	function serveTablesEdges(tables: Table[]) {
		const tablesWithReferences = tables.filter(table => table.fields.some(f => f.reference));

		const edges: { id: string; source: string; target: string }[] = [];

		tablesWithReferences.forEach(table => {
			const fieldsWithReferences = table.fields.filter(f => f.reference);
			fieldsWithReferences.forEach(field => {
				const tableReferenced = tables.find(table => table.title === field.reference);

				if (!tableReferenced) return;

				const newEdge = {
					id: crypto.randomUUID().toString(),
					source: table.id,
					target: tableReferenced.id,
					type: 'smoothstep',
					markerEnd: { type: MarkerType.Arrow },
					style: { stroke: '#767676' },
				};

				edges.push(newEdge);
			});
		});

		return edges;
	}

	const [nodes, setNodes, onNodesChange] = useNodesState([...initialTableNodes]);
	const [edges, setEdges, onEdgesChange] = useEdgesState(serveTablesEdges(tables));

	useEffect(() => {
		setNodes(initialTableNodes);
		setEdges(serveTablesEdges(tables));
	}, [tables]);

	return {
		nodes,
		onNodesChange,
		edges,
		onEdgesChange,
	};
}
