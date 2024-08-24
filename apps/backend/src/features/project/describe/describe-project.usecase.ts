import { DescribeProjectPorts } from './describe-project.ports';
import { DescribeProjectTypes } from './describe-project.types';

export interface IDescribeProjectUsecase {
	execute(input: DescribeProjectTypes.DescribeProjectInput): Promise<DescribeProjectTypes.DescribeProjectOutput>;
}

export class DescribeProjectUsecase implements IDescribeProjectUsecase {
	constructor(private readonly ports: DescribeProjectPorts) {}

	async execute({ projectId }: DescribeProjectTypes.DescribeProjectInput) {
		const { databaseUrl } = await this.ports.describeDatabaseUrl(projectId);
		if (!databaseUrl) throw new Error('Project is not valid, database url is missing');

		const tables = await this.ports.extractTables(databaseUrl);

		const response = {
			tables: [],
		} as DescribeProjectTypes.DescribeProjectOutput;

		for (const table of tables) {
			const fieldsWithValues = await this.includeValues(databaseUrl, table);
			const fieldsEnriched = await this.includeReferences(databaseUrl, table, fieldsWithValues);

			response.tables = tables.map(table => ({
				title: table,
				fields: fieldsEnriched,
			}));
		}

		return response;
	}

	private async includeValues(databaseUrl: string, table: string) {
		const [{ fields }, values] = await Promise.all([
			this.ports.extractFields(databaseUrl, table),
			this.ports.extractValues(databaseUrl, table),
		]);

		return fields.map((field, i) => ({
			...field,
			value: values[i],
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
