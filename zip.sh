#!/bin/bash

# Remove old zip
if [ ! -f "seng365-assignment2-omdb-vno16.zip" ]; then
    rm seng365-assignment2-omdb-vno16.zip
fi
if [ ! -d "seng365-assignment2-omdb-vno16" ]; then
    rm -rf seng365-assignment2-omdb-vno16
fi
mkdir seng365-assignment2-omdb-vno16

# Copy files
cp -r src seng365-assignment2-omdb-vno16/src
cp -r public seng365-assignment2-omdb-vno16/public
cp package.json seng365-assignment2-omdb-vno16/package.json
cp package-lock.json seng365-assignment2-omdb-vno16/package-lock.json
cp .env seng365-assignment2-omdb-vno16/.env
cp index.html seng365-assignment2-omdb-vno16/index.html
cp postcss.config.js seng365-assignment2-omdb-vno16/postcss.config.js
cp tailwind.config.js seng365-assignment2-omdb-vno16/tailwind.config.js
cp tsconfig.json seng365-assignment2-omdb-vno16/tsconfig.json
cp tsconfig.node.json seng365-assignment2-omdb-vno16/tsconfig.node.json
cp vite.config.ts seng365-assignment2-omdb-vno16/vite.config.ts
cp .gitignore seng365-assignment2-omdb-vno16/.gitignore

# Zip
zip -r seng365-assignment2-omdb-vno16.zip seng365-assignment2-omdb-vno16

# Remove temp
rm -rf seng365-assignment2-omdb-vno16