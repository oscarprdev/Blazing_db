import { DescribeProjectPorts } from './describe-project.ports';
import { DescribeProjectTypes } from './describe-project.types';
import { TableField } from '@/types';

export interface IDescribeProjectUsecase {
	execute(input: DescribeProjectTypes.DescribeProjectInput): Promise<DescribeProjectTypes.DescribeProjectOutput>;
}

export class DescribeProjectUsecase implements IDescribeProjectUsecase {
	constructor(private readonly ports: DescribeProjectPorts) {}

	async execute({ projectId }: DescribeProjectTypes.DescribeProjectInput) {
		const { databaseUrl, title } = await this.ports.describeProject(projectId);
		if (!databaseUrl) throw new Error('Project is not valid, database url is missing');

		const tables = await this.ports.extractTables(databaseUrl);

		const response = {
			title,
			tables: [],
		} as DescribeProjectTypes.DescribeProjectOutput;

		for (const table of tables) {
			const fieldsWithValues = await this.includeValues(databaseUrl, table);
			const fieldsEnriched = await this.includeReferences(databaseUrl, table, fieldsWithValues);

			response.tables.push({
				id: crypto.randomUUID().toString(),
				title: table,
				isReferenced: false,
				fields: this.sortFields(fieldsEnriched),
			});
		}

		return {
			title: response.title,
			tables: response.tables.map(table => ({
				...table,
				isReferenced: response.tables.some(t => t.fields.some(f => f.reference === table.title)),
			})),
		};
	}

	private sortFields(fields: TableField[]) {
		return fields.sort((a, b) => {
			if (a.fieldConstraint === 'PRIMARY KEY' && b.fieldConstraint !== 'PRIMARY KEY') return -1;
			if (a.fieldConstraint !== 'PRIMARY KEY' && b.fieldConstraint === 'PRIMARY KEY') return 1;

			if (a.type === 'uuid' && b.type !== 'uuid') return -1;
			if (a.type !== 'uuid' && b.type === 'uuid') return 1;

			return 0;
		});
	}

	private async includeValues(databaseUrl: string, table: string) {
		const [{ fields }, values] = await Promise.all([
			this.ports.extractFields(databaseUrl, table),
			this.ports.extractValues(databaseUrl, table),
		]);

		return fields.map((field, i) => ({
			...field,
			values: values.map(val => val[field.name] || null),
		})) satisfies DescribeProjectTypes.EnrichedField[];
	}

	private async includeReferences(databaseUrl: string, table: string, fields: DescribeProjectTypes.EnrichedField[]) {
		const foreignFields = fields.filter(field => field.fieldConstraint === 'FOREIGN KEY');
		if (foreignFields.length === 0) return fields.map(f => ({ ...f, reference: '' }));

		const references = await Promise.all(
			foreignFields.map(field => this.ports.extractReference(databaseUrl, table, field.name))
		);

		return fields.map(field => {
			const foreignField = foreignFields.find(f => f.name === field.name);
			if (!foreignField) return { ...field, reference: '' };

			const index = foreignFields.findIndex(f => f.name === foreignField.name);

			return { ...field, reference: references[index] };
		});
	}
}
