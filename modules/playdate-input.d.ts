declare type PlaydateButtonStates = 'Down' | 'Held' | 'Up';
declare type PlaydateButtonNames = 'A' | 'B' | 'down' | 'left' | 'right' | 'up';
declare type PlaydateButtonConstantName<T extends PlaydateButtonNames> = `kButton${Capitalize<T>}`;
declare type PlaydateButtonConstantNames = PlaydateButtonConstantName<PlaydateButtonNames>;

declare type PlaydateButtonConstantValues<T extends PlaydateButtonConstantNames> =
	T extends PlaydateButtonConstantName<'A'> ? 32 : 
	T extends PlaydateButtonConstantName<'B'> ? 16 :
	T extends PlaydateButtonConstantName<'down'> ? 8 :
	T extends PlaydateButtonConstantName<'up'> ? 4 :
	T extends PlaydateButtonConstantName<'right'> ? 2 :
	T extends PlaydateButtonConstantName<'left'> ? 1 :
	never
;

export declare type PlaydateButtonArguments = Lowercase<PlaydateButtonNames> | PlaydateButtonConstantValues<any>;

declare type PlaydateButtonConstants = {
	[key in PlaydateButtonConstantNames]: PlaydateButtonConstantValues<key>;
}
declare type PlaydateButtonCallbacks = `${PlaydateButtonNames}Button${PlaydateButtonStates}`;

export declare type PlaydateInputHandler = {
	/**
	 * Playdate will attempt to call the following functions in your script when input events occur:
	 */
	[key in PlaydateButtonCallbacks]: (this: void) => void;
} & {
	/**
	 * For {@link playdate.cranked()},
	 * @param change - is the angle change in degrees.
	 * @param acceleratedChange - is change multiplied by a value that increases as the crank moves faster, similar to the way mouse acceleration works.
	 * Negative values are anti-clockwise.
	 */
	 cranked(change: number, acceleratedChange: number): void;
};

/** @noSelf */
export declare interface PlaydateInputHandlers {
	/**
	 * Pushes a new input handler onto the stack.
	 * 
	 * @param handler - A table containing one or more custom input functions.
	 * 
	 * @param masksPreviousHandlers - If true, input functions not defined in handler will not be called.
	 * If missing or false, the previously-pushed input handler tables will be searched for input functions missing from handler, cascading down to the default playdate table.
	 */
	push(handle: PlaydateInputHandler, maskPreviousHandlers?: boolean): void;
	/**
	 * Pops the last input handler off of the stack.
	 */
	pop(): void;
}

/** @noSelf */
export declare interface PlaydateCoreInput extends PlaydateInputHandler, PlaydateButtonConstants {

	// 6.8 Accelerometer
	/**
	 * The accelerometer is off by default, to save a bit of power.
	 * If you will be using the accelerometer in your game, you’ll first need to call {@link playdate.startAccelerometer()} then wait for the next update cycle before reading its values.
	 * If you won’t be using the accelerometer again for a while, calling {@link playdate.stopAccelerometer()} will put it back into a low-power idle state.
	 */
	startAccelerometer(): void;
	/**
	 * The accelerometer is off by default, to save a bit of power.
	 * If you will be using the accelerometer in your game, you’ll first need to call {@link playdate.startAccelerometer()} then wait for the next update cycle before reading its values.
	 * If you won’t be using the accelerometer again for a while, calling {@link playdate.stopAccelerometer()} will put it back into a low-power idle state.
	 */
	stopAccelerometer(): void;
	/**
	 * If the accelerometer has been turned on with {@link playdate.startAccelerometer()},
	 * @returns returns the x, y, and z values from the accelerometer as a tuple.
	 * Positive x points right, positive y points to the bottom of the screen, and positive z points through the screen away from the viewer.
	 * 
	 * For example, with the device held upright this function returns the tuple (0,1,0). With it flat on its back, it returns (0,0,1).
	 */
	readAccelerometer(): LuaMultiReturn<[number, number, number]>;
	/**
	 * Returns true if the accelerometer is currently running.
	 */
	accelerometerIsRunning(): boolean;

