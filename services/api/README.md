### Server

#### dev

To run server in development via docker, update `DATABASE_URL` variable in docker-compose.yml file.

Then mode run:

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

## Prisma

#### Generate client

Prisma is used as ORM for database. To generate prisma client run:

```bash
yarn prisma:generate
```

By executing this command, you will update current prisma client with new schema changes.

#### Update database

To update current database schema push your changes via prisma by running:

```bash
yarn prisma:push
```

Or create migration from docker container by running:

```bash
docker exec -it api.service npx prisma migrate dev --name <name>
```