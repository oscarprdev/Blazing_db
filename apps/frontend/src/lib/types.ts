export enum ProjectType {
	postgreSQL = 'postgreSQL',
	mongo = 'mongo',
}

export enum FormAuthMode {
	login = 'login',
	signup = 'signup',
}

export type ListProjectsOutput = {
	projects: Project[];
};

export type Project = {
	projectId: string;
	title: string;
	type: ProjectType;
};
