import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useEffect, useState } from 'react';

export function ListItem({ name, listToken, itemId, data }) {
	const [checkedState, setCheckedState] = useState(data.checked);

	const handleChange = (event) => {
		// console.log(event.target.checked)
		if (event.target.checked) {
			setCheckedState(true);
		} else {
			setCheckedState(false);
		}
		updateItem(listToken, itemId, checkedState);
	};

	// useEffect(() => {
	// 	function unCheckAfterTime() {
	// 		const now = Date.now();
	// 		const oneDayInSeconds = 24 * 60 * 60;
	// 		const newDateLastPurchased = data.dateLastPurchased.seconds;
	// 		const limit = (newDateLastPurchased + oneDayInSeconds) * 1000;

	// 		if (now > limit && checkedState === true) {
	// 			setCheckedState(false);
	// 			updateItem(listToken, itemId, checkedState);
	// 		}
	// 	}
	// 	unCheckAfterTime();
	// }, [checkedState])

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
