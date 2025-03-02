import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';


import * as dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
});

// Instruct the model to behave in a certain way using prompt templates

const prompt = ChatPromptTemplate.fromTemplate('You are a comedian. Tell a joke based on the following word {input}');

// Create a chain
const chain = prompt.pipe(model);

// Call chain
const resp = await chain.invoke({
    input: "dog"
})
// console.log(await prompt.format({ input: "chicken"}))
console.log(resp)