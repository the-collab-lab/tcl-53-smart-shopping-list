import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useEffect, useState } from 'react';

export function ListItem({ name, listToken, itemId, data }) {
	const [checkedState, setCheckedState] = useState(data.checked);

	const handleChange = () => {
		setCheckedState(!data.checked);
		updateItem(listToken, itemId, !data.checked);
	};

	useEffect(function unCheckAfterTime() {
		if (data.dateLastPurchased !== null) {
			const now = Date.now();
			const oneDayInSeconds = 24 * 60 * 60;
			const newDateLastPurchased = data.dateLastPurchased.seconds;
			const limit = (newDateLastPurchased + oneDayInSeconds) * 1000;

			if (now > limit && data.checked === true) {
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
