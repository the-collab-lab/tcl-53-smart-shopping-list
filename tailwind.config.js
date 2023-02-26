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
				kindaSoon: '#E2DC48',
				soon: '#E2B953',
				overdue: '#C35255',
				inactive: '#B6B6DA',
				notSoon: '#9CB45C',
				main: '#9CB45C',
				'main-light': '#CCD5AA',
				'main-dark': '#E2DC48',
				'main-darkest': '#38663F',
			},
		},
	},
	plugins: [],
};
