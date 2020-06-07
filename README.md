# Joomla Blank Template

This is a blank baseline template for Joomla 3.x remote template development that comes prepackaged with SASS, Bootstrap, jQuery, Popper.js, browserSync, file transferring and uses Gulp as a task runner.

This template is meant for hybrid local-remote development.

## Installation

1. Click on "use this template" or clone repo
2. Once you have the repo, run `npm i` to install all the necessary packages
3. Run `npm run dev` for development (see below for further information)
4. Run `npm run build` to build and to generate a zip for easy installation (see below for further information)

## Config

In order for development mode to work, you must rename `auth.example.js` to `auth.js` and pollute it with your own FTP host, username, password, path and proxy. The proxy is used for browserSync, so it knows which site to echo.

## Development

The file structure is already predefined - if you wish to make edits, you have to also make changes in gulpfile.js in order for it to work.

Current development compilation process:

1. Copies over the assets from src/assets/ to dist/
2. Processes all the SASS files from sass/ and compiles it into a minified CSS bundle (bundle.min.css)
3. Gets minifed jQuery, Bootstrap and Popper files and adds your own minified scripts from js/ at the end
4. Transfers the files over to your designated host (config in auth.js)
5. Initializes browserSync and sets it to proxy the remote host, so it automatically reloads the page once files have been compiled and transferred

The development process is also set to watch for file changes and to compile and then upload them automatically to the designated remote site.

## Build

Build is very similar to the development compilation process, except there's no browserSync. Instead it zips the template so it can be installed through Joomla's extension manager.
