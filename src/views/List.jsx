import React, { useState } from 'react';
import { ListItem } from '../components';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency } from '../utils/dates';

export function List({ data, listToken }) {
	const [searchedItem, setSearchedItem] = useState('');

	function handleChange(e) {
		setSearchedItem(e.target.value);
	}

	const orderedData = comparePurchaseUrgency(data);

	const filteredItems = orderedData.filter((item) =>
		item.name.toLowerCase().includes(searchedItem.toLowerCase()),
	);

	let navigate = useNavigate();
	const routeToAddItem = () => {
		let path = `/add-item`;
		navigate(path);
	};

	return (
		<>
			{/* The height of the green section of the navigation tab is: h-20 (5rem);
		The button is sticking out by -mt-6 (1.5rem);
		You'll need 6.5rem of empty space at the bottom of your page so that the user can see their entire list.  */}
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{!data.length ? (
				<div>
					<p>Your shopping list is currently empty.</p>
					<button onClick={routeToAddItem}>Add your first item</button>
				</div>
			) : (
				<form onSubmit={(e) => e.preventDefault()}>
					<label htmlFor="search">Filter items</label>
					<input
						id="search"
						type="text"
						placeholder="Start typing here..."
						value={searchedItem}
						onChange={handleChange}
					/>
					{searchedItem && (
						<button type="reset" onClick={() => setSearchedItem('')}>
							X
						</button>
					)}
				</form>
			)}
			<ul className="my-10 mx-auto max-w-xs">
				{!filteredItems.length && searchedItem ? (
					<p>No items found.</p>
				) : (
					filteredItems.map((list, index) => {
						return (
							<ListItem
								name={list.name}
								key={list.id}
								listToken={listToken}
								itemId={list.id}
								data={list}
								urgency={list.urgency}
								listLength={data.length}
								index={index}
							/>
						);
					})
				)}
			</ul>
		</>
	);
}
