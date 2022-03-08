import { PlaydateTimeTable } from "./playdate-time";

/**
 * @noSelf
 * If you’re looking for a simple way to save data, the Datastore APIs allow easy serialization of Lua tables and images.
 */
declare interface PlaydateDatastore {
	/**
	 * Encodes the given table into the named file.
	 * (The .json extension should be omitted from the file name.)
	 * The default file name is "data".
	 * If pretty-print is true, the JSON will be nicely formatted.
	 */
	write(table: LuaTable, fileName?: string, prettyPrint?: boolean): void;
	/**
	 * Returns a table instantiated with the data in the JSON-encoded file you specify.
	 * (The .json extension should be omitted.)
	 * The default file name is "data".
	 * If no file is found, this function returns nil.
	 */
	read(fileName?: string): LuaTable
	/**
	 * Deletes the specified datastore file.
	 * The default file name is "data".
	 * Returns false if the datastore file could not be deleted.
	 */
	delete(fileName?: string): boolean;
	// TODO: Image type
	/**
	 * Saves a {@link playdate.graphics.image} to a file.
	 * If path doesn’t contain a folder name, the image is stored in a folder named "images".
	 * 
	 * By default, this method writes out a PDI file, a custom image format used by Playdate that can be read back in using {@link playdate.datastore.readImage()}.
	 * If you want to write out a GIF file, append a .gif extension to your path.
	 * 
	 * @remarks
	 * Because `writeImage()` doesn’t currently support GIF transparency,
	 * if you attempt to write a GIF from an image buffer you instantiated,
	 * you must call {@link playdate.graphics.image.new( width, height, bgcolor )} with bgcolor set to {@link playdate.graphics.kColorWhite} or {@link playdate.graphics.kColorBlack},
	 * otherwise your image will render improperly to the file. 
	 */
	writeImage(image: LuaTable, path: string): void;
	// TODO: Image type
	/**
	 * Reads a {@link playdate.graphics.image} from a file in the data folder.
	 * If path doesn’t contain a folder name, the image is searched for in a folder named "images".
	 * 
	 * @remarks
	 * `readImage()` can only load compiled pdi files.
	 * ({@link playdate.datastore.writeImage()} by default creates compiled pdi files.) 
	 */
	readImage(path: string): LuaTable;
}

declare interface PlaydateFile {
	/**
	 * Closes the file.
	 */
	close(): void;
	/**
	 * Writes the given string to the file and returns the number of bytes written if successful, or 0 and a second return value describing the error.
	 * If you wish to include line termination characters (\n, \r), please include them in the string.
	 */
	write(value: string): LuaMultiReturn<[number, string]>;
	/**
	 * Flushes any buffered data written to the file to the disk.
	 */
	flush(): void;
	/**
	 * Returns the next line of the file, delimited by either \n or \r\n.
	 * The returned string does not include newline characters.
	 */
	readline(): string;
	/**
	 * Returns a buffer containing up to numberOfBytes bytes from the file, and the number of bytes read.
	 * If the read failed, the function returns nil and a second value describing the error.
	 */
	read(numberOfBytes: number): LuaMultiReturn<[string | null, string]>;
	/**
	 * Sets the file read/write position to the given byte offset.
	 */
	seek(offset: number): void;
	/**
	 * Returns the current byte offset of the read/write position in the file.
	 */
	tell(): number;
}

declare type PlaydateFileModeNames = 'Read' | 'Write' | 'Append';
declare type PlaydateFileConstantName<T extends PlaydateFileModeNames> = `kFile${T}`;
declare type PlaydateFileConstantNames = PlaydateFileConstantName<PlaydateFileModeNames>;
declare type PlaydateFileConstantValues<T extends PlaydateFileConstantNames> =
	T extends PlaydateFileConstantName<'Read'> ? 3 :
	T extends PlaydateFileConstantName<'Write'> ? 4 :
	T extends PlaydateFileConstantName<'Append'> ? 8 :
	never
;
declare type PlaydateFileConstants = {
	[key in PlaydateFileConstantNames]: PlaydateFileConstantValues<key>
}

