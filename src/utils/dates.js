const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export function getDaysBetweenDates(newDate, oldDate) {
	const timeDifference = newDate - oldDate;

	const differenceInDays = Math.ceil(timeDifference / ONE_DAY_IN_MILLISECONDS);
	return differenceInDays;
}

export function comparePurchaseUrgency(data) {
	const classifiedByUrgency = data.map((item) => {
		const dateLastPurchased =
			item.dateLastPurchased === null
				? new Date(item.dateCreated.toDate())
				: new Date(item.dateLastPurchased.toDate());
		const dateNextPurchased = new Date(item.dateNextPurchased.toDate());

		const daysTilNextPurchase = getDaysBetweenDates(
			dateNextPurchased,
			dateLastPurchased,
		);

		let urgency;

		//dateNextPurchase (was yesterday) and today;

		if (dateNextPurchased < new Date() && daysTilNextPurchase < 60) {
			//is the item OverDue?
			urgency = 0;
		} else if (daysTilNextPurchase <= 7) {
			urgency = 1;
		} else if (daysTilNextPurchase <= 30) {
			urgency = 2;
		} else if (daysTilNextPurchase <= 60) {
			urgency = 3;
		} else {
			urgency = 4;
		}

		item.urgency = urgency;

		return item;
	});

	classifiedByUrgency
		.sort((a, b) => a.name.localeCompare(b.name))
		.sort((a, b) => a.urgency - b.urgency);

	return classifiedByUrgency;
}
