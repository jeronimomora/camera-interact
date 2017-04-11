.PHONY: serve

BLUE=\033[0;34m
NOCOLOR=\033[0m

PORT?=8000

default: serve

serve:
	@echo "${BLUE}Starting local webserver at http://localhost:${PORT}/${NOCOLOR}."
	python3 -m http.server ${PORT}
