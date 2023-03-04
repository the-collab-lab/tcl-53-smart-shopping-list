export function About() {
	return (
		<section className="p-10 text-center overflow-y-scroll h-screen">
			<img
				src="/img/logo.svg"
				alt="Shroomy logo"
				className="w-20 mt-6 mx-auto"
			/>
			<h1 className="text-3xl font-bold mb-16 mx-auto">How Shroomy Works</h1>

			{/* Description one */}
			<img
				src="/img/add-item-example.svg"
				alt="example of Shroomy shopping list"
				className="w-50 mb-6 mx-auto"
			/>
			<h2 className="text-lg font-bold mb-5">
				Create your own personalized shopping list
			</h2>

			<p className="mb-14">
				Add items you regularly buy to your list. When you add a new item,
				Shroomy will ask you to estimate how soon you'll need to buy it again.
			</p>

			{/* Description two */}
			<img
				src="/img/list-example.svg"
				alt="example of checking items off in shopping list"
				className="w-50 mb-6 mx-auto"
			/>
			<h2 className="text-lg font-bold mb-5">Check items off as you buy</h2>
			<p className="mb-14">
				This will allow Shroomy to remind you when you might need to purchase
				the same item again.
			</p>

			{/* Description three */}
			<img
				src="/img/next-purchase-example.svg"
				alt="example of Shroomy shopping list with color coding for item urgency"
				className="w-50 mb-6 mx-auto"
			/>
			<h2 className="text-lg font-bold mb-5">Shroomy adjusts to you</h2>
			<p className="mb-14">
				Shroomy uses your buying history to sort your list and places your most
				urgent items at the top. If you stop purchasing an item, it will
				automatically be placed at the bottom of your list after 60 days.
			</p>

			{/* Description four */}
			<img
				src="/img/list-token-example.svg"
				alt="example of a three word token being input to list"
				className="w-50 mb-6 mx-auto"
			/>
			<h2 className="text-lg font-bold mb-5">Share your list!</h2>
			<p className="mb-24">
				You can share the same list with everyone who shops for your household.
				Simply provide your list's three word token to your friend or family
				member, and they can use it to join your list from Shroomy's home
				screen.
			</p>
		</section>
	);
}
