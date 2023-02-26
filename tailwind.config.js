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
				yellow: '#E2DC48',
				orange: '#E2B953',
				red: '#C35255',
				blue: '#B6B6DA',
				green: '#9CB45C',
				'green-light': '#CCD5AA',
				'green-dark': '#E2DC48',
				'green-darkest': '#38663F',
			},
		},
	},
	plugins: [],
};
