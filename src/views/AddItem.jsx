export function AddItem() {
	return (
		<>
			{/* <p>Add Item</p> */}
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

			<button>Add Item</button>
		</>
	);
	// <p>
	// 	Hello from the <code>/add-item</code> page!
	// 	</p>
}
