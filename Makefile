install: 
	npm install

publish:
	npm publish --dry-run
	
run:
	npx babel-node 'src/bin/gendiff.js'

start:
	npm run prepublishOnly

lint:
	npx eslint .

test:
	npm run test