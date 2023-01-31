import React, { useState } from 'react';
import { ListItem } from '../components';
import { useNavigate } from 'react-router-dom';

export function List({ data }) {
	const [searchedItem, setSearchedItem] = useState('');

	function handleChange(e) {
		setSearchedItem(e.target.value);
	}

	const filteredItems = data.filter((item) =>
		item.name.toLowerCase().includes(searchedItem.toLowerCase()),
	);

	let navigate = useNavigate();
	const routeToAddItem = () => {
		let path = `/add-item`;
		navigate(path);
	};

	return (
		<>
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
			<ul>
				{!filteredItems.length && searchedItem ? (
					<p>No items found.</p>
				) : (
					filteredItems.map((list) => {
						return <ListItem name={list.name} key={list.id} />;
					})
				)}
			</ul>
		</>
	);
}