/**
 * @noSelf
 * 
 * The playdate.file module contains functions which allow you to interact with files on Playdate’s filesystem.
 * It contains the playdate.file.file submodule for interacting with an opened file.
 * 
 * @remarks
 * About the Playdate filesystem
 * 
 * Behind the scenes, there are two directories your game has access to: the root of your app bundle (read-only), and a Data directory unique to your game (readable and writeable) where you can store your game’s saved state or other data.
 * 
 * From your game’s perspective, these two locations are treated as one.
 * If you attempt to read a file, the Playdate OS will first look for the file in the Data directory, then look in the app bundle.
 * If you attempt to create or append to a file, this file will be created in your game’s Data directory.
 * Calling {@link playdate.file.listFiles()} returns a list of files and directories at the root of both your app bundle and your game’s Data directory.
 * 
 * You are not permitted access to files outside of these two directories.
 */
declare interface PlaydateFileModule extends PlaydateFileConstants {
	file: PlaydateFile;
	/**
	 * Returns a {@link playdate.file.file} corresponding to the opened file.
	 * @param mode - should be one of the following:
	 * - {@link playdate.file.kFileRead}: the file is opened for reading; the system first looks in the /Data/<bundleid> folder for the given file, then in the game’s pdx folder if it isn’t found
	 * - {@link playdate.file.kFileWrite}: the file is created if it doesn’t exist, truncated to zero length if it does, then opened for writing
	 * - {@link playdate.file.kFileAppend}: the file is created if it doesn’t exist, opened for writing, with new data written to the end of the file
	 * 
	 * If mode is not specified, the default is playdate.file.kFileRead.
	 * 
	 * If the file couldn’t be opened, a second return value indicates the error.
	 */
	open(path: string, mode?: PlaydateFileConstantValues<PlaydateFileConstantNames>): LuaMultiReturn<[PlaydateFile, string]>;
	/**
	 * Returns an array containing the file names in the given directory path as strings.
	 * Folders are indicated by a slash / at the end of the filename.
	 * 
	 * Call with no argument to get a list of all files and folders your game has access to.
	 * (For a game with default access permissions, listFiles(), listFiles("/"), and listFiles(".") should all return the same result.)
	 */
	listFiles(path?: string): string[];
	/**
	 * Returns true if a file exists at the given path.
	 */
	exists(path: string): boolean;
	/**
	 * Returns true if a directory exists at the given path.
	 */
	isdir(path: string): boolean;
	// TODO: determine what this returns if anything
	/**
	 * Creates a directory at the given path, under the /Data/<bundleid> folder.
	 * 
	 * playdate.file.mkdir() will create all intermediate directories, if a succession of directories ("testdir/testdir/testdir/") is specified in path.
	 */
	mkdir(path: string): void;
	/**
	 * Deletes the file at the given path. Returns true if successful, else false.
	 * 
	 * If recursive is true, this function will delete the directory at path and its contents, otherwise the directory must be empty to be deleted.
	 */
	delete(path: string, recursive?: boolean): boolean;
	/**
	 * Returns the size of the file at the given path.
	 */
	getSize(path: string): number;
	// TODO: determine output format
	/**
	 * Returns the type of the file at the given path.
	 */
	getType(path: string): string;
	/**
	 * Returns the modification date/time of the file at the given path, as a {@link PlaydateTimeTable}
	 */
	modtime(path: string): PlaydateTimeTable;
	/**
	 * Renames the file at path, if it exists, to the value of newPath. This can result in the file being moved to a new directory, but directories will not be created. Returns true if the operation was successful.
	 */
	rename(path: string, newPath: string): boolean;
	// TODO: strong definition for return value
	/**
	 * Loads the compiled .pdz file at the given location and returns the contents as a function.
	 * The .pdz extension on path is optional.
	 * 
	 * env, if specified, is a table to use as the function’s global namespace instead of _G.
	 */
	load(path: string, env?: LuaTable): Function;
	/**
	 * Runs the pdz file at the given location.
	 * Equivalent to {@link playdate.file.load}(path, env)().
	 * 
	 * The .pdz extension on path is optional. Values returned from the pdz file are left on the stack.
	 * 
	 * env, if specified, is a table to use as the function’s global namespace instead of _G.
	 */
	run(path: string, env?: LuaTable): void;
}

/** @noSelf */
export declare interface PlaydateCoreFiles {
	// 6.18 Files
	datastore: PlaydateDatastore;
	file: PlaydateFileModule;
}