import { Field } from '../types';
import { isError } from '../utils';
import { describeTableAction } from '@/src/app/actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

export type ModalContentField = {
	type: string;
	name: string;
	value: string;
	constraint: string;
	referenced: string;
};

export function useModalTableDetails({ title, fields }: { title: string; fields: Field[] }) {
	const params = useSearchParams();

	const { data, isLoading } = useQuery({
		queryKey: ['fetchValues', title],
		queryFn: async () => {
			const projectId = params.get('projectId') || '';
			if (!projectId) {
				toast.error('Project id is mandatory to see table details');
				return;
			}

			const res = await describeTableAction({
				projectId,
				tableTitle: title,
			});
			if (isError(res)) {
				toast.error(res.error);
				return;
			}

			toast.success(res.success.message);

			return res.success.data;
		},
	});

	const tableValuesMapped = useMemo(() => {
		return (
			data &&
			data.map(item =>
				item.map(field => {
					const sameField = fields.find(f => f.name === field.key);

					if (!sameField) return;

					return {
						type: sameField.type,
						name: sameField.name,
						value: field.value,
						constraint: sameField.fieldConstraint,
						referenced: sameField.reference,
					} satisfies ModalContentField;
				})
			)
		);
	}, [data]);

	return {
		isLoading,
		tableValuesMapped,
	};
}
