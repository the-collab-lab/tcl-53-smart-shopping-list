import { List } from './List';

import { useState } from 'react';
import { addItem } from '../api/firebase';

// addItem(listId, { itemName, daysUntilNextPurchase })

export function AddItem({ listToken }) {
	const soon = '7';
	const kindaSoon = '14';
	const notSoon = '30';

	const [nextPurchase, setNextPurchase] = useState(soon);

	const handleChange = (e) => {
		setNextPurchase(e.target.value);
	};

	const submitForm = (e) => {
		e.preventDefault();

		//define listID
		//get itemName
		console.log('form submitted');

		let daysUntilNextPurchase = Number(nextPurchase);

		// addItem(listId, { itemName, daysUntilNextPurchase });
	};

	return (
		<>
			{/* <p>Add Item</p> */}
			{/* <form onSubmit = {addItem(listToken, { itemName, })}> */}
			<form onSubmit={submitForm}>
				<label htmlFor="itemName">Item Name</label>
				<input id="itemName"></input>

				<label htmlFor="buyAgain">How soon will you buy this again?</label>
				<fieldset name="buyAgain">
					<label htmlFor="soon">
						<input
							type="radio"
							id="soon"
							value={soon}
							checked={nextPurchase === soon}
							onChange={handleChange}
						/>
						Soon
					</label>

					<label htmlFor="kindaSoon">
						<input
							type="radio"
							id="kindaSoon"
							value={kindaSoon}
							checked={nextPurchase === kindaSoon}
							onChange={handleChange}
						/>
						Kinda Soon
					</label>

					<label htmlFor="notSoon">
						<input
							type="radio"
							id="notSoon"
							value={notSoon}
							checked={nextPurchase === notSoon}
							onChange={handleChange}
						/>
						Not Soon
					</label>
				</fieldset>

				<button type="submit">Add Item</button>
			</form>
		</>
	);
	// <p>
	// 	Hello from the <code>/add-item</code> page!
	// 	</p>
}

/**
 * Issues:
 * select only 1 radio button [DONE]
 * how to setup the function for on submit
 * get the button to submit the form
 * submit the form when pressing ""
 * how to get the listID
 */
