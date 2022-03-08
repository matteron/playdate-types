/**
 * @param t - is elapsed time
 * @param b - is the beginning value
 * @param c - is the change (or end value - start value)
 * @param d - is the duration
 */
declare type BasicEasingFunction = (this: void, t: number, b: number, c: number, d: number) => number;
/**
 * @param t - is elapsed time
 * @param b - is the beginning value
 * @param c - is the change (or end value - start value)
 * @param d - is the duration
 * @param a - amplitude
 * @param p - period parameter
 */
declare type ElasticEasingFunction = (this: void, t: number, b: number, c: number, d: number, a?: number, p?: number) => number;
/**
 * @param t - is elapsed time
 * @param b - is the beginning value
 * @param c - is the change (or end value - start value)
 * @param d - is the duration
 * @param s - amount of "overshoot"
 */
declare type OvershootableEasingFunction = (this: void, t: number, b: number, c: number, d: number, s?: number) => number;

declare type BasicEasingFunctionNames = 'linear'
	| 'inQuad'
	| 'outQuad'
	| 'inOutQuad'
	| 'outInQuad'
	| 'inCubic'
	| 'outCubic'
	| 'inOutCubic'
	| 'outInCubic'
	| 'inQuart'
	| 'outQuart'
	| 'inOutQuart'
	| 'outInQuart'
	| 'inQuint'
	| 'outQuint'
	| 'inOutQuint'
	| 'outInQuint'
	| 'inSine'
	| 'outSine'
	| 'inOutSine'
	| 'outInSine'
	| 'inExpo'
	| 'outExpo'
	| 'inOutExpo'
	| 'outInExpo'
	| 'inCirc'
	| 'outCirc'
	| 'inOutCirc'
	| 'outInCirc'
	| 'outBounce'
	| 'inBounce'
	| 'inOutBounce'
	| 'outInBounce'
;

declare type ElasticEasingFunctionNames = 'inElastic'
	| 'outElastic'
	| 'inOutElastic'
	| 'outInElastic'
;

declare type OvershootableEasingFunctionNames = 'inBack'
	| 'outBack'
	| 'inOutBack'
	| 'outInBack'
;

/**
 * A set of easing functions to aid with animation timing.
 * 
 * @remarks
 * You must import CoreLibs/easing to use these functions.
 */
declare type PlaydateEasingFunctions = {
	[key in BasicEasingFunctionNames]: BasicEasingFunction;
} & {
	[key in ElasticEasingFunctionNames]: ElasticEasingFunction;
} & {
	[key in OvershootableEasingFunctionNames]: OvershootableEasingFunction;
}

/** @noSelf */
export declare interface PlaydateCoreEasingFunctions {
	// 6.17 Easing functions
	easingFunctions: PlaydateEasingFunctions
}