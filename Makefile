BIN = ./node_modules/.bin
uglify = ./node_modules/.bin/uglifyjs

install link:
	@npm $@

lint:
	$(BIN)/eslint ./index.jsx

patch:  lint
	make prepublish
	@$(call release,patch)

minor: lint 
	make prepublish
	@$(call release,minor)

major: lint 
	make prepublish
	@$(call release,major)

jsx: 
	@$(call lint)
	./node_modules/.bin/babel index.jsx > index.js
	@$(uglify) index.js -o dist/react-breadcrumbs.min.js --source-map dist/react-breadcrumbs.min.js.map -p 5 -c drop_console -m
	cp dist/react-breadcrumbs.min.js index.js

prepublish: 
	make jsx
	@(sh bin/authors)
	git commit -am "`npm view . version`" --allow-empty

publish:
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
