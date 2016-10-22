#!/bin/bash
../node_modules/.bin/postcss --use autoprefixer app.css > dist/app.css
cp index.html dist/index.html
../node_modules/.bin/webpack
cd dist
../../node_modules/.bin/minify app.css > app.min.css
surge
