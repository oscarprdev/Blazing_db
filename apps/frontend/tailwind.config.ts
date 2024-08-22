import sharedConfig from '../../packages/tailwind-config/tailwind.config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'content' | 'presets'> = {
	content: ['./src/app/**/*.tsx'],
	presets: [sharedConfig],
};

export default config;
