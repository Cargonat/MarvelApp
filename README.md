# Marvel App

This is a project for me to learn [React Native](https://reactnative.dev/).
It is using [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) and [TypeScript](https://www.typescriptlang.org/).

The goal is to build an app for viewing Marvel characters.
These will be provided by the [Marvel API](https://developer.marvel.com/documentation/getting_started).

## Set-Up
### Marvel API Keys
Create a file `apiconfig.json` at the same level as this `README.md` containing your public and private keys for the Marvel API.
You can find these key in your Marvel Developer Account page: (https://developer.marvel.com/account).

Format `apiconfig.json` like this:
```json
{"privateKey": "YOUR_PRIVATE_KEY", "publicKey": "YOUR_PUBLIC_KEY"}
````

### NPM
Run `npm install` once to download all dependencies.

## Start-up
Start the local server with `npm start`. From there, connect via the [Expo Go](https://expo.dev/client) apps.
