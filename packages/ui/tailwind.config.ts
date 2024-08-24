import type { Config } from 'tailwindcss';

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
	theme: {
		extend: {
			colors: {
				dark: 'var(--dark-0)',
				dark1: 'var(--dark-1)',
				dark2: 'var(--dark-2)',
				dark3: 'var(--dark-3)',
				dark4: 'var(--dark-4)',
				dark5: 'var(--dark-5)',

				light1: 'var(--light-1)',
				light2: 'var(--light-2)',

				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
			},
		},
	},
	plugins: [],
};
export default config;
