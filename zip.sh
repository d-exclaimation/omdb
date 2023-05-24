#!/bin/bash

# Remove old zip
if [ ! -f "vno16.zip" ]; then
    rm vno16.zip
fi
if [ ! -d "vno16" ]; then
    rm -rf vno16
fi
mkdir vno16

# Copy files
cp -r src vno16/src
cp -r public vno16/public
cp package.json vno16/package.json
cp package-lock.json vno16/package-lock.json
cp .env vno16/.env
cp index.html vno16/index.html
cp postcss.config.js vno16/postcss.config.js
cp tailwind.config.js vno16/tailwind.config.js
cp tsconfig.json vno16/tsconfig.json
cp tsconfig.node.json vno16/tsconfig.node.json
cp vite.config.ts vno16/vite.config.ts
cp .gitignore vno16/.gitignore
cp README.md vno16/README.md
cp omdb.png vno16/omdb.png

# Zip
zip -r vno16.zip vno16

# Remove temp
rm -rf vno16