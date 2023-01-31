import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useEffect, useState } from 'react';
import { getFutureDate } from '../utils';

export function ListItem({ name, listToken, itemId, data }) {
	const [checkedState, setCheckedState] = useState(data.checked);

	const handleChange = () => {
		setCheckedState(!data.checked);
		updateItem(listToken, itemId, !data.checked);
	};

	useEffect(function unCheckAfterTime() {
		if (data.dateLastPurchased !== null) {
			const yesterday = getFutureDate(-1);
			const dateLastPurchased = new Date(data.dateLastPurchased.toDate());

			if (yesterday > dateLastPurchased && data.checked === true) {
				setCheckedState(!data.checked);
				updateItem(listToken, itemId, !data.checked);
			}
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
