import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export function NavWithEffect() {
	const location = useLocation();
	const [animate, setAnimate] = useState(false);

	return (
		<>
			{/* Navigation for Home page */}
			<div
				className={`${
					location.pathname !== '/' && 'hidden'
				} shadow-[0_-4px_4px_rgba(0,0,0,0.5)] w-full max-w-md h-10 bg-main absolute bottom-0 grid place-content-center`}
			>
				<NavLink to="/about" className="Nav-link ">
					<p className="text-center text-white font-bold">{`Learn how Shroomy works >>`}</p>
				</NavLink>
			</div>

			{/* Navigation for About page */}
			{/* <div
				className={`${
					location.pathname !== '/about' && 'hidden'
				} absolute bottom-10 w-full max-w-md bg-transparent grid place-content-center`}
			>
				<NavLink
					to="/"
					className="Nav-link shadow-[4px_4px_4px_rgba(0,0,0,0.5)] h-10 bg-main rounded-full px-10 grid place-content-center animate-slideUp"
				>
					<p className="text-center text-white font-bold uppercase">{`Get Started`}</p>
				</NavLink>
			</div> */}

			{/* Navigation for List page */}
			<div
				className={
					location.pathname === '/list'
						? `place-content-end flex flex-col w-full max-w-md fixed bottom-0 ${
								animate && 'animate-closePanel'
						  }`
						: 'hidden'
				}
			>
				<div className="h-[20%] relative">
					<div
						className={`${
							!animate && 'animate-slideUp'
						} w-full max-w-md h-20 bg-main rounded-t-3xl shadow-[0_-4px_4px_rgba(0,0,0,0.5)] absolute bottom-0`}
					>
						<NavLink
							to="/add-item"
							className="Nav-link w-fit h-fit mx-auto grid text-white uppercase text-center font-bold gap-3 justify-items-center"
						>
							<FontAwesomeIcon
								icon={faPlus}
								transform="shrink-3"
								className={`${
									animate && 'animate-rotateOutButton'
								} pl-0.5 text-6xl aspect-square shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-main-darkest rounded-full border text-white -mt-8`}
							/>
							<p className="animate-appear">Add new item</p>
						</NavLink>
					</div>
				</div>
				<div
					className={`w-full ${animate && 'animate-closeAddItem'} bg-main`}
				></div>
			</div>

			{/* Navigation for Add Item page */}
			<div
				className={
					location.pathname === '/add-item'
						? 'md:max-w-md absolute top-0 w-full animate-openPanel'
						: 'hidden'
				}
			>
				<div className="w-full md:max-w-md h-20 bg-main absolute bottom-0 rounded-t-3xl shadow-[0_-4px_4px_rgba(0,0,0,0.5)] z-10">
					<NavLink
						to="/list"
						className="Nav-link w-fit h-fit mx-auto grid z-10"
						onClick={() => setAnimate(true)}
					>
						<FontAwesomeIcon
							icon={faPlus}
							transform="shrink-3"
							className="animate-rotateButton pl-0.5 rotate-45 text-6xl aspect-square shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-main-darkest rounded-full border text-white -mt-8"
						/>
					</NavLink>
				</div>
				<NavLink
					to="/list"
					className="bg-black/[0.5] h-screen w-screen fixed top-0 left-0 z-[1]"
					onClick={() => setAnimate(true)}
				/>
			</div>
		</>
	);
}
