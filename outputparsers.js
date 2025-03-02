import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

import * as dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
});

async function callStringOputpuParser() {

}
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
const resp = await chain.invoke({
    input: "dog"
})
// console.log(await prompt.format({ input: "chicken"}))
console.log(resp)