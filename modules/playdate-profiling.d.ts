/**
 * Suspect some code is running hot? Wrap it in an anonymous function and pass it to sample() like so:
 * 
 * By moving around where you start and end the anonymous function in your code, you can get a better idea of where the problem lies.
 * 
 * Multiple code paths can be sampled at once by using different names for each sample.
 * 
 * @remarks 
 * You must import CoreLibs/utilities/sampler to use this function. 
 * 
 * @example sample("name of this sample", function()
        -- nested for loops, lots of table creation, member access...
	end)
 */
export declare function sample(name: string, func: Function): void;

type PlaydateStats = {
	kernel: number;
	game: number;
	audio: number;
}

/** @noSelf */
export interface PlaydateCoreProfiling {
	/**
	 * Returns a table containing percentages for each system task, such as:
	 */
	getStats: () => PlaydateStats;

	/**
	 * `setStatsInterval()` sets the length of time for each sample frame of runtime stats.
	 * Set seconds to zero to disable stats collection.
	 */
	setStatsInterval: (seconds: number) => void;	
}