# hackaru-web

The web server for Hackaru.  
An open source and simple time tracking app.

[![Maintainability](https://api.codeclimate.com/v1/badges/f3acee4ccf10e43f8cd7/maintainability)](https://codeclimate.com/github/hackaru-app/hackaru-web/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f3acee4ccf10e43f8cd7/test_coverage)](https://codeclimate.com/github/hackaru-app/hackaru-web/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Features

Want to know that you can do with Hackaru?  
For more information on the app, please see the main repository [README](https://github.com/hackaru-app/hackaru).

## Roles

The web server provides the UI to a browser.  
It also sends user actions to the API server via REST API.

## Feedback

Do you find a bug or would like to submit feature requests?  
Please let us know via [Issues](https://github.com/hackaru-app/hackaru/issues). 😉

## Quickstart

You can run Hackaru on your local easily using [docker-compose](https://docs.docker.com/compose/install).

It's also necessary to run the web server if you want to login to Hackaru on your browser.  
Please see the API server [README](https://github.com/hackaru-app/hackaru-api).

```sh
# Clone this repository.
git clone git@github.com:hackaru-app/hackaru-web.git
cd hackaru-web

# Copy and rename env file.
cp .env.sample .env.development

# Try accessing http://localhost:3333 after execution.
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## License

- [MIT](./LICENSE)
