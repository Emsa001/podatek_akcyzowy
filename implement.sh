#!/bin/bash

# Configuration
USER="username"
HOST="host"
DOMAIN="domena"

REMOTE_DIR="domains/${DOMAIN}/public_html"

yarn install
yarn build
# Step 2: Send ./dist contents to server using sftp
sftp ${USER}@${HOST} <<EOF
cd ${REMOTE_DIR}
put -r ./dist/*
exit
EOF