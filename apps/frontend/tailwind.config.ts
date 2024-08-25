import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Omit<Config, 'content'> = {
	content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		extend: {
			colors: {
				dark: 'var(--dark-0)',
				dark1: 'var(--dark-1)',
				dark2: 'var(--dark-2)',
				dark3: 'var(--dark-3)',
				dark4: 'var(--dark-4)',
				dark5: 'var(--dark-5)',

				light: 'var(--light-0)',
				light1: 'var(--light-1)',
				light2: 'var(--light-2)',
				light3: 'var(--light-3)',
				light4: 'var(--light-4)',
				light5: 'var(--light-5)',

				destructive: 'var(--destructive)',

				primary: 'var(--primary)',
				primary1: 'var(--primary-1)',
				secondary: 'var(--secondary)',
				secondary1: 'var(--secondary-1)',
			},
		},
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
