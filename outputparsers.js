import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser, CommaSeparatedListOutputParser,StructuredOutputParser } from '@langchain/core/output_parsers';
import {z} from 'zod';

import * as dotenv from "dotenv";
import { isIntegerDependencies, mode } from 'mathjs';

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

// Structured Output Parser
// return/get json. great for providing output to another program
async function callStructuredParser() {
    const prompt = ChatPromptTemplate.fromTemplate(`
            Extract information from the following phrase. 
            Formatting Instructions: {format_instructions}
            Phrase: {phrase}
        `)
    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
        name: 'the name of the person',
        age: 'the age of the person',
    })

    const chain = prompt.pipe(model).pipe(outputParser)

    return await chain.invoke({
        phrase: "Max is 30 years old.",
        format_instructions: outputParser.getFormatInstructions(),
    })
}

async function callZodOutputParser() {
    const prompt = ChatPromptTemplate.fromTemplate(`
            Extract information from the following phrase. 
            Formatting Instructions: {format_instructions}
            Phrase: {phrase}
        `)
    const outPutParser = StructuredOutputParser.fromZodSchema(
        z.object({
            recipe: z.string().describe("name of recipe"),
            ingredients: z.array(z.string()).describe("ingredients"),

        })
    );
    const chain = prompt.pipe(model).pipe(outPutParser);

    return await chain.invoke({
        phrase: 'The ingredients fro a Spaghetti Bolognese recipe are tomatoes, minced beef, garlic, wine and herbs.',
        format_instructions: outPutParser.getFormatInstructions()
    })
}

const response = await callZodOutputParser()
console.log(response);