import { DeleteQueryPorts } from './delete-query.ports';
import { DeleteQueryTypes } from './delete-query.types';

export interface IDeleteQueryUsecase {
	execute(input: DeleteQueryTypes.ExecuteInput): Promise<void>;
}

export class DeleteQueryUsecase implements IDeleteQueryUsecase {
	constructor(private readonly ports: DeleteQueryPorts) {}

	async execute({ queryId }: DeleteQueryTypes.ExecuteInput): Promise<void> {
		await this.ports.delete({ queryId });
	}
}
