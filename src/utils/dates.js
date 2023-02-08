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
	console.log(newDate);
	console.log(oldDate);
	const newDateToMilliSeconds = newDate.getTime();
	const oldDateToMilliSeconds = oldDate.getTime();

	const timeDifference = newDateToMilliSeconds - oldDateToMilliSeconds;

	const daysBetween = Math.ceil(timeDifference / ONE_DAY_IN_MILLISECONDS);
	return daysBetween;
}
