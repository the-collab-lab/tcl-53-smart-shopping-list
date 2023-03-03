import { Outlet, NavLink } from 'react-router-dom';
import { NavWithEffect } from '../components/NavWithEffect';

import './Layout.css';

export function Layout() {
	return (
		<>
			<div className="Layout h-screen md:max-w-md md:mx-auto">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<NavWithEffect />
			</div>
		</>
	);
}
