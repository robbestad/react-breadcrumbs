BIN = ./node_modules/.bin
uglify = ./node_modules/.bin/uglifyjs

install link:
	@npm $@

lint:
	eslint ./index.jsx

patch: lint
	git commit -am "`npm view . version`" --allow-empty
	@$(call release,patch)

minor: lint 
	@$(call release,minor)

major: lint 
	@$(call release,major)

jsx: 
	@$(call lint)
	gulp	
	@$(uglify) index.js -o dist/react-breadcrumbs.min.js --source-map dist/react-breadcrumbs.min.js.map -p 5 -c drop_console -m
	cp dist/react-breadcrumbs.min.js index.js

prepublish: 
	@$(call jsx)
	@(sh bin/authors)
	
publish:
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
