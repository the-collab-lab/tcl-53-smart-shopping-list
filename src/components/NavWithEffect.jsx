import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation } from 'react-router-dom';

export function NavWithEffect() {
	const location = useLocation();

	return (
		<>
			{/* previous navlinks */}
			{/* <nav className={`hidden`}>
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
                </nav> */}

			{/* Navigation for Home page */}
			<nav className={location.pathname === '/' ? '' : 'hidden'}>
				<div className="w-full md:max-w-md h-10 bg-main absolute bottom-0">
					<NavLink to="" className="Nav-link w-fit h-fit mx-auto grid">
						{`Learn how Shroomy works >>`}
					</NavLink>
				</div>
			</nav>

			{/* Navigation for List page */}
			<nav
				className={
					location.pathname === '/list'
						? ' place-content-end flex flex-col w-full max-w-md fixed bottom-0 animate-closePanel'
						: 'hidden'
				}
			>
				<div className="h-[20%] relative">
					<div className="w-full md:max-w-md h-20 bg-main rounded-t-3xl shadow-[0_-4px_4px_rgba(0,0,0,0.5)] absolute bottom-0">
						<NavLink
							to="/add-item"
							className="Nav-link w-fit h-fit mx-auto grid text-white uppercase text-center font-bold gap-3 justify-items-center"
						>
							<FontAwesomeIcon
								icon={faPlus}
								transform="shrink-3"
								className="animate-rotateOutButton pl-0.5 text-6xl aspect-square shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-main-darkest rounded-full border text-white -mt-8"
							/>
							<p className="animate-appear">Add new item</p>
						</NavLink>
					</div>
				</div>
				<div className="w-full animate-closeAddItem bg-main"></div>
			</nav>

			{/* Navigation for Add Item page */}
			<nav
				className={
					location.pathname === '/add-item'
						? 'md:max-w-md absolute top-0 w-full bg-black/[0.5] animate-openPanel'
						: 'hidden'
				}
			>
				<div className="w-full md:max-w-md h-20 bg-main absolute bottom-0 rounded-t-3xl shadow-[0_-4px_4px_rgba(0,0,0,0.5)]">
					<NavLink to="/list" className="Nav-link w-fit h-fit mx-auto grid">
						<FontAwesomeIcon
							icon={faPlus}
							transform="shrink-3"
							className="animate-rotateButton pl-0.5 rotate-45 text-6xl aspect-square shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-main-darkest rounded-full border text-white -mt-8"
						/>
					</NavLink>
				</div>
			</nav>
		</>
	);
}
