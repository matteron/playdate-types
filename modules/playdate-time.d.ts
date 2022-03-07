export type PlaydateTimeTable = {
	/**
	 * 4-digit year (until 10,000 AD)
	 */
	year: number;
	/**
	 * month of the year, where 1 is January and 12 is December
	 */
	month: number;
	/**
	 * day of the month, 1 - 31
	 */
	day: number;
	/**
	 * day of the week, where 1 is Monday and 7 is Sunday
	 */
	weekday: number;
	/**
	 * 0 - 23
	 */
	hour: number;
	/**
	 * 0 - 59
	 */
	minute: number;
	/**
	 * 0 - 59 (or 60 on a leap second)
	 */
	second: number;
	/**
	 * 0 - 999
	 */
	millisecond: number;
}

/** @noSelf */
export interface PlaydateCoreTime {
	/**
	 * Returns the number of milliseconds the game has been active since launched.
	 * 
	 * @remarks
	 * When the game is not active — say, when the System Menu is visible, or when the Playdate is locked — that time is not counted by {@link playdate.getCurrentTimeMilliseconds()}.
	 */
	getCurrentTimeMilliseconds: () => number;
	/**
	 * Resets the high-resolution timer.
	 */
	resetElapsedTime: () => void;
	/**
	 * Returns the number of seconds since {@link playdate.resetElapsedTime()} was called.
	 * The value is a floating-point number with microsecond accuracy.
	 */
	getLapsedTime: () => number;
	/**
	 * Returns the number of seconds and milliseconds elapsed since midnight (hour 0), January 1 2000 UTC, as a tuple: (seconds, milliseconds).
	 * This function is suitable for seeding the random number generator:
	 * 
	 * Sample code for seeding the random number generator:
	 * `math.randomseed(playdate.getSecondsSinceEpoch())`
	 */
	getSecondsSinceEpoch: () => LuaMultiReturn<[number, number]>;

	/**
	 * Returns a table with values for the local time
	 */
	getTime: () => PlaydateTimeTable;
	/**
	 * Returns a table in the same format as {@link playdate.getTime()}, but in GMT rather than local time.
	 */
	getGMTTime: () => PlaydateTimeTable;
	/**
	 * Returns the number of seconds and milliseconds between midnight (hour 0), January 1 2000 UTC and time, specified in local time, as a tuple: (seconds, milliseconds).
	 * 
	 * @param time - should be a table of the same format as the one returned by {@link playdate.getTime()}.
	 */
	epochFromTime: (time: PlaydateTimeTable) => LuaMultiReturn<[number, number]>;
	/**
	 * Returns the number of seconds and milliseconds between midnight (hour 0), January 1 2000 UTC and time, specified in GMT time, as a tuple: (seconds, milliseconds).
	 * 
	 * @param time - should be a table of the same format as the one returned by {@link playdate.getTime()}.
	 */
	epochFromGMTTime: (time: PlaydateTimeTable) => LuaMultiReturn<[number, number]>;
	/**
	 * Converts the epoch to a local date and time table, in the same format as the table returned by {@link playdate.getTime()}.
	 */
	timeFromEpoch: (seconds: number, milliseconds: number) => PlaydateTimeTable;
	/**
	 * Converts the epoch to a GMT date and time table, in the same format as the table returned by {@link playdate.getTime()}.
	 */
	GMTTimeFromEpoch: (seconds: number, milliseconds: number) => PlaydateTimeTable;
}