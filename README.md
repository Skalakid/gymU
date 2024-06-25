<a name="readme-top"></a>

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Skalakid/gymU">
    <img src="images/logo.svg" alt="Logo" width="300" height="150">
  </a>
   
  <p align="center">
    <br />
    Gym progress tracking system
    <br />
    <a href="https://www.overleaf.com/read/njznymmxghsv#770b55"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://gymu.atlassian.net/jira/software/projects/GU/boards/1/backlog?epics=visible">Jira board</a>
    ·
    <a href="https://www.figma.com/design/1VRWq4zbpMFOlgJFXLH1eG/GymU?node-id=0-1&t=G04OeyczCDuW4lVM-0">Designs</a>

  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

This project aims to create a sophisticated gym progress and habit tracking app. Users can plan workouts, form habits, and share personalized plans easily due to the exercise recommendation system. They can also monitor real-time instructions through "live training mode," adjust exercise intensity based on past achievements, and view their gym statistics. The app, designed for iOS and Android, will also use notifications to keep users motivated. Technologically, it'll rely on React Native, Node.js with Express, and a PostgreSQL database.

<!-- GETTING STARTED -->

## Getting Started

### Services

For detailed information about particular services see:

- [Postgres](services/postgres/README.md)
- [Api](services/api/README.md)
- [Analyze](services/analyze/README.md)
- To be added...

#### Requirements

All services are contenerized using docker, so you need to install [Docker Engine](https://docs.docker.com/engine/install/). If everything is okay, type the command below to get currently installed Docker version

```bash
docker version
```

#### Setup

##### Development mode

###### Via `yarn workspaces`

To run backend services in dev mode, in the main directory run:

```bash
yarn services:dev:run
```

or in detached mode:

```bash
yarn services:dev:run -d
```

###### Manually

To run backend services in `dev` mode, go to the `services` directory and run command:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up  --build
```

or if you want to run services in background:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up  --build -d
```

##### Production mode

###### Via `yarn workspaces`

To run backend services in prod mode, in the main directory run:

```bash
yarn services:prod:run
```

or in detached mode:

```bash
yarn services:prod:run -d
```

###### Manually

To run backend services in `prod` mode, go to the `services` directory and run command:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up  --build
```

or if you want to run services in background:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up  --build -d
```

#### Shutting down

To shutdown and remove the containers of all services, in the main directory run:

```bash
yarn services:down
```
or manually, in the `services` directory:

```bash
docker compose down
```

### Client

> [!IMPORTANT]  
> If you're using VScode make sure that you have installed [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.


To start working with client app, go to the `client` directory and run:

```bash
yarn install
```

To run the app in development mode, run:

```bash
yarn start
```

and choose the platform you want to run the app on. Press `a` to run the app on Android emulator or `i` to run the app on iOS emulator.

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

<!-- ROADMAP -->

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

## Roadmap

#### May

- Application, server and database configuration
- Preparation of application designs in Figma
- Ability to register and log into the system
- Adding new exercises
- Listing of available exercises
- Basic creation of training plans from exercises available in the application, ability to search for exercises by name + pagination
- User profile, ability to log out of the application and view user information
- Basic settings of the application, changing the application theme, language (Polish, English)

#### June

- Calendar, training planning - the ability to view the calendar and scheduled events for specific days. When you press a particular day, under the calendar you can see information about the training that has been planned for that day
- Live training mode - the ability to select the workout you created and turn it on in live mode. In each step you should see:
  the name and description of the current exercise,
  buttons for changing the exercise (next and previous)
- A button to edit the planned load or number of repetitions
  After completing the entire workout, a summary with basic workout information should be shown.
- Basic statistics - the ability to view the current state of progress in the form of summarized graphs. Ability to add measurements and analyze them. Initial progress prediction functionality.
- Notifications - these will be notifications regarding upcoming workouts, reminding you to exercise.
- Onboarding flow, taking weight, height and body part measurements.
- Basic exercise recommendation system for training plan. At this stage, it will suggest exercises based on selected muscle parts

See the [Jira backlog](https://gymu.atlassian.net/jira/software/projects/GU/boards/1/backlog?epics=visible) for a full roadmap.

<!-- LICENSE -->

## License

All Rights Reserved. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Authors

<table>
    <tr>
        <td>
            <a href="https://github.com/Skalakid">
                <img src="https://avatars.githubusercontent.com/u/39538890?v=4" alt="Logo" width="80" height="80">
            </a>
        </td>
        <td>
            <a href="https://github.com/xramzesx">
                <img src="https://avatars.githubusercontent.com/u/46059547?v=4" alt="Logo" width="80" height="80">
            </a>
        </td>
        <td>
            <a href="https://github.com/m-bert">
                <img src="https://avatars.githubusercontent.com/u/63123542?v=4" alt="Logo" width="80" height="80">
            </a>
        </td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Skalakid">@Skalakid</a></td>
        <td align="center"><a href="https://github.com/xramzesx">@xramzesx</a></td>
        <td align="center"><a href="https://github.com/m-bert">@m-bert</a></td>
    </tr>

</table>
