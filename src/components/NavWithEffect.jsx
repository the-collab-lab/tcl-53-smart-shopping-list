import { NavLink } from 'react-router-dom';

export function NavWithEffect() {
	return (
		<nav className="Nav bg-green-light">
			<p>
				This will be the lower tab and transition effect. It replaces the
				navigation bar & links.
			</p>
			<NavLink to="/" className="Nav-link">
				Home
			</NavLink>
			<NavLink to="/list" className="Nav-link">
				List
			</NavLink>
			<NavLink to="/add-item" className="Nav-link">
				Add Item
			</NavLink>
		</nav>
	);
}
