// Orta explains where external types come from

/**
 * In the video Orta explained that there are 4 ways of where types can come from into your project.
 *
 * 1: First one is the javascript language based types. Like ES2015 features are typed in an es2015.d.ts file. If your project uses a
 * newer javascript version, then the typescript file for that version is used WITH all the other versions together.
 *
 * 2: The second one is the dom.d.ts file, which is the typescript file for the browser. It contains all the types for the DOM.
 *
 * 3: The third one is the definitely typed files. For example react developers use JavaScript and contributors are creating types for
 * those javascript files. So basically definitely types come from files that type and existing javascript application.
 *
 * 4: The fourth one are all the libraries that are already implemented in typescript, but they provide their own d.ts files, to make it
 * publicly available.
 */

export {};
