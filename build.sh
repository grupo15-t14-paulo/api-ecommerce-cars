// build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn build
yarn run typeorm migration:run -d ./src/data-source
