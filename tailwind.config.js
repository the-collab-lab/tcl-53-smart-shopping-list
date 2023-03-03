/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				logo: ['Psychofun', 'serif'],
				sans: ['"Kumbh Sans"', 'sans-serif'],
			},
			colors: {
				overdue: '#C35255',
				soon: '#f78d37',
				kindaSoon: '#e2b953',
				notSoon: '#9CB45C',
				inactive: '#72AEA3',
				main: '#9CB45C',
				'main-light': '#CCD5AA',
				'main-dark': '#E2DC48',
				'main-darkest': '#38663F',
			},
		},
	},
	plugins: [],
};
