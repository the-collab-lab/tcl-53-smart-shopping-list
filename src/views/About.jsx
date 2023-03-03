import { NavLink } from 'react-router-dom';

export function About() {
	return (
		<div className="flex flex-col flex-grow h-screen">
			<div className="p-5 overflow-y-scroll">
				<section className="flex flex-col items-center justify-center">
					<img
						src="/img/logo.svg"
						alt="Shroomy logo"
						className="w-20 mt-6 flex justify-center"
					/>
					<h1 className="text-3xl font-bold flex justify-center">
						How Shroomy Works
					</h1>

					{/* Description one */}
					<img
						src="/img/add-item-example.svg"
						alt="example of Shroomy shopping list"
						className="w-50 m-6 flex justify-center"
					/>
					<h2 className="text-lg font-bold">
						Create your own personalized shopping list
					</h2>

					<p>
						Add items you regularly buy to your list. When you add a new item,
						Shroomy will ask you to estimate how soon you'll need to buy it
						again.
					</p>

					{/* Description two */}
					<img
						src="/img/list-example.svg"
						alt="example of checking items off in shopping list"
						className="w-50 m-6 flex justify-center"
					/>
					<h2 className="text-lg font-bold">Check items off as you buy</h2>
					<p>
						This will allow Shroomy to remind you when you might need to
						purchase the same item again.
					</p>

					{/* Description three */}
					<img
						src="/img/next-purchase-example.svg"
						alt="example of Shroomy shopping list with color coding for item urgency"
						className="w-50 m-6 flex justify-center"
					/>
					<h2 className="text-lg font-bold">Shroomy adjusts to you</h2>
					<p>
						Shroomy uses your buying history to sort your list and places your
						most urgent items at the top. If you stop purchasing an item, it
						will automatically be placed at the bottom of your list after 60
						days.
					</p>

					{/* Description four */}
					<img
						src="/img/next-purchase-example.svg"
						alt="example of a three word token being input to list"
						className="w-50 m-6 flex justify-center"
					/>
					<h2 className="text-lg font-bold">Share your list!</h2>
					<p>
						You can share the same list with everyone who shops for your
						household. Simply provide your lists's three word token to your
						friend or family member, and they can use it to join your list from
						Shroomy's home screen.
					</p>
				</section>

				<section className="flex flex-col items-center justify-center py-6">
					<NavLink
						to="/"
						className="Nav-link shadow-[4px_4px_4px_rgba(0,0,0,0.5)] h-10 bg-main rounded-full px-10 grid place-content-center animate-slideUp"
					>
						<p className="text-center text-white font-bold uppercase">{`Get Started`}</p>
					</NavLink>
				</section>
			</div>
		</div>
	);
}
