# Postgres

PostgreSQL database for general CRUD operations

## Running

To start container, run in the `services` directory

```bash
docker compose up
```

## Dev notes
Currently, our database doesn't persistence data (for dev purposes). Hence, to reset the state of the database, run:

```bash
docker compose down
docker compose up
```

To setup data persistence, uncomment this line (under the `postgres/volumes` section):

```yaml
- postgres-db-volume:/var/lib/postgresql/data
```

Setup scripts are placed in `services/postgres/setup.*` directory.