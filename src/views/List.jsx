import React, { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchedItem, setSearchedItem] = useState('');

	function handleChange(e) {
		setSearchedItem(e.target.value);
	}

	const filteredItems = data.filter((item) =>
		item.name.toLowerCase().includes(searchedItem.toLowerCase()),
	);

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{/* welcome prompt to add first item */}
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
			<ul>
				{!filteredItems.length ? (
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
