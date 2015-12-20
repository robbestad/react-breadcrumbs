#!/bin/bash
postcss --use autoprefixer app.css > dist/app.css
cd dist
minify app.css
surge
