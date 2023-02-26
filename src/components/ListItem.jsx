import './ListItem.css';
import { updateItem, deleteItem } from '../api/firebase';
import { useEffect, useState } from 'react';
import { getFutureDate } from '../utils';

export function ListItem({ name, listToken, itemId, data, urgency }) {
	const [checkedState, setCheckedState] = useState(data.checked);

	const urgencyString = (urgency) => {
		if (urgency === 0) {
			return 'Overdue';
		} else if (urgency === 1) {
			return 'Soon';
		} else if (urgency === 2) {
			return 'Kinda Soon';
		} else if (urgency === 3) {
			return 'Not Soon';
		} else if (urgency === 4) {
			return 'Inactive';
		}
	};
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

	const confirmDelete = () => {
		if (
			window.confirm(
				`Do you really want to delete ${name} from your shopping list?`,
			)
		) {
			deleteItem(listToken, itemId);
		}
	};

	return (
		<>
			<li className="ListItem">
				<label htmlFor={name}>
					<input
						type="checkbox"
						id={name}
						onChange={handleChange}
						checked={checkedState}
					/>
					{name}
				</label>
				<p>{` - ${urgencyString(urgency)}`}</p>
				<button onClick={confirmDelete}>Delete Item</button>
			</li>
		</>
	);
}
