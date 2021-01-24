# hackaru-web
A web server for Hackaru, an open source and simple time tracking app.

[![Maintainability](https://api.codeclimate.com/v1/badges/f3acee4ccf10e43f8cd7/maintainability)](https://codeclimate.com/github/hackaru-app/hackaru-web/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f3acee4ccf10e43f8cd7/test_coverage)](https://codeclimate.com/github/hackaru-app/hackaru-web/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Features
Want to know that you can do with Hackaru? For more information on the app, please see the main repository [README](https://github.com/hackaru-app/hackaru).　

## Roles

- The role of the web server is to provide a user-friendly interface.
- Web server does not change the user's data directly. it is the role of the API server.
- The web server and API server communicate via RESTful.

## Feedback

If you find a bug or would like to submit feature requests, please let us know via [Issues](https://github.com/hackaru-app/hackaru/issues). 😉

## Running locally

You can run Hackaru on your local easily using [Docker](https://www.docker.com).

1. Install [docker-compose](https://docs.docker.com/compose/install).

2. Clone the repository. 
```sh
git clone git@github.com:hackaru-app/hackaru-web.git
cd hackaru-web
```
3. Copy `.env.sample` with the name `.env.development`. Basically, There is no need to modify the contents of the file.

```sh
cp .env.sample .env.development
```

4. Start the container using docker-compose command.

```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

5. That's all! Try accessing [http://localhost:3333](http://localhost:3333) in your browser. 🎉

If you want to login to Hackaru locally, It is also necessary to run the API server, see the API server [README](https://github.com/hackaru-app/hackaru-api).

## License
- [MIT](./LICENSE)
