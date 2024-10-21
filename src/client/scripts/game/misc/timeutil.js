
/**
 * This script contains utility methods for working with dates and timestamps.
 * 
 * ZERO dependancies.
 */

/**
 * Converts minutes to milliseconds
 * @param {number} minutes 
 * @returns {number} Milliseconds
 */
function minutesToMillis(minutes) { return minutes * 60 * 1000; }

/**
 * Converts seconds to milliseconds
 * @param {number} seconds 
 * @returns {number} Milliseconds
 */
function secondsToMillis(seconds) { return seconds * 1000; }

/**
 * Returns the current UTC date in the "YYYY.MM.DD" format.
 * @returns {string} The current UTC date.
 */
function getCurrentUTCDate() {
	const now = new Date();
	const year = now.getUTCFullYear();
	const month = String(now.getUTCMonth() + 1).padStart(2, '0');
	const day = String(now.getUTCDate()).padStart(2, '0');
    
	return `${year}.${month}.${day}`;
}

/**
 * Returns the current UTC time in the "HH:MM:SS" format.
 * @returns {string} The current UTC time.
 */
function getCurrentUTCTime() {
	const now = new Date();
	const hours = String(now.getUTCHours()).padStart(2, '0');
	const minutes = String(now.getUTCMinutes()).padStart(2, '0');
	const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
	return `${hours}:${minutes}:${seconds}`;
}

/**
 * Converts a timestamp to an object with UTCDate and UTCTime.
 * @param {number} timestamp - The timestamp in milliseconds since the Unix Epoch.
 * @returns {Object} An object with the properties { UTCDate: "YYYY.MM.DD", UTCTime: "HH:MM:SS" }.
 */
function convertTimestampToUTCDateUTCTime(timestamp) {
	const date = new Date(timestamp);
    
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getUTCDate()).padStart(2, '0');
    
	const hours = String(date.getUTCHours()).padStart(2, '0');
	const minutes = String(date.getUTCMinutes()).padStart(2, '0');
	const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
	const UTCDate = `${year}.${month}.${day}`;
	const UTCTime = `${hours}:${minutes}:${seconds}`;
    
	return { UTCDate, UTCTime };
}

/**
 * Converts a UTCDate and optional UTCTime to a UTC timestamp in milliseconds since the Unix Epoch.
 * @param {string} UTCDate - The date in the format "YYYY.MM.DD".
 * @param {string} UTCTime - The time in the format "HH:MM:SS". Defaults to "00:00:00".
 * @returns {number} The UTC timestamp in milliseconds since the Unix Epoch.
 */
function convertUTCDateUTCTimeToTimeStamp(UTCDate, UTCTime = "00:00:00") {
	const [year, month, day] = UTCDate.split('.').map(Number);
	const [hours, minutes, seconds] = UTCTime.split(':').map(Number);

	const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
	return date.getTime();
}

/**
 * Calculates the total milliseconds based on the provided options.
 * @param {Object} options - An object containing time units and their values.
 * @param {number} [options.milliseconds=0] - The number of milliseconds.
 * @param {number} [options.seconds=0] - The number of seconds.
 * @param {number} [options.minutes=0] - The number of minutes.
 * @param {number} [options.hours=0] - The number of hours.
 * @param {number} [options.days=0] - The number of days.
 * @param {number} [options.weeks=0] - The number of weeks.
 * @param {number} [options.months=0] - The number of months.
 * @param {number} [options.years=0] - The number of years.
 * @returns {number} The total milliseconds calculated from the provided options.
 */
function getTotalMilliseconds(options) {
	const millisecondsIn = {
		milliseconds: 1,
		seconds: 1000,
		minutes: 1000 * 60,
		hours: 1000 * 60 * 60,
		days: 1000 * 60 * 60 * 24,
		weeks: 1000 * 60 * 60 * 24 * 7,
		months: 1000 * 60 * 60 * 24 * 30, // Approximation, not precise
		years: 1000 * 60 * 60 * 24 * 365, // Approximation, not precise
	};

	let totalMilliseconds = 0;

	for (const option in options) {
		if (millisecondsIn[option]) totalMilliseconds += options[option] * millisecondsIn[option];
	}

	return totalMilliseconds;
}

/**
 * Gets the current month in 'yyyy-mm' format.
 * @returns {string} The current month in 'yyyy-mm' format.
 */
function getCurrentMonth() {
	const date = new Date();
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because getMonth() returns 0-11
	return `${year}-${month}`;
}

/**
 * Gets the current day in 'yyyy-mm-dd' format.
 * @returns {string} The current day in 'yyyy-mm-dd' format.
 */
function getCurrentDay() {
	const date = new Date();
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
}

/**
 * Checks if the current date is within a specified date range.
 * @param {number} startMonth - The starting month of the range (1-12).
 * @param {number} startDay - The starting day of the range (1-31).
 * @param {number} endMonth - The ending month of the range (1-12).
 * @param {number} endDay - The ending day of the range (1-31).
 * @returns {boolean} True if the current date is within the specified range; otherwise, false.
 */
function isCurrentDateWithinRange(startMonth, startDay, endMonth, endDay) {
	const checkDate = new Date(); // Current date
	return checkDate >= new Date(checkDate.getFullYear(), startMonth - 1, startDay)
		&& checkDate <= new Date(checkDate.getFullYear(), endMonth - 1, endDay);
}

function getTextContentFromTimeRemain(time) {
	let seconds = Math.ceil(time / 1000);
	let minutes = 0;
	while (seconds >= 60) {
		seconds -= 60;
		minutes++;
	}
	if (seconds < 0) seconds = 0;

	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Returns true if the clock value is infinite. Internally, untimed games are represented with a "-".
 * @param {string} clock - The clock value (e.g. "10+5").
 * @returns {boolean} *true* if it's infinite.
 */
function isClockValueInfinite(clock) { return clock === '-'; }

/**
 * Splits the clock from the form `10+5` into the `minutes` and `increment` properties.
 * If it is an untimed game (represented by `-`), then this will return null.
 * @param {string} clock - The string representing the clock value: `10+5`
 * @returns {Object} An object with 2 properties: `minutes`, `increment`, or `null` if the clock is infinite.
 */
function getMinutesAndIncrementFromClock(clock) {
	if (isClockValueInfinite(clock)) return null;
	const [ seconds, increment ] = clock.split('+').map(part => +part); // Convert them into a number
	const minutes = seconds / 60;
	return { minutes, increment };
}

/**
 * Returns the clock in a slightly more human-readable format: `10m+5s`
 * @param {string} key - The clock string: `600+5`, where the left is the start time in seconds, right is increment in seconds.
 * @returns {string}
 */
function getClockFromKey(key) { // ssss+ss  converted to  15m+15s
	const minutesAndIncrement = getMinutesAndIncrementFromClock(key);
	if (minutesAndIncrement === null) return translations.no_clock;
	return `${minutesAndIncrement.minutes}m+${minutesAndIncrement.increment}s`;
}

export default {
	minutesToMillis,
	secondsToMillis,
	getCurrentUTCDate,
	getCurrentUTCTime,
	convertTimestampToUTCDateUTCTime,
	convertUTCDateUTCTimeToTimeStamp,
	getTotalMilliseconds,
	getCurrentMonth,
	getCurrentDay,
	isCurrentDateWithinRange,
	getTextContentFromTimeRemain,
	isClockValueInfinite,
	getMinutesAndIncrementFromClock,
	getClockFromKey,
};