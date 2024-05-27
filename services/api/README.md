## Server

### dev

To run server in development mode run `yarn dev`. This will start `nodemon` that will listen for changes and automatically restart server after saving changes.

### prod

To run server in production mode first run `yarn build`. This will compile typescript files and create `index.js` in `dist` folder. Then run `yarn start` command.
