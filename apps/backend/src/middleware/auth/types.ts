import { Env } from '../..';

export type ValidateAuthInput = {
	token: string;
	env: Env;
};

export type ValidateAuthOutput = {
	token: string;
};
