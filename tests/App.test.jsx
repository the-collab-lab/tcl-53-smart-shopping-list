// import { render } from '@testing-library/react';
// import { App } from '../src/App';

// it('renders without crashing', () => {
// 	render(<App />);
// });

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { App } from '../src/App';

afterEach(cleanup);

it('should take a snapshot', () => {
	const { asFragment } = render(<App />);

	expect(asFragment(<App />)).toMatchSnapshot();
});
