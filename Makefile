install: 
	npm install

publish:
	npm run prepublishOnly
	
run:
	npx babel-node 'src/bin/gendiff.js' 10
