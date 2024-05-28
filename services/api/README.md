### Server

#### dev

To run server in development mode run:

```bash
yarn dev
```

This will start `nodemon` that will listen for changes and automatically restart server after saving changes.

#### prod

To run server in production mode first run

```bash
yarn build
```

This will compile typescript files and create `index.js` in `dist` directory. Then run

```bash
yarn start
```
