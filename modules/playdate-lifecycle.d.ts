
/** @noSelf */
export interface PlaydateCoreLifecycles {
	// 6.3 Game flow
	/**
	 * Implement this callback and Playdate OS will call it once per frame.
	 * This is the place to put the main update-and-draw code for your game.
	 * Playdate will attempt to call this function by default 30 times per second;
	 * that value can be changed by calling {@link playdate.display.setRefreshRate()}.
	 * 
	 * @remarks
	 * 
	 * If your update() function takes too long to execute, Playdate OS may not be able to call it as often as specified by the current refresh rate.
	 * In this case, Playdate OS will simply try and call it as often as it can, with a not-to-exceed rate of {@link playdate.display.getRefreshRate()} frames per second. 
	 */
	update: () => void;
	/**
	 * Suspends callbacks to {@link playdate.update()} for the specified number of milliseconds.
	 * 
	 * @remarks
	 * playdate.wait() is ideal for pausing game execution to, for example, show a message to the player.
	 * Because {@link playdate.update()} will not be called, the screen will freeze during .wait().
	 * Audio will continue to play. Animation during this wait period is possible,
	 * but you will need to explicitly call {@link playdate.display.flush()} once per frame. 
	 * 
	 * While timers should pause during playdate.wait()
	 * (assuming {@link playdate.timer.updateTimers()} and {@link playdate.frameTimer.updateTimers()}
	 * are invoked during {@link playdate.update()}), animators will not pause during {@link playdate.wait()}.
	 * Be sure to account for this in your code. 
	 */
	wait: (milliseconds: number) => void;
	/**
	 * Stops per-frame callbacks to {@link playdate.update()}.
	 * Useful in conjunction with {@link playdate.display.flush()} if your program only does things in response to button presses.
	 */
	stop: () => void;
	/**
	 * Resumes per-frame callbacks to {@link playdate.update()}.
	 */
	start: () => void;

	// 6.4 Game Lifecycle
	/**
	 * Called when the player chooses to exit the game via the System Menu or Menu button.
	 */
	gameWillTerminate: () => void;
	/**
	 * Called before the device goes to low-power sleep mode because of a low battery.
	 * 
	 * @remarks
	 * If your game saves its state, {@link playdate.gameWillTerminate()} and {@link playdate.deviceWillSleep()} are good opportunities to do it. 
	 */
	deviceWillSleep: () => void;
	/**
	 * If your game is running on the Playdate when the device is locked, this function will be called.
	 * Implementing this function allows your game to take special action when the Playdate is locked, e.g., saving state.
	 */
	deviceWillLock: () => void;
	/**
	 * If your game is running on the Playdate when the device is unlocked, this function will be called.
	 */
	deviceDidUnlock: () => void;
	/**
	 * Called before the system pauses the game.
	 * (In the current version of Playdate OS, this only happens when the device’s Menu button is pushed.)
	 * Implementing these functions allows your game to take special action when it is paused, e.g., updating the {@link playdate.setMenuImage menu image}.
	 */
	gameWillPause: () => void;
	/**
	 * Called before the system resumes the game.
	 */
	gameWillResume: () => void;
}