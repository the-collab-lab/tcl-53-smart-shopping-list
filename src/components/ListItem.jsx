import { updateItem, deleteItem } from '../api/firebase';
import { useEffect, useState } from 'react';
import { getFutureDate } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export function ListItem({
	name,
	listToken,
	itemId,
	data,
	urgency,
	listLength,
	index,
	allDetailsOpen,
}) {
	const [checkedState, setCheckedState] = useState(data.checked);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [detailsClose, setDetailsClose] = useState(false);

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

	const urgencyMushroomsImg = {
		0: '../img/mushroom-urgency0.png',
		1: '../img/mushroom-urgency1.png',
		2: '../img/mushroom-urgency2.png',
		3: '../img/mushroom-urgency3.png',
		4: '../img/mushroom-urgency4.png',
	};

	const listItemStyles = {
		'top-style':
			'shadow-[0_4px_0_white] rounded-br-3xl rounded-tl-3xl rounded-tr-lg py-4',
		'middle-style': 'shadow-[0_4px_0_white] rounded-br-3xl -mt-6 pb-4 pt-10',
		'bottom-style': '-mt-6 rounded-b-3xl pb-4 pt-10',
		unique: 'rounded-3xl rounded-tr-lg py-4',
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

	const computeDate = (secs) => {
		const output = new Date(secs * 1000).toString().split(' ');
		return `${output[1]} ${output[2]}, ${output[3]}`;
	};

	const lastPurchase = data.dateLastPurchased
		? computeDate(data.dateLastPurchased.seconds)
		: 'N/A';
	const nextPurchase = data.dateNextPurchased
		? computeDate(data.dateNextPurchased.seconds)
		: 'N/A';

	return (
		<>
			{allDetailsOpen && !detailsClose ? (
				<li
					style={{ zIndex: String(listLength - index - 1) }}
					className={`w-full text-white relative px-4
				${urgencyColors[urgency]}
				${
					listLength === 1
						? listItemStyles['unique']
						: index === 0
						? listItemStyles['top-style']
						: index === listLength - 1
						? listItemStyles['bottom-style']
						: listItemStyles['middle-style']
				}`}
				>
					{' '}
					<div className="flex justify-between align-center">
						<label htmlFor={name} className="flex">
							<input
								type="checkbox"
								id={name}
								onChange={handleChange}
								checked={checkedState}
								className="hidden"
							/>
							{data.checked && (
								<FontAwesomeIcon
									icon={faCircleCheck}
									className="mr-2 text-xl self-center"
								/>
							)}
							{!data.checked && (
								<FontAwesomeIcon
									icon={faCircle}
									className="mr-2 hover:cursor-pointer text-xl self-center"
								/>
							)}
							<span className="mr-2 hover:cursor-pointer self-center">
								{name}
							</span>
							<img
								src={urgencyMushroomsImg[urgency]}
								className="inline-block h-7 self-center"
							/>
						</label>

						<div>
							<button onClick={() => setDetailsClose(true)}>
								{!detailsClose && (
									<FontAwesomeIcon
										icon={faCircleChevronUp}
										className="text-xl"
									/>
								)}

								{detailsClose && (
									<FontAwesomeIcon
										icon={faCircleChevronDown}
										className="text-xl"
										onClick={() => setDetailsOpen(true)}
									/>
								)}
							</button>

							<button onClick={confirmDelete} className="ml-5 text-xl">
								<FontAwesomeIcon icon={faTrashCan} />
							</button>
						</div>
					</div>
					{!detailsClose && (
						<div className="flex flex-col justify-between max-w-xs mt-3 ml-7 text-sm">
							<p>
								Next Purchase: <span className="font-bold">{nextPurchase}</span>
								{` (${urgencyString(urgency)})`}
							</p>
							<p>
								Last Purchase: <span className="">{lastPurchase}</span>
							</p>
							<p>
								Total Purchases:{' '}
								<span className="font-bold">{data.totalPurchases}</span>
							</p>
						</div>
					)}
				</li>
			) : (
				<li
					style={{ zIndex: String(listLength - index - 1) }}
					className={`w-full text-white relative px-4
					${urgencyColors[urgency]}
					${
						listLength === 1
							? listItemStyles['unique']
							: index === 0
							? listItemStyles['top-style']
							: index === listLength - 1
							? listItemStyles['bottom-style']
							: listItemStyles['middle-style']
					}`}
				>
					<div className="flex justify-between align-center">
						<label htmlFor={name} className="flex">
							<input
								type="checkbox"
								id={name}
								onChange={handleChange}
								checked={checkedState}
								className="opacity-0 absolute peer"
							/>
							{data.checked && (
								<FontAwesomeIcon
									icon={faCircleCheck}
									className="mr-2 text-xl self-center peer-focus:ring rounded"
								/>
							)}
							{!data.checked && (
								<FontAwesomeIcon
									icon={faCircle}
									className="mr-2 hover:cursor-pointer text-xl self-center peer-focus:ring rounded"
								/>
							)}
							<span className="mr-2 hover:cursor-pointer self-center">
								{name}
							</span>
							<img
								src={urgencyMushroomsImg[urgency]}
								className="inline-block h-7 self-center"
							/>
						</label>

						<div>
							<button onClick={() => setDetailsOpen(!detailsOpen)}>
								{detailsOpen && (
									<FontAwesomeIcon
										icon={faCircleChevronUp}
										className="text-xl"
									/>
								)}

								{!detailsOpen && (
									<FontAwesomeIcon
										icon={faCircleChevronDown}
										className="text-xl"
									/>
								)}
							</button>

							<button onClick={confirmDelete} className="ml-5 text-xl">
								<FontAwesomeIcon icon={faTrashCan} />
							</button>
						</div>
					</div>

					{detailsOpen && (
						<div className="flex flex-col justify-between max-w-xs mt-3 ml-7 text-sm">
							<p>
								Next Purchase: <span className="font-bold">{nextPurchase}</span>
								{` (${urgencyString(urgency)})`}
							</p>
							<p>
								Last Purchase: <span className="">{lastPurchase}</span>
							</p>
							<p>
								Total Purchases:{' '}
								<span className="font-bold">{data.totalPurchases}</span>
							</p>
						</div>
					)}
				</li>
			)}
		</>
	);
}
