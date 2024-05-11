

# gymU
Gym progress tracking mobile app

## Repo structure

- `services` contains all backend-side services:
    - `analyze` - recommendation system microservice (written in Python)
    - `api` - REST API Server (written in TypeScript + ExpressJS)
    - `postgres` - PostgreSQL database server (Dockerfile, schemas, scripts etc.)
- `clients` contains all clients:
    - `mobile` - main app (written in React Native)
    <!-- - `web` - TODO -->
    <!-- - `wearos` - TODO -->