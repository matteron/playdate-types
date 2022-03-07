export type PlaydateMenuItem = {
	/**
	 * Sets the callback function for this menu item.
	 */
	setCallback: (callback: (this: void) => void) => void;
	/**
	 * Sets the title displayed for this menu item.
	 * The title for a menu item can also be set using dot syntax.
	 */
	setTitle: (newTitle: string) => void;
	/**
	 * Returns the title displayed for this menu item.
	 */
	getTitle: () => string;
	/**
	 * Sets the value for this menu item. The value is of a different type depending on the type of menu item:
	 * 
	 * - normal: integer
	 * - checkmark: boolean
	 * - options: string
	 * 
	 * Values for any menu type can also be set using integers.
	 * 
	 * The value for a menu item can also be set using dot syntax.
	 */
	setValue: (newValue: number | boolean | string) => void;
	/**
	 * Returns the value for this menu item.
	 */
	getValue: () => number | boolean | string;
}
type PlaydateAddMenuResult = LuaMultiReturn<[PlaydateMenuItem, string]>;

export type PlaydateMenu = {
	/**
	 * @param title - will be the title displayed by the menu item.
	 * When this menu item is selected, the OS will:
	 * 
	 * 1. Hide the System Menu.
	 * 2. Invoke your callback function.
	 * 3. Unpause your game and call {@link playdate.gameWillResume}.
	 * 
	 * @returns If the returned menuItem is nil, a second errorMessage return value will indicate the reason the operation failed.
	 */
	addMenuItem: (title: string, callback: (this: void) => void) => PlaydateAddMenuResult;
	/**
	 * Creates a new menu item that can be checked or unchecked by the player.
	 * 
	 * @param title - will be the title displayed by the menu item.
	 * 
	 * @param initialValue - can be set to true or false, indicating the checked state of the menu item. Optional, defaults to false.
	 * 
	 * If this menu item is interacted with while the system menu is open, callback will be called when the menu is closed, before {@link playdate.gameWillResume()} is called.
	 * 
	 * The callback function will be passed one argument, a boolean value, indicating the current value of the menu item.
	 * 
	 * @returns If the returned menuItem is nil, a second errorMessage return value will indicate the reason the operation failed.
	 */
	addCheckmarkMenuItem: (title: string, initialValue?: boolean, callback?: (this: void, checked: boolean) => void) => PlaydateAddMenuResult;
	/**
	 * Creates a menu item that allows the player to cycle through a set of options.
	 * @param title - will be the title displayed by the menu item.
	 * 
	 * @param options - should be an array-style table of strings representing the states the menu item can have. Due to limited horizontal space, the option strings and title should be kept short for this type of menu item.
	 * 
	 * @param initialValue - can optionally be set to any of the values in the options array.
	 * 
	 * If the value of this menu item is changed while the system menu is open, callback will be called when the menu is closed, before playdate.gameWillResume is called. The callback function will be passed one string argument indicating the currently selection option.
	 * 
	 * @returns If the returned menuItem is nil, a second errorMessage return value will indicate the reason the operation failed.
	 */
	addOptionsMenuItem: (title: string, options: string[], initialValue?: string, callback?: (this: void, option: string) => void) => PlaydateAddMenuResult;
	/**
	 * Removes the playdate.menuItem from the menu.
	 */
	removeMenuItem: (menuItem: PlaydateMenuItem) => void;
	/**
	 * Removes all menu items from the menu.
	 */
	removeAllMenuItems: () => void;
}

/** @noSelf */
export interface PlaydateCoreMenus {
	// 6.5 Interacting with the System Menu
	/**
	 * Returns a playdate.menu object. Use this to add your custom menu items.
	 */
	getSystemMenu: () => PlaydateMenu;
	menu: PlaydateMenu;
	menuItem: PlaydateMenuItem;
	// TODO: image type
	/**
	 * While the game is paused it can optionally provide an image to be displayed alongside the System Menu. Use this function to set that image.
	 * 
	 * @param image - should be a 400 x 240 pixel {@link playdate.graphics.image}.
	 * All important content should be in the left half of the image in an area 200 pixels wide, as the menu will obscure the rest.
	 * The right side of the image will be visible briefly as the menu animates in and out.
	 * 
	 * @param xOffset - Optionally, can be provided which must be a number between 0 and 200 and will cause the menu image to animate to a position offset left by xOffset pixels as the menu is animated in.
	 * 
	 * To remove a previously-set menu image, pass nil for the image argument.
	 */
	setMenuImage: (image: any, xOffset?: number) => void;
}