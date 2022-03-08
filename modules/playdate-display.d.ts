type PlaydateScaleValues = 1 | 2 | 4 | 8;

/** @noSelf */
declare interface PlaydateDisplay {

	// 6.16 Display
	/**
	 * Sets the nominal refresh rate in frames per second.
	 * The default is 30 fps, which is a recommended figure that balances animation smoothness with performance and power considerations.
	 * Maximum is 50 fps.
	 * 
	 * If rate is 0, {@link playdate.update()} is called as soon as a frame buffer is available.
	 * Since the display refreshes line-by-line, and unchanged lines aren’t sent to the display, the update cycle will be faster than 30 times a second but at an indeterminate rate.
	 * {@link playdate.getCurrentTimeMilliseconds()} should then be used as a steady time base.
	 */
	setRefreshRate(rate: number): void;
	/**
	 * Gets the nominal refresh rate in frames per second.
	 */
	getRefreshRate(): number;
	/**
	 * Sends the contents of the frame buffer to the display immediately.
	 * Useful if you have called {@link playdate.stop()} to disable update callbacks in, say, the case where your app updates the display only in reaction to button presses.
	 */
	flush(): void;
	/**
	 * Returns the height the Playdate display, taking the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240.
	 * (See {@link playdate.display.setScale()}.)
	 */
	getHeight(): number;
	/**
	 * Returns the width the Playdate display, taking the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240.
	 * (See {@link playdate.display.setScale()}.)
	 */
	getWidth(): number;
	/**
	 * Returns the (width, height) the Playdate display, taking the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240.
	 * (See {@link playdate.display.setScale()}.)
	 */
	getSize(): LuaMultiReturn<[number, number]>;
	/**
	 * Returns the (x, y, width, height) the Playdate display, taking the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240.
	 * (See {@link playdate.display.setScale()}.)
	 */
	getRect(): LuaMultiReturn<[number, number, number, number]>;
	/**
	 * Sets (or gets) the display scale factor. Valid values for scale are 1, 2, 4, and 8.
	 * The top-left corner of the frame buffer is scaled up to fill the display; e.g., if the scale is set to 4, the pixels in rectangle [0,100] x [0,60] are drawn on the screen as 4 x 4 squares.
	 */
	setScale(scale: PlaydateScaleValues): void;
	/**
	 * Gets the display scale factor. Valid values for scale are 1, 2, 4, and 8
	 */
	getScale(): PlaydateScaleValues;
	/**
	 * If the argument passed to setInverted() is true, the frame buffer will be drawn inverted (everything onscreen that was black will now be white, etc.)
	 */
	setInverted(flag: boolean): void;
	/**
	 * If getInverted() returns true, the frame buffer will be drawn inverted (everything onscreen that was black will now be white, etc.)
	 */
	getInverted(): boolean;
	// TODO: Figure out if 0 - 3 are integer values or floats
	/**
	 * Adds a mosaic effect to the display. Valid x and y values are between 0 and 3, inclusive.
	 */
	setMosaic(x: number, y: number): void;
	/**
	 * Returns a tuple (x, y).
	 */
	getMosaic(): LuaMultiReturn<[number, number]>;
	/**
	 * Offsets the entire display by x, y.
	 * Offset values can be negative.
	 * The "exposed" part of the display is black or white, according to the value set in {@link playdate.graphics.setBackgroundColor()}.
	 * This is an efficient way to make a "shake" effect without redrawing anything.
	 * 
	 * @remarks
	 * This function is different from {@link playdate.graphics.setDrawOffset()}.
	 */
	setOffset(x: number, y: number): void;
	/**
	 * getOffset() returns the current display offset as a tuple (x, y).
	 */
	getOffset(): LuaMultiReturn<[number, number]>;
	/**
	 * Flips the display on the x or y axis, or both.
	 * 
	 * @remarks
	 * Function arguments are booleans, and in Lua 0 evaluates to true. 
	 */
	setFlipped(x: boolean, y: boolean): void;
	/**
	 * The simplest method for putting an image on the display.
	 * Copies the contents of the image at path directly to the frame buffer.
	 * The image must be 400x240 pixels with no transparency.
	 * 
	 * @remarks
	 * Loading an image via {@link playdate.graphics.image.new()} and drawing it at a desired coordinate with {@link playdate.graphics.image.draw()} offers more flexibility. 
	 */
	loadImage(path: string): void;
}

/** @noSelf */
export declare interface PlaydateCoreDisplay {
	display: PlaydateDisplay;
}