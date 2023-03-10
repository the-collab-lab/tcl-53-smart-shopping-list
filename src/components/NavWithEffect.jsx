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
			<NavLink
				to="/about"
				className={`${
					location.pathname !== '/' && 'hidden'
				} shadow-[0_-4px_4px_rgba(0,0,0,0.5)] w-full max-w-md h-10 bg-main absolute bottom-0 grid place-content-center hover:animate-bounce`}
			>
				<p className="text-center text-white font-bold">{`Learn how Shroomy works >>`}</p>
			</NavLink>

			{/* Navigation for About page */}
			<div
				className={`${
					location.pathname !== '/about' && 'hidden'
				} absolute bottom-10 w-full max-w-md bg-transparent grid place-content-center`}
			>
				<NavLink
					to="/"
					onClick={() => setAnimate(false)}
					className="Nav-link border border-main-darkest text-white hover:text-main-darkest hover:bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.5)] h-10 bg-main-darkest rounded-full px-10 grid place-content-center animate-slideUp"
				>
					<p className="text-center font-bold uppercase ">{`Get Started`}</p>
				</NavLink>
			</div>

			{/* Navigation for List page */}
			<div
				className={
					location.pathname === '/list'
						? `place-content-end flex flex-col w-full max-w-md absolute bottom-0 z-[99999] ${
								animate && 'animate-closePanel'
						  }`
						: 'hidden'
				}
			>
				<div
					className={`relative w-full ${
						!animate && 'absolute h-32 overflow-y-clip'
					}`}
				>
					<div
						className={`${
							!animate && 'animate-slideUp'
						} w-full max-w-md h-20 bg-main rounded-t-3xl shadow-[0_-4px_4px_rgba(0,0,0,0.5)] absolute bottom-0`}
					>
						<NavLink
							to="/add-item"
							className="Nav-link w-fit h-fit mx-auto grid text-white uppercase text-center font-bold gap-3 justify-items-center"
						>
							<div className="group">
								<FontAwesomeIcon
									icon={faPlus}
									transform="shrink-3"
									className={`opacity-0 group-hover:opacity-100 absolute group-hover:scale-105 pl-0.5 text-6xl aspect-square shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-main-darkest rounded-full border text-white -mt-8 hover:scale-105`}
								/>
								<FontAwesomeIcon
									icon={faPlus}
									transform="shrink-3"
									className={`${
										animate && 'animate-rotateOutButton'
									} group-hover:opacity-0 pl-0.5 text-6xl aspect-square shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-main-darkest rounded-full border text-white -mt-8 hover:scale-105`}
								/>
							</div>

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
						? 'max-w-md absolute top-0 w-full animate-openPanel'
						: 'hidden'
				}
			>
				<div className="w-full max-w-md h-20 bg-main absolute bottom-0 rounded-t-3xl shadow-[0_-4px_4px_rgba(0,0,0,0.5)] z-10">
					<NavLink
						to="/list"
						className="Nav-link w-fit h-fit mx-auto grid z-10"
						onClick={() => setAnimate(true)}
					>
						<div className="group">
							<FontAwesomeIcon
								icon={faPlus}
								transform="shrink-3"
								className="opacity-0 group-hover:opacity-100 absolute group-hover:scale-105 pl-0.5 rotate-45 text-6xl aspect-square shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-main-darkest rounded-full border text-white -mt-8"
							/>
							<FontAwesomeIcon
								icon={faPlus}
								transform="shrink-3"
								className="group-hover:opacity-0 animate-rotateButton pl-0.5 rotate-45 text-6xl aspect-square shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-main-darkest rounded-full border text-white -mt-8"
							/>
						</div>
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
