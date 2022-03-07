
/** @noSelf */
export interface PlaydateCoreSystem {
	// 6.2 System and Game Metadata
	/**
	 * Returns two values, the current API version of the Playdate runtime and the minimum API version supported by the runtime.
	 */
	apiVersion: () => LuaMultiReturn<[string, string]>;
	/**
	 * The playdate.metadata table contains the values in the current game’s pdxinfo file, keyed by variable name.
	 * To retrieve the version number of the game, for example, you would use playdate.metadata.version.
	 * 
	 * Changing values in this table at run time has no effect.
	 */
	metadata: () => LuaTable;

	// 6.6 Localization
	// TODO: language constants
	/**
	 * Returns the current language of the system, which will be one of the constants
	 * {@link playdate.graphics.font.kLanguageEnglish} or {@link playdate.graphics.font.kLanguageJapanese}.
	 */
	getSystemLanguage: () => string;

	// 6.12 Device Auto Lock
	/**
	 * True disables the 60-second auto-lock feature.
	 * False re-enables it and resets the timer back to 60 seconds.
	 * 
	 * @remarks
	 * Auto-lock will automatically be re-enabled when your game terminates. 
	 * 
	 * If disabling auto-lock, developers should look for opportunities to re-enable auto-lock when appropriate.
	 * (For example, if your game is an MP3 audio player, auto-lock could be re-enabled when the user pauses the audio.) 
	 */
	setAutoLockDisabled: (disable: boolean) => void;
}