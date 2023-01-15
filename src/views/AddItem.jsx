// import { List } from './List';

import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ listToken }) {
	//itemName field behavior
	const [itemName, setItemName] = useState('');

	const handleChangeItem = (e) => {
		setItemName(e.target.value);
	};

	//buyNext field behavior
	const soon = '7';
	const kindaSoon = '14';
	const notSoon = '30';

	const [nextPurchase, setNextPurchase] = useState(soon);

	const handleChange = (e) => {
		setNextPurchase(e.target.value);
	};

	//actions upon form submission
	const [submissionConfirmation, setsubmissionConfirmation] = useState('');

	const submitForm = (e) => {
		e.preventDefault();

		//form validation
		if (itemName === '') {
			alert('Please specify the name of the item');
			return;
		}

		let itemData = {
			itemName: itemName,
			daysUntilNextPurchase: Number(nextPurchase),
		};

		// additem to the database
		const submission = addItem(itemName, itemData);

		// (if submission was sucessful successful)
		if (submission) {
			//clear form
			setItemName('');
			setNextPurchase(soon);
			// put a note that the form was submitted
			setsubmissionConfirmation(`${itemName} was added to your shopping list.`);
			// erase notification after 10 seconds.
			setTimeout(setsubmissionConfirmation, 10000);
		} else {
			// notify that the item was not submitted
			setsubmissionConfirmation(
				`There was a problem adding your item, please try again.`,
			);
		}
	};

	return (
		<>
			{/* <p>Add Item</p> */}
			<form onSubmit={submitForm}>
				<label htmlFor="itemName">
					Item Name
					<input
						type="text"
						id="itemName"
						value={itemName}
						onChange={handleChangeItem}
					/>
				</label>

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

			<p>{submissionConfirmation}</p>
		</>
	);
	// <p>
	// 	Hello from the <code>/add-item</code> page!
	// 	</p>
}

/**
 * Issues:
 * select only 1 radio button [DONE]
 * how to setup the function for on submit [DONE]
 * get the button to submit the form [DONE]
 * submit the form when pressing [DONE]
 * update the itemName [DONE]
 *
 * have mistakes/required for nameitem (form validation before submit) [DONE]
 * clear form after submit [DONE]
 * how to get the listID [DONE]
 * submit item to the database [DONE]
 * check if item was submitted successfully...
 */
