install: 
	npm install

publish:
	npm publish --dry-run
	
run:
	npx babel-node 'src/bin/gendiff.js' 10

start:
	npm run prepublishOnly
lint:
	npx eslint