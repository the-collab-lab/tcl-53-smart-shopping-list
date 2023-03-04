import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

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

export function Layout({ data, listToken, allDetailsOpen, setAllDetailsOpen }) {
	const location = useLocation();
	const currentPath = location.pathname;

	const [showListToken, setShowListToken] = useState(false);
	const [copiedToken, setCopiedToken] = useState(false);

	function toggleListToken() {
		setShowListToken((prevState) => !prevState);
	}

	function copyTokenToClipboard() {
		window.navigator.clipboard.writeText(listToken);
		setCopiedToken(true);

		setTimeout(() => {
			setShowListToken(false);
			setCopiedToken(false);
		}, 2000);
	}

	function openAllItemDetails() {
		setAllDetailsOpen((prevState) => !prevState);
	}

	return (
		<>
			<div className="h-screen max-w-md mx-auto bg-white overflow-y-clip">
				{currentPath !== '/' && (
					<header className="h-auto py-8">
						<div className="flex items-center gap-4 px-5">
							<img
								src="/img/logo-header.svg"
								alt="Shroomy logo"
								className="w-10"
							/>
							<h1 className="font-logo text-3xl mr-auto">Shroomy</h1>
							{currentPath !== '/about' && (
								<button
									className="tooltip flex justify-center"
									onClick={toggleListToken}
									aria-describedby="share-button-tooltip"
								>
									<FontAwesomeIcon
										icon={faArrowUpFromBracket}
										className="h-5 hover:text-main"
									></FontAwesomeIcon>
									<span
										className="tooltiptext icon mt-1"
										id="share-button-tooltip"
									>
										Share with others
									</span>
								</button>
							)}
						</div>
						{currentPath !== '/about' && (
							<>
								<p className="text-center mt-4">
									You have{' '}
									<span className="text-main font-bold">
										{data.length} items
									</span>{' '}
									in your shopping list
								</p>
								<div className="flex justify-center items-center gap-2 mt-1">
									<button
										className="text-sm font-bold hover:text-main hover:cursor-pointer"
										onClick={openAllItemDetails}
									>
										{allDetailsOpen ? 'Hide' : 'Show'} all item details
									</button>
									<div>|</div>
									<Link
										to="/about"
										className="text-sm font-bold hover:text-main"
									>
										Learn how Shroomy works &gt;&gt;
									</Link>
								</div>
								{showListToken && (
									<div className="flex flex-col items-center gap-2 mt-2 z-0">
										<p className="text-sm">Your unique token:</p>
										<button
											className="bg-main-light text-sm cursor-pointer flex justify-center rounded-3xl py-2 px-6 tooltip"
											onClick={copyTokenToClipboard}
											onKeyDown={copyTokenToClipboard}
										>
											{listToken}
											<span className="text-xs px-4 mb-6 tooltiptext token">
												Click to copy to clipboard
											</span>
										</button>
										{copiedToken && (
											<p className="text-sm text-main">Copied to clipboard!</p>
										)}
									</div>
								)}
							</>
						)}
					</header>
				)}

				<main className="Layout-main">
					<Outlet />
				</main>
				<nav>
					<NavWithEffect />
				</nav>
			</div>
		</>
	);
}
