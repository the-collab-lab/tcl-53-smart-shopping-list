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

	console.log(filteredItems);
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<form>
				<label htmlFor="search">Filter items</label>
				<input
					id="search"
					type="search"
					placeholder="Start typing here..."
					value={searchedItem}
					onChange={handleChange}
				/>
			</form>
			<ul>
				{!filteredItems.length ? (
					<p>no item found</p>
				) : (
					filteredItems.map((list) => {
						return <ListItem name={list.name} key={list.id} />;
					})
				)}
			</ul>
		</>
	);
}
