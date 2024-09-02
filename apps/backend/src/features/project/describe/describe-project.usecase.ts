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

		const [tables, references] = await Promise.all([
			this.ports.extractTables(databaseUrl),
			this.ports.extractReference(databaseUrl),
		]);

		const response = {
			title,
			tables: [],
		} as DescribeProjectTypes.DescribeProjectOutput;

		for await (const table of tables) {
			const { fields } = await this.ports.extractFields(databaseUrl, table);
			const fieldsEnriched = fields.map(field => ({
				...field,
				reference:
					references.find(ref => ref.table === table && ref.originalField === field.name)?.referenced || null,
			}));

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
}
