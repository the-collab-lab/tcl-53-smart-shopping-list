import { NavLink } from 'react-router-dom';

export function About() {
	return (
		<div>
			<section>
				<h1 className="text-xl font-bold">How Shroomy Works</h1>
			</section>

			<section>
				<h2>Create your own personalized shopping list</h2>

				<p>
					Add items you regularly buy to your list. When you add a new item,
					Shroomy will ask you to estimate how soon you'll need to buy it again.
				</p>
			</section>

			<section>
				<h2 className="text-lg font-bold">Check items off as you buy</h2>

				<p>
					This will allow Shroomy to remind you when you might need to purchase
					the same item again.
				</p>
			</section>

			<section>
				<h2 className="text-lg font-bold">Shroomy adjusts to you</h2>

				<p>
					Shroomy uses your buying history to sort your list and places your
					most urgent items at the top. If you stop purchasing an item, it will
					automatically be placed at the bottom of your list after 60 days.
				</p>
			</section>

			<section>
				<h2 className="text-lg font-bold">Share your list!</h2>

				<p>
					You can share the same list with everyone who shops for your
					household. Simply provide your lists's three word token to your friend
					or family member, and they can use it to join your list from Shroomy's
					home screen.
				</p>
			</section>
		</div>
	);
}