	// 6.9 Buttons
	/**
	 * Returns true if button is currently being pressed.
	 * @param button - should be one of the constants:
	 * - {@link playdate.kButtonA}
	 * - {@link playdate.kButtonB}
	 * - {@link playdate.kButtonUp}
	 * - {@link playdate.kButtonDown}
	 * - {@link playdate.kButtonLeft}
	 * - {@link playdate.kButtonRight}
	 * - Or one of the strings "a", "b", "up", "down", "left", "right".
	 */
	buttonIsPressed(button: PlaydateButtonArguments): boolean;
	/**
	 * Returns true for just one update cycle if button was pressed.
	 * buttonJustPressed will not return true again until the button is released and pressed again.
	 * This is useful for, say, a player "jump" action, so the jump action is taken only once and not on every single update.
	 * 
	 * button should be one of the constants listed in {@link playdate.buttonIsPressed()}
	 */
	buttonJustPressed(button: PlaydateButtonArguments): boolean;
	/**
	 * Returns true for just one update cycle if button was released.
	 * buttonJustReleased will not return true again until the button is pressed and released again.
	 * 
	 * button should be one of the constants listed in {@link playdate.buttonIsPressed()}
	 */
	buttonJustReleased(button: PlaydateButtonArguments): boolean;

	// 6.10 Crank
	/**
	 * Returns a boolean indicating whether or not the crank is folded into the unit.
	 * 
	 * @remarks
	 * If your game requires the crank and `.isCrankDocked()` is true, you can use a {@link playdate.ui.crankIndicator crank alert} to notify the user that the crank should be extended. 
	 */
	isCrankDocked(): boolean;
	/**
	 * Returns the absolute position of the crank (in degrees).
	 * Zero is pointing straight up parallel to the device.
	 * Turning the crank clockwise (when looking at the right edge of an upright device) increases the angle, up to a maximum value 359.9999.
	 * The value then resets back to zero as the crank continues its rotation.
	 */
	getCrankPosition(): number;
	/**
	 * Returns two values, change and acceleratedChange.
	 * change represents the angle change (in degrees) of the crank since the last time this function (or the {@link playdate.cranked()} callback) was called.
	 * Negative values are anti-clockwise. acceleratedChange is change multiplied by a value that increases as the crank moves faster, similar to the way mouse acceleration works.
	 */
	getCrankChange(): LuaMultiReturn<[number, number]>;
	/**
	 * @returns Returns the number of "ticks" — whose frequency is defined by the value of @param ticksPerRevolution — the crank has turned through since the last time this function was called.
	 * 
	 * Tick boundaries are set at absolute positions along the crank’s rotation.
	 * Ticks can be positive or negative, depending upon the direction of rotation.
	 * 
	 * For example, say you have a movie player and you want your movie to advance 6 frames for every one revolution of the crank.
	 * Calling playdate.getCrankTicks(6) during each update will give you a return value of 1 as the crank turns past each 60 degree increment.
	 * (Since we passed in a 6, each tick represents 360 ÷ 6 = 60 degrees.)
	 * So getCrankTicks(6) will return a 1 as the crank turns past the 0 degree absolute position, the 60 degree absolute position, and so on for the 120, 180, 240, and 300 degree positions.
	 * Otherwise, 0 will be returned. (-1 will be returned if the crank moves past one of these mentioned positions while going in a backward direction.)
	 * 
	 * @remarks
	 * You must import `CoreLibs/crank` to use getCrankTicks(). 
	 */
	getCrankTicks(ticksPerRevolution: number): number;

	// Crank Callbacks
	/**
	 * This function, if defined, is called when the crank is docked.
	 */
	crankDocked(): void;
	/**
	 * This function, if defined, is called when the crank is undocked.
	 */
	crankUndocked(): void;
	/**
	 * True disables the default crank docking/undocking sound effects.
	 * False re-enables them. Useful if the crank sounds seem out-of-place in your game.
	 * 
	 * @remarks
	 * When your game terminates, crank sounds will automatically be re-enabled. 
	 */
	setCrankSoundsDisabled(disable: boolean): void;

	// 6.11 Input Handlers
	inputHandler: PlaydateInputHandler;
	/**
	 * The InputHandlers architecture allows you to push and pop a series of {@link playdate.inputHandler} objects, each capable of handling any or all button and crank interactions.
	 * New input is propagated down the stack until it finds the first responder (or drops it altogether), which allows for switching out control schemes and temporarily stealing focus.
	 * 
	 * You can define an inputHandler as in the sample below, implementing just as few or as many handler functions as you want.
	 */
	inputHandlers: PlaydateInputHandlers;
}