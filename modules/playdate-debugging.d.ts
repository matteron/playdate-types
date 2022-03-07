/**
 * Text output from print() will be displayed in the simulator’s console, in black if generated by a game running in the simulator or in blue if it’s coming from a plugged-in Playdate device.
 * Printed text is also copied to stdout, which is helpful if you run the simulator from the command line.
 * 
 * @remarks
 * You should ideally remove debugging print statements from your final games to improve performance. 
 */
export declare function print(this: void, value: string): void;
/**
 * Text output from printTable() will be displayed in the simulator’s console, in black if generated by a game running in the simulator or in blue if it’s coming from a plugged-in Playdate device.
 * Printed text is also copied to stdout, which is helpful if you run the simulator from the command line.
 * 
 * @remarks
 * You must import CoreLibs/object to use printTable. 
 * 
 * You should ideally remove debugging print statements from your final games to improve performance. 
 */
export declare function printTable(this: void, table: LuaTable): void;
/**
 * Returns a single-line stack trace as a string. For example:
 * 
 * `main.lua:10 foo() < main.lua:18 (from C)`
 * 
 * Use print(where()) to see this trace written to the console.
 * 
 * @remarks
 * You must import CoreLibs/utilities/where to use this function. 
 */
export declare function where(this: void): string;

/** @noSelf */
export interface PlaydateCoreDebugging {
	// 6.14 Debugging
	/**
	 * If the simulator is launched from the command line, any extra arguments passed there are available in the {@link playdate.argv} array.
	 */
	argv: string[];
	/**
	 * flag determines whether or not the print() function adds a newline to the end of the printed text.
	 * Default is true.
	 */
	setNewLinePrinted: (flag: boolean) => void;
	/**
	 * Calculates the current frames per second and draws that value at x, y.
	 * 
	 * @remarks
	 * Make sure to invoke drawFPS() only once per frame, otherwise its displayed results will be incorrect. 
	 */
	drawFPS: (x: number, y: number) => void;
}