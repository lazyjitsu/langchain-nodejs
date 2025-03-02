Notes on work
Added to package.json so we can use 'import'
  "name": "langchain",
  "version": "1.0.0",
  "main": "index.js",
  "type":"module", <-- this line

# installed langchain and openai 
$ npm install langchain @langchain/openai

# for api key in the enviornment file in .env
npm install dotenv
# optional
npm install zod  # for output formatting

## Langchain documents
Simply an object that contains text as well as some optional meta data such as the source from which that text was extracted (i.e website url, PDF name etc..)

