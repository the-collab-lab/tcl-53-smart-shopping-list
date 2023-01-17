import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ listToken }) {
	const soon = '7';
	const kindaSoon = '14';
	const notSoon = '30';

	const [itemName, setItemName] = useState('');
	const [nextPurchase, setNextPurchase] = useState(soon);
	const [submissionConfirmation, setsubmissionConfirmation] = useState('');

	const handleChangeItem = (e) => {
		setItemName(e.target.value);
	};

	const handleChangeNextPurchase = (e) => {
		setNextPurchase(e.target.value);
	};

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
		const submission = addItem(listToken, itemData);

		// (if submission was sucessful successful)
		if (submission) {
			//clear form
			setItemName('');
			setNextPurchase(soon);

			// put a note that the form was submitted
			setsubmissionConfirmation(`${itemName} was added to your shopping list.`);
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
							onChange={handleChangeNextPurchase}
						/>
						Soon
					</label>

					<label htmlFor="kindaSoon">
						<input
							type="radio"
							id="kindaSoon"
							value={kindaSoon}
							checked={nextPurchase === kindaSoon}
							onChange={handleChangeNextPurchase}
						/>
						Kinda Soon
					</label>

					<label htmlFor="notSoon">
						<input
							type="radio"
							id="notSoon"
							value={notSoon}
							checked={nextPurchase === notSoon}
							onChange={handleChangeNextPurchase}
						/>
						Not Soon
					</label>
				</fieldset>

				<button type="submit">Add Item</button>
			</form>

			<p>{submissionConfirmation}</p>
		</>
	);
}
