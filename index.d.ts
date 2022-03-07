
import { PlaydateCoreAccessibility } from './modules/playdate-accessibility';
import { PlaydateCoreDebugging, print as printDebug, printTable as printTableDebug, where as whereDebug } from './modules/playdate-debugging';
import { PlaydateCoreDisplay } from './modules/playdate-display';
import { PlaydateCoreInput} from './modules/playdate-input';
import { PlaydateCoreLifecycles } from './modules/playdate-lifecycle';
import { PlaydateCoreMenus } from './modules/playdate-menu';
import { PlaydateCoreProfiling, sample as sampleProfiling } from './modules/playdate-profiling';
import { PlaydateCoreSystem } from './modules/playdate-system';
import { PlaydateCoreTime } from './modules/playdate-time';

declare function required(this: void, source: string): void;

export type Playdate = PlaydateCoreSystem
	& PlaydateCoreLifecycles
	& PlaydateCoreMenus
	& PlaydateCoreAccessibility
	& PlaydateCoreInput
	& PlaydateCoreTime
	& PlaydateCoreDebugging
	& PlaydateCoreProfiling
	& PlaydateCoreDisplay
;

declare global {
	const playdate: Playdate;
	// TODO: Figure out how to declare this without having typescript complaining about overriding print.
	// Though it still works without it so not very pressing.
	// const print: typeof printDebug;
	const printTable: typeof printTableDebug;
	const where: typeof whereDebug;
	const sample: typeof sampleProfiling;
}