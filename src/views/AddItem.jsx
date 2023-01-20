import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ listToken }) {
	const soon = 7;
	const kindaSoon = 14;
	const notSoon = 30;

	const [itemName, setItemName] = useState('');
	const [nextPurchase, setNextPurchase] = useState(0);
	const [submissionConfirmation, setsubmissionConfirmation] = useState('');

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

		if (nextPurchase === 0) {
			alert(
				"Please select how soon you'll be purchasing the item again (soon/Kinda Soon/Not Soon",
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
				setsubmissionConfirmation(
					`${itemName} was added to your shopping list.`,
				);
				setTimeout(setsubmissionConfirmation, 5000);
			})
			.catch((error) => {
				setsubmissionConfirmation(
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
							checked={nextPurchase === soon}
							onChange={(e) => setNextPurchase(soon)}
						/>
						Soon
					</label>

					<label htmlFor="kindaSoon">
						<input
							type="radio"
							id="kindaSoon"
							name="purchase-frequency"
							checked={nextPurchase === kindaSoon}
							onChange={(e) => setNextPurchase(kindaSoon)}
						/>
						Kinda Soon
					</label>

					<label htmlFor="notSoon">
						<input
							type="radio"
							id="notSoon"
							name="purchase-frequency"
							checked={nextPurchase === notSoon}
							onChange={(e) => setNextPurchase(notSoon)}
						/>
						Not Soon
					</label>
				</fieldset>

				<button type="submit">Add Item</button>
			</form>

			{submissionConfirmation && 
			    <p>{submissionConfirmation}</p>
			}
		</>
	);
}
