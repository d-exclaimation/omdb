#!/bin/bash

# Remove old zip
if [ ! -f "seng365-assignment2-omdb-vno16.zip" ]; then
    rm seng365-assignment2-omdb-vno16.zip
fi

# Zip
zip -r seng365-assignment2-omdb-vno16.zip src public package*.json .env index.html postcss.config.js tailwind.config.js tsconfig.json tsconfig.node.json vite.config.ts .gitignore