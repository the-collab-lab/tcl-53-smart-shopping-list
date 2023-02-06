import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ data, listToken }) {
	//add - alert for invalid-item

	const SOON = 7;
	const KINDA_SOON = 14;
	const NOT_SOON = 30;

	const [itemName, setItemName] = useState('');
	const [nextPurchase, setNextPurchase] = useState(0);
	const [submissionConfirmation, setSubmissionConfirmation] = useState('');

	const handleChange = (e) => {
		setItemName(e.target.value);
	};

	const submitForm = (e) => {
		e.preventDefault();

		//form validation
		if (itemName === '') {
			alert('Please specify the name of the item');
			return;
		}

		const existsInList = (itemName) => {
			const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
			let transformedInput = [];

			for (let i = 0; i < itemName.length; i++) {
				let char = itemName[i].toLowerCase();

				if (ALPHABET.includes(char)) {
					transformedInput.push(char);
				}
			}

			const duplicates = data.filter((item) => {
				return item.name.toLowerCase() === transformedInput.join('');
			});

			let duplicateExists = duplicates.length > 0;

			return duplicateExists;
		};

		if (existsInList(itemName)) {
			alert('This item already exists in your shopping list');
			return;
		}

		if (nextPurchase === 0) {
			alert(
				"Please select how soon you'll be purchasing the item again (soon/Kinda Soon/Not Soon)",
			);
			return;
		}

		let itemData = {
			itemName: itemName,
			daysUntilNextPurchase: nextPurchase,
		};

		addItem(listToken, itemData)
			.then(() => {
				//clear form
				setItemName('');
				setNextPurchase(0);

				// put a note that the form was submitted (and erase after 5 seconds)
				setSubmissionConfirmation(
					`${itemName} was added to your shopping list.`,
				);
				setTimeout(setSubmissionConfirmation, 5000);
			})
			.catch((error) => {
				setSubmissionConfirmation(
					`There was a problem adding your item, please try again.`,
				);
				console.log(error);
			});
	};

	return (
		<>
			<form onSubmit={submitForm}>
				<label htmlFor="itemName">
					Item Name
					<input
						type="text"
						id="itemName"
						value={itemName}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="buyAgain">How soon will you buy this again?</label>
				<fieldset name="buyAgain">
					<label htmlFor="soon">
						<input
							type="radio"
							id="soon"
							name="purchase-frequency"
							checked={nextPurchase === SOON}
							onChange={(e) => setNextPurchase(SOON)}
						/>
						Soon
					</label>

					<label htmlFor="kindaSoon">
						<input
							type="radio"
							id="kindaSoon"
							name="purchase-frequency"
							checked={nextPurchase === KINDA_SOON}
							onChange={(e) => setNextPurchase(KINDA_SOON)}
						/>
						Kinda Soon
					</label>

					<label htmlFor="notSoon">
						<input
							type="radio"
							id="notSoon"
							name="purchase-frequency"
							checked={nextPurchase === NOT_SOON}
							onChange={(e) => setNextPurchase(NOT_SOON)}
						/>
						Not Soon
					</label>
				</fieldset>

				<button type="submit">Add Item</button>
			</form>

			{submissionConfirmation && <p>{submissionConfirmation}</p>}
		</>
	);
}
