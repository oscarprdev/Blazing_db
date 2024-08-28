export interface DescribeProjectInfraOutput {
	projectid: string;
	ownerid: string;
	type: string;
	title: string;
	url: string;
}

export interface DescribeQueryInfraOutput {
	queryid: string;
	projectownerid: string;
	createdat: string;
	value: string;
	language: string;
	response: string;
}
