#!/usr/bin/env sh
# Start Mii Creator locally. Extra flags are passed through, e.g. ./start.sh --watch
cd "$(dirname "$0")" || exit 1
command -v node >/dev/null 2>&1 || { echo "Node.js 18+ is required: https://nodejs.org"; exit 1; }
exec node server.js "$@"
