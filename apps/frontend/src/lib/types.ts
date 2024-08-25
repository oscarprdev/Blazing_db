export enum ProjectType {
	postgreSQL = 'postgreSQL',
	mongoDb = 'mongoDb',
}

export enum FormAuthMode {
	login = 'login',
	signup = 'signup',
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
	title: string;
	fields: Field[];
};
