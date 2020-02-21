# REACT APP TEMPLATE

## Installation

Use npm or yarn in order to install everything.

```bash
npm i
```

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:8000`.

## Running tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/docs/en/getting-started).

If you want watch mode: `npm run test:watch`.

## Production server

Run `npm run start:prod` for a production server with node. Navigate to `http://localhost:8000`.

## Docker

build image
```docker
docker build -t react-app
```

run container
```
docker run -p 8000:8000 react-app
```
