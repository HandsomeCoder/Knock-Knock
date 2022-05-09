#!/bin/bash
nohup docker-entrypoint.sh postgres > database-output.log &
sleep 10s
npm run -prefix server seed
npm run --prefix server deploy