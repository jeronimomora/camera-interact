.PHONY: serve

BLUE=\033[0;34m
NOCOLOR=\033[0m

PORT?=8080

default: serve

serve:
	@echo "${BLUE}Starting local webserver at http://localhost:${PORT}/${NOCOLOR}."
	yarn start

build:
	@echo "${BLUE}Building page, results in dist/${NOCOLOR}."
	yarn build

prettify:
	prettier --single-quote --trailing-comma es5 --write src/index.js
