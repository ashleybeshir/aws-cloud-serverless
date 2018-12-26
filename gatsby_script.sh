#!/bin/bash
git clone https://github.com/ashleybeshir/React-website.git
cd React-website
npm install
gatsby build
node deploy-githubpages.js $1