import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ data, listToken }) {
	const radioStyle =
		'checked:border-white checked:bg-main checked:border-4 appearance-none bg-white w-4 h-4 mr-5 rounded-full cursor-pointer';
	const radioLabelStyle = 'cursor-pointer flex flex-row items-center';

	const SOON = 7;
	const KINDA_SOON = 14;
	const NOT_SOON = 30;

	const [itemName, setItemName] = useState('');
	const [nextPurchase, setNextPurchase] = useState(0);
	const [submissionConfirmation, setSubmissionConfirmation] = useState('');

	const handleChange = (e) => {
		setItemName(e.target.value);
	};

	const submitForm = (e) => {
		e.preventDefault();

		//form validation
		if (itemName.trim() === '') {
			alert('Please specify the name of the item');
			return;
		}

		const existsInList = (itemName) => {
			const transformedInput = itemName.replace(/[^a-zA-Z]/g, '');

			const duplicates = data.filter((item) => {
				return item.name.toLowerCase() === transformedInput.toLowerCase();
			});

			let duplicateExists = duplicates.length > 0;

			return duplicateExists;
		};

		if (existsInList(itemName)) {
			alert('This item already exists in your shopping list');
			return;
		}

		if (nextPurchase === 0) {
			alert(
				"Please select how soon you'll be purchasing the item again (soon/Kinda Soon/Not Soon)",
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
				setSubmissionConfirmation(
					`${
						itemName[0].toUpperCase() + itemName.slice(1)
					} was added to your shopping list.`,
				);
				setTimeout(setSubmissionConfirmation, 5000);
			})
			.catch((error) => {
				setSubmissionConfirmation(
					`There was a problem adding your item, please try again later.`,
				);
				console.log(error);
			});
	};

	return (
		<>
			<div className="bg-main text-white w-full h-[83%] absolute bottom-0 max-w-md animate-openAddItem overflow-clip z-10">
				<div className="w-full absolute bottom-0 animate-appear bg-[url('/img/add-item-background.svg')] bg-cover h-[15rem]"></div>
				<form
					onSubmit={submitForm}
					className="grid justify-items-center w-full relative pt-5"
				>
					<h1 className="text-2xl tracking-wide font-bold uppercase text-center my-10">
						add new item
					</h1>
					<label htmlFor="itemName" className="text-center">
						Item Name
					</label>
					<input
						type="text"
						id="itemName"
						value={itemName}
						onChange={handleChange}
						placeholder="start typing..."
						className="bg-main-light text-main-darkest rounded-full py-1 pl-3 w-[80%] placeholder:text-main placeholder:italic"
					/>

					<fieldset
						name="buyAgain"
						className="grid border border-white px-10 py-5 gap-2 my-5 shadow-lg"
					>
						<legend htmlFor="buyAgain" className="text-center w-44 font-bold">
							How soon will you need to buy this again?
						</legend>
						<label htmlFor="soon" className={radioLabelStyle}>
							<input
								type="radio"
								id="soon"
								name="purchase-frequency"
								checked={nextPurchase === SOON}
								onChange={(e) => setNextPurchase(SOON)}
								className={radioStyle}
							/>
							Soon
						</label>

						<label htmlFor="kindaSoon" className={radioLabelStyle}>
							<input
								type="radio"
								id="kindaSoon"
								name="purchase-frequency"
								checked={nextPurchase === KINDA_SOON}
								onChange={(e) => setNextPurchase(KINDA_SOON)}
								className={radioStyle}
							/>
							Kinda Soon
						</label>

						<label htmlFor="notSoon" className={radioLabelStyle}>
							<input
								type="radio"
								id="notSoon"
								name="purchase-frequency"
								checked={nextPurchase === NOT_SOON}
								onChange={(e) => setNextPurchase(NOT_SOON)}
								className={radioStyle}
							/>
							Not Soon
						</label>
					</fieldset>

					<button
						type="submit"
						className="bg-white text-main-darkest border border-main-darkest hover:text-white hover:bg-main-darkest rounded-full p-2 w-44 mt-10 shadow-[0_4px_4px_rgba(0,0,0,0.4)]"
					>
						Add Item
					</button>
					{submissionConfirmation && (
						<p className="italic mt-5 p-5 text-center max-w-xs text-sm backdrop-blur rounded-xl bg-main-darkest/[0.7]">
							{submissionConfirmation}
						</p>
					)}
				</form>
			</div>
		</>
	);
}
