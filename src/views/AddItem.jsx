import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ listToken }) {
	const [itemName, setItemName] = useState('');
	const [nextPurchase, setNextPurchase] = useState(0);
	const [submissionConfirmation, setSubmissionConfirmation] = useState('');

	const handleChange = (e) => {
		setItemName(e.target.value);
	};

	const submitForm = (e) => {
		e.preventDefault();
		try {
			addItem(listToken, { itemName, daysUntilNextPurchase: nextPurchase });
			// TO-DO: add useEffect to show successful and unsuccessful submits (failed, success)
		} catch {
			alert('There was a problem adding your item, please try again.');
		}
	};

	return (
		<main>
			<form>
				<p>Item Name</p>
				<input
					type="text"
					id="itemName"
					placeholder="Item Name"
					onChange={handleChange}
				/>{' '}
				<br />
				<input
					type="radio"
					id="soon"
					name="purchase-frequency"
					onChange={(e) => setNextPurchase(7)}
				/>
				<label htmlFor="soon">Soon</label>
				<br />
				<input
					type="radio"
					id="kind-of-soon"
					name="purchase-frequency"
					onChange={(e) => setNextPurchase(14)}
				/>
				<label htmlFor="kind-of-soon">Kind of soon</label>
				<br />
				<input
					type="radio"
					id="not-soon"
					name="purchase-frequency"
					onChange={(e) => setNextPurchase(30)}
				/>
				<label htmlFor="not-soon">Not soon</label>
				<p>
					<button type="submit" onClick={submitForm}>
						Add Item
					</button>
				</p>
			</form>
		</main>
	);
}
