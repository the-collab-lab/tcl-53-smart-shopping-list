import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useEffect, useState } from 'react';
import { getFutureDate } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates.js';

export function ListItem({ name, listToken, itemId, data }) {
	const [checkedState, setCheckedState] = useState(data.checked);
 
	const checkTimePast = () => {
		if (data.dateLastPurchased !== null) {
			const yesterday = getFutureDate(-1);
			const dateLastPurchased = new Date(data.dateLastPurchased.toDate());

			return yesterday > dateLastPurchased;
		}

		return true;
	};

	const handleChange = () => {
		if (checkTimePast() || data.checked === false) {
			setCheckedState(!data.checked);
		
			// can only compute dateNextPurchased if item has been purchased before
			if (data.dateLastPurchased !== null) {
				const computeDateNextPurchased = () => {
					const dateLastPurchased = data.dateLastPurchased.toDate();
					const previousEstimate = Math.round((data.dateNextPurchased.toDate().getTime() - dateLastPurchased.getTime())/ONE_DAY_IN_MILLISECONDS);
					const today = new Date().getTime();
					const totalPurchases = data.totalPurchases;
					const daysSinceLastPurchase = Math.round((today - dateLastPurchased.getTime())/ONE_DAY_IN_MILLISECONDS);

					return calculateEstimate(previousEstimate, daysSinceLastPurchase, totalPurchases);
					
				}
				const timeNextPurchased = computeDateNextPurchased();
				const updatedDateNextPurchased = new Date(new Date().getTime() + timeNextPurchased)

				updateItem(listToken, itemId, !data.checked, updatedDateNextPurchased);
			} else {
				updateItem(listToken, itemId, !data.checked, data.dateNextPurchased);
			}
		}
	};

	useEffect(function unCheckAfterTime() {
		if (checkTimePast() && data.checked === true) {
			setCheckedState(!data.checked);
			updateItem(listToken, itemId, !data.checked, data.dateNextPurchased);
		}
	});

	return (
		<label htmlFor={name}>
			<input
				type="checkbox"
				id={name}
				onChange={handleChange}
				checked={checkedState}
			/>
			<li className="ListItem">{name}</li>
		</label>
	);
}
