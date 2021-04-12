# hackaru-web
The web server for Hackaru, an open source and simple time tracking app.

[![Maintainability](https://api.codeclimate.com/v1/badges/f3acee4ccf10e43f8cd7/maintainability)](https://codeclimate.com/github/hackaru-app/hackaru-web/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f3acee4ccf10e43f8cd7/test_coverage)](https://codeclimate.com/github/hackaru-app/hackaru-web/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Features
Want to know that you can do with Hackaru? For more information on the app, please see the main repository [README](https://github.com/hackaru-app/hackaru).　

## Roles
Web server provides the UI to a browser, and send user actions to the API server via RESTful.

## Feedback

If you find a bug or would like to submit feature requests, please let us know via [Issues](https://github.com/hackaru-app/hackaru/issues). 😉

## Running locally

You can run Hackaru on your local easily using [docker-compose](https://docs.docker.com/compose/install).  

If you want to login to Hackaru on your local, it is also necessary to run the API server. Please see the [README](https://github.com/hackaru-app/hackaru-api).

```sh
# Clone this repository.
git clone git@github.com:hackaru-app/hackaru-web.git
cd hackaru-web

# Basically, There is no need to modify the content of file.
cp .env.sample .env.development

# Try accessing http://localhost:3333 after execution.
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```
## License
- [MIT](./LICENSE)
