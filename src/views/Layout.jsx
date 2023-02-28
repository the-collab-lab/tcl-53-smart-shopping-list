import { Outlet, Link, NavLink } from 'react-router-dom';
import { NavWithEffect } from '../components/NavWithEffect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

import './Layout.css';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout({ data, listToken }) {
	return (
		<>
			<div className="h-screen md:max-w-md md:mx-auto">
				{listToken && (
					<header className="h-auto my-8">
						<div className="flex items-center gap-4">
							<img src="/img/logo.svg" alt="Shroomy logo" className="w-10" />
							<h1 className="font-logo text-3xl mr-auto">Shroomy</h1>
							<button className="tooltip flex justify-center">
								<FontAwesomeIcon
									icon={faArrowUpFromBracket}
									className="h-5 hover:text-main"
								></FontAwesomeIcon>
								<span className="tooltiptext mt-1">Share with others</span>
							</button>
						</div>
						<p className="text-center mt-4">
							You have{' '}
							<span className="text-main font-bold">{data.length} items</span>{' '}
							in your shopping list
						</p>
						<div className="flex justify-center gap-2 mt-1">
							<span className="font-bold hover:text-main hover:cursor-pointer">
								Show all item details
							</span>
							<div>|</div>
							<Link to="#" className="font-bold hover:text-main">
								Learn how Shroomy works
							</Link>
						</div>
						<div className="flex flex-col items-center gap-2 mt-2 z-0">
							<p>Your unique token:</p>
							<span className="bg-main-light text-sm rounded-3xl py-2 px-6">
								{listToken}
							</span>
						</div>{' '}
					</header>
				)}

				<main className="Layout-main">
					<Outlet />
				</main>
				<NavWithEffect />
				{/* <nav className="Nav">
					<NavLink to="/" className="Nav-link">
						Home
					</NavLink>
					<NavLink to="/list" className="Nav-link">
						List
					</NavLink>
					<NavLink to="/add-item" className="Nav-link">
						Add Item
					</NavLink>
				</nav> */}
			</div>
		</>
	);
}
