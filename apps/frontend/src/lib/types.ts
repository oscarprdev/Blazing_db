export enum ProjectType {
	postgreSQL = 'postgreSQL',
	mongoDb = 'mongoDb',
}

export enum FormAuthMode {
	login = 'login',
	signup = 'signup',
}

export enum AiLanguage {
	SQL = 'sql',
	JAVASCRIPT = 'javascript',
}

export type Project = {
	projectId: string;
	title: string;
	type: ProjectType;
};

export type Field = {
	name: string;
	value: string;
	type: string;
	fieldConstraint: string;
	reference: string;
};

export type Table = {
	id: string;
	title: string;
	isReferenced: boolean;
	fields: Field[];
};

export type Query = {
	queryId: string;
	createdAt: string;
	value: string;
	language: AiLanguage;
	response: string;
};
