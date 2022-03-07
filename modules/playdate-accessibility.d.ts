/** @noSelf */
export interface PlaydateCoreAccessibility {
	// 6.7 Accessibility
	/**
	 * Returns true if the user has checked the "Reduce Flashing" option in Playdate Settings; false otherwise.
	 * Games should read this value and, if true, avoid visuals that could be problematic for people with sensitivities to flashing lights or patterns.
	 */
	getReduceFlashing: () => boolean;
	/**
	 * Returns true if the user has checked the "Upside Down" option in Playdate Settings; false otherwise.
	 * (Upside Down mode can be convenient for players wanting to hold Playdate upside-down so they can use their left hand to operate the crank.)
	 * 
	 * Typically your game doesn’t need to anything in regards to this setting.
	 * But it is available in case your game wants to take some special actions, display special instructions, etc.
	 * 
	 * @remarks
	 * Reported d-pad directions are flipped when in Upside Down mode — RIGHT will be reported as LEFT, UP as DOWN, etc. — so that the d-pad will make sense to a user holding Playdate upside-down.
	 * However, the A and B buttons — since they are still labeled as "A" and "B" — retain their normal meanings and will be reported as usual. 
	 */
	getFlipped: () => boolean;
}