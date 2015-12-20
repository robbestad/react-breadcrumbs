#!/bin/bash
postcss --use autoprefixer app.css > dist/app.css
cp index.html dist/index.html
webpack
cd dist
minify app.css
surge
