import { addItem } from '../api/firebase';
import { List } from './List';

// addItem(listId, { itemName, daysUntilNextPurchase })

export function AddItem({ listToken }) {
	return (
		<>
			{/* <p>Add Item</p> */}
			{/* <form onSubmit = {addItem(listToken, { itemName, })}> */}
			<form>
				<label htmlFor="itemName">Item Name</label>
				<input name="itemName"></input>

				<label htmlFor="buyAgain">How soon will you buy this again?</label>
				<fieldset name="buyAgain">
					<label htmlFor="soon">Soon</label>
					<input type="radio" name="soon" value={7} checked></input>

					<label htmlFor="kindaSoon">Kinda Soon</label>
					<input type="radio" name="kindaSoon" value={14}></input>

					<label htmlFor="notSoon">Not Soon</label>
					<input type="radio" name="notSoon" value={30}></input>
				</fieldset>
			</form>

			<button>Add Item</button>
		</>
	);
	// <p>
	// 	Hello from the <code>/add-item</code> page!
	// 	</p>
}

/**
 * Issues:
 * select only 1 radio button
 * how to setup the function for on submit
 * get the button to submit the form
 * submit the form when pressing "Enter/Return"
 * how to get the listID
 */
