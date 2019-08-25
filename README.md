[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![Build Status](https://travis-ci.org/ktmouk/hackaru-web.svg?branch=master)](https://travis-ci.org/ktmouk/hackaru-web)
[![Maintainability](https://api.codeclimate.com/v1/badges/fd01121360a3fd652411/maintainability)](https://codeclimate.com/github/ktmouk/hackaru-web/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fd01121360a3fd652411/test_coverage)](https://codeclimate.com/github/ktmouk/hackaru-web/test_coverage)

Send HTML/CSS/JS to browser, and fetch JSON from API server on a background.

## Usage

See [ktmouk/hackaru](https://github.com/ktmouk/hackaru)

## Contributing
1. Install [docker-compose](https://docs.docker.com/compose/install/).
1. [Fork](https://github.com/ktmouk/hackaru-web/fork) and clone this repository.
1. Check out new branch. `git checkout -b new-feature`
1. Start API server. See [ktmouk/hackaru-api](https://github.com/ktmouk/hackaru-api).
1. Start dev server. `docker-compose -f docker-compose.yml -f docker-compose.dev.yml`
1. Improve codes.
1. Run linter and test. `yarn lint . && yarn test`
1. Push branch. `git push origin new-feature`
1. Create a new pull request.

## License

- [MIT](./LICENSE)
