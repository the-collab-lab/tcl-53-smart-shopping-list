import React, { useState } from 'react';
import { ListItem } from '../components';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency } from '../utils/dates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

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
			{!data.length ? (
				<div>
					<p>Your shopping list is currently empty.</p>
					<button onClick={routeToAddItem}>Add your first item</button>
				</div>
			) : (
				<form
					onSubmit={(e) => e.preventDefault()}
					className="mx-5 text-sm grid mt-10"
				>
					<label htmlFor="search" className="pl-4">
						Filter items
					</label>
					<div className="bg-[#DDDCE6] rounded-full h-10 px-4 flex place-items-center justify-between gap-0">
						<div className="flex place-items-center grow">
							<FontAwesomeIcon icon={faSearch} className="text-xl" />
							<input
								id="search"
								type="text"
								placeholder="Start typing here..."
								value={searchedItem}
								onChange={handleChange}
								className="bg-transparent placeholder:italic mx-4 text-base w-full outline-main"
							/>
						</div>
						{searchedItem && (
							<button type="reset" onClick={() => setSearchedItem('')}>
								<FontAwesomeIcon
									icon={faXmark}
									mask={faCircle}
									transform="shrink-2"
									className="text-2xl"
								/>
							</button>
						)}
					</div>
				</form>
			)}
			<ul className="my-10 mx-5">
				{!filteredItems.length && searchedItem ? (
					<p className="ml-7">No items found.</p>
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
								listLength={filteredItems.length}
								index={index}
							/>
						);
					})
				)}
			</ul>
		</>
	);
}
