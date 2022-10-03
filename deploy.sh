#!/bin/bash

# abort on errors
set -e

# if first time
yarn

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
if [ ! -d ".git" ]; then
    git init
fi

git checkout -B gh-pages
git add -A
git commit -m "Розгортання $(date +"%T %D")"

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:nazar1ua/vue-schedule.git gh-pages:gh-pages

cd ..
rm -rf dist
