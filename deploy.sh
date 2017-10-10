#!/bin/bash

set -e

source ~/.bash_profile

nvm use
npm prune
npm install
rm -Rf staticSite/dist
npm run build

aws s3 sync staticSite/dist s3://yagni.digital --delete
