# gymU

Gym progress tracking mobile app

## Repo structure

- `common` - common JavaScript/TypeScript utils, methods, types
- `services` contains all backend-side services:
  - `analyze` - recommendation system microservice (written in Python)
  - `api` - REST API Server (written in TypeScript + ExpressJS)
  - `postgres` - PostgreSQL database server (Dockerfile, schemas, scripts etc.)
- `client` contains all RN Expo App structure:
  - `app` - main app code
  - `assets` - images, fonts etc.
  - `components` - reusable components
  - `constants` - app constants
  - `hooks` - custom hooks
  - `scripts` - scripts for app
  - `types` - app types
  - `utils` - app utils
