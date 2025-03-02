import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser, CommaSeparatedListOutputParser } from '@langchain/core/output_parsers';

import * as dotenv from "dotenv";
import { mode } from 'mathjs';

dotenv.config();

const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
});

async function callStringOputpuParser() {
// Create prompt template
const prompt = ChatPromptTemplate.fromMessages([
    ["system","Generate a joke based on a word provided by theuser."],
    ["human","{input}"],
])

// Create Parser

const parser = new StringOutputParser();

// Create a chain. The way to read this is: the output of prompt, is the input to pipe(model) and the output of that is input to pipe(parser)
const chain = prompt.pipe(model).pipe(parser);

// Call chain
return await chain.invoke({
    input: "dog"
})
}

async function callListOutputParser() {
    const prompt = ChatPromptTemplate.fromTemplate(`
            Provide 5 synonyms, seperated by commas, for the followign word {word}
        `);

        const outputParser = new CommaSeparatedListOutputParser();

        const chain = prompt.pipe(model).pipe(outputParser);

        return await chain.invoke({
            word: 'happy',
        })
}
const resp = await callListOutputParser();
console.log(resp);