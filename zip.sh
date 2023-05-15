#!/bin/bash

# Remove old zip
if [ ! -f "seng365-assignment2-omdb-vno16.zip" ]; then
    rm seng365-assignment2-omdb-vno16.zip
fi
if [ ! -d "temp" ]; then
    rm -rf temp
fi
mkdir temp

# Copy files
cp -r src temp/src
cp -r public temp/public
cp package.json temp/package.json
cp package-lock.json temp/package-lock.json
cp .env temp/.env
cp index.html temp/index.html
cp postcss.config.js temp/postcss.config.js
cp tailwind.config.js temp/tailwind.config.js
cp tsconfig.json temp/tsconfig.json
cp tsconfig.node.json temp/tsconfig.node.json
cp vite.config.ts temp/vite.config.ts
cp .gitignore temp/.gitignore

# Zip
cd temp
zip -r ../seng365-assignment2-omdb-vno16.zip *
cd ..

# Remove temp
rm -rf temp