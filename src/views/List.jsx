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
			<div className="flex flex-col flex-grow max-h-screen">
				{!data.length ? (
					<div className="flex flex-col items-center gap-2 mt-32">
						<p className="text-center ">Start adding to your list!</p>
						<button
							onClick={routeToAddItem}
							className="w-fit bg-main-darkest text-white border-[1.5px] border-main-darkest rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.4)] py-2 px-12 hover:bg-white hover:text-main-darkest hover:border-main-darkest"
						>
							Add your first item
						</button>
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
				<ul className="my-10 px-5 h-full overflow-y-scroll pb-[30rem]">
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
			</div>
		</>
	);
}
