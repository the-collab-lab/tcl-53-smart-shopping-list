import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useEffect, useState } from 'react';
import { getFutureDate } from '../utils';

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

	const switchState = () => {
		setCheckedState(!data.checked);
		updateItem(listToken, itemId, !data.checked);
	};

	const handleChange = () => {
		if (checkTimePast() || data.checked === false) {
			switchState();
		}
	};

	useEffect(function unCheckAfterTime() {
		if (checkTimePast() && data.checked === true) {
			switchState();
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
