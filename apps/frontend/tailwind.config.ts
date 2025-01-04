import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Omit<Config, 'content'> = {
	content: ['./src/components/**/*.{ts,tsx}', './src/containers/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		extend: {
			colors: {
				dark: 'var(--dark-0)',
				dark05: 'var(--dark-0-5)',
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

				accent: 'var(--accent)',
				accent1: 'var(--accent-1)',
				accent2: 'var(--accent-2)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(20px)' },
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'blur-out': {
					'0%': { filter: 'blur(5px) grayscale(85%)' },
					'100%': { filter: 'blur(0px) grayscale(0%)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-out': 'fade-out 0.3s ease-out forwards',
				'fade-up': 'fade-up 0.5s ease-out forwards',
				'blur-out': 'blur-out 0.4s ease-out forwards',
			},
		},
	},
	safelist: [
		'hover:border-[#7C9D62]',
		'hover:border-[#3E818C]',
		'hover:border-[#9F5B3D]',
		'hover:border-[#405D8D]',
		'hover:border-[#B2932C]',
		'hover:border-[#49586F]',
		'hover:border-[#8C3B51]',
		'hover:border-[#3D4D1F]',
		'hover:border-[#8C4D24]',
		'hover:border-[#1E4E65]',
	],
	plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
