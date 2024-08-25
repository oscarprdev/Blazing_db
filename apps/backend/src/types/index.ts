export type RequestParams = Request & { params: Record<string, string> };

export enum ProjectType {
	postgreSQL = 'postgreSQL',
	mongo = 'mongo',
}

export type TableField = {
	name: string;
	value: string;
	type: string;
	fieldConstraint: string;
	reference: string;
};

export type DatabaseTable = {
	title: string;
	fields: TableField[];
};

export type UserDb = {
	userid: string;
	username: string;
	password: string;
};

export type ProjectDb = {
	projectid: string;
	ownerid: string;
	type: ProjectType;
	title: string;
	url: string;
};
