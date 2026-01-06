### New Issue Checklist

- [Link of the issue](https://github.com/parse-community/parse-server/issues/10006).

### Issue Description

When using **Parse JavaScript SDK in a React Native (Expo) project**, the app fails to start due to an incompatible Node.js dependency.

Parse imports the `ws` package internally, which in turn requires the Node standard library module **`stream`**. However, the **React Native runtime does not include Node standard libraries**, causing the build to fail.

This error occurs when importing:

```ts
// app/_layout.tsx
import "parse/react-native";

Parse.initialize('my-parse-id', 'xxx');
Parse.serverURL = 'http://localhost:8080/parse';
```
### Steps to reproduce
1. Clone the repository:  
   `git clone https://github.com/tiavina-mika/react-native-parse-server-issue`

2. Install dependencies:  
   `npm install`

3. Start the Expo development server:  
   `npm start`

4. Choose **Android** or scan the QR code and open the app using **Expo Go** on a physical device.

5. Observe the error:
   - An error appears in the terminal/console
   - The same error is shown in Expo Go

### Actual Outcome
The app fails to start. The following error is shown in the terminal and in Expo Go:
`The package at "node_modules/parse/node_modules/ws/lib/receiver.js" attempted to import the Node standard library module "stream".`

### Expected Outcome
The app should start normally in Expo Go without errors.  

Specifically:
- Importing `parse/react-native` should not cause any runtime errors.
- The Expo app should load successfully on the device or emulator.
- Parse SDK features, including WebSocket / LiveQuery, should work as intended.

### Environment
<!-- Be specific with versions, don't use "latest" or semver ranges like "~x.y.z" or "^x.y.z". -->

Server
- Parse Server version: `8.2.5`
- Operating system: `Windows 11`
- Local or remote host (AWS, Azure, Google Cloud, Heroku, Digital Ocean, etc): `Local`

Database
- System (MongoDB or Postgres): `MongoDB `
- Local or remote host (MongoDB Atlas, mLab, AWS, Azure, Google Cloud, etc): `MongoDB Atlas`

Client
- SDK (iOS, Android, JavaScript, PHP, Unity, etc): `JavaScript`
- SDK version: `8.0.0`  and `7.0.2`

### Logs
```ts
The package at "node_modules\parse\node_modules\ws\lib\receiver.js" attempted to import the Node standard library module "stream".
It failed because the native React runtime does not include the Node standard library.
Learn more: https://docs.expo.dev/workflow/using-libraries/#using-third-party-libraries
  1 | 'use strict';
  2 |
> 3 | const { Writable } = require('stream');
    |                               ^
  4 |
  5 | const PerMessageDeflate = require('./permessage-deflate');
  6 | const {

Import stack:

 node_modules\parse\node_modules\ws\lib\receiver.js
 | import "stream"

 node_modules\parse\node_modules\ws\index.js
 | import "./lib/receiver"

 node_modules\parse\lib\react-native\WebSocketController.js
 | import "ws"

 node_modules\parse\lib\react-native\Parse.js
 | import "./WebSocketController"

 node_modules\parse\react-native.js
 | import "./lib/react-native/Parse.js"

 app\_layout.tsx
 | import "parse/react-native"

 app (require.context)

› Stopped server
```
