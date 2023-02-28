import './ListItem.css';
import { updateItem, deleteItem } from '../api/firebase';
import { useEffect, useState } from 'react';
import { getFutureDate } from '../utils';
// the classname package/module isn't necessary

export function ListItem({
	name,
	listToken,
	itemId,
	data,
	urgency,
	listLength,
	index,
}) {
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

	const urgencyColors = {
		0: 'bg-overdue',
		1: 'bg-soon',
		2: 'bg-kindaSoon',
		3: 'bg-notSoon',
		4: 'bg-inactive',
	};

	const listItemStyles = {
		'top-style':
			'shadow-[0_4px_0_white] rounded-br-3xl rounded-tl-3xl rounded-tr-lg',
		'middle-style': 'shadow-[0_4px_0_white] rounded-br-3xl -mt-6 pt-6', //when editing the items, we have to add pt-6 to compensate for the -mt-6.
		'bottom-style': '-mt-6 rounded-b-3xl pt-6', //when editing the items, we have to add pt-6 to compensate for the -mt-6.
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

	const isItemFavorited = true;

	return (
		<>
			<li
				style={{ zIndex: String(listLength - index - 1) }} //the z-index was not being applied with Tailwind. so I did an inline style
				className={`w-full text-white relative ${
					'' /* You can continue adding styling that applies to every item here */
				}
					${urgencyColors[urgency]}
					${
						index === 0
							? listItemStyles['top-style']
							: index === listLength - 1
							? listItemStyles['bottom-style']
							: listItemStyles['middle-style']
					}`}
			>
				<label htmlFor={name}>
					<input
						type="checkbox"
						id={name}
						onChange={handleChange}
						checked={checkedState}
						className="rounded-full"
					/>
					{name}
				</label>
				<span>Purchases: {data.totalPurchases}</span>

				<p>{` - ${urgencyString(urgency)}`}</p>
				<button onClick={confirmDelete}>Delete Item</button>
			</li>
		</>
	);
}
