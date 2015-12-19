BIN = ./node_modules/.bin
uglify = ./node_modules/.bin/uglifyjs

install link:
	@npm $@

lint:
	jsxhint -c .jshintrc ./index.js

patch: lint
	@$(call release,patch)

minor: lint 
	@$(call release,minor)

major: lint 
	@$(call release,major)

jsx: 
	@$(call lint)
	gulp	
	@$(uglify) ./node_modules/.bin/uglifyjs index.js -o dist/react-breadcrumbs.min.js --source-map dist/react-breadcrumbs.min.js.map -p 5 -c -m

prepublish: 
	@$(call jsx)
	@(sh bin/authors)
	git commit -am "`npm view . version`" --allow-empty
	@$(call release,patch)
	
publish:
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
