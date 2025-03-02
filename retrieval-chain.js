import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Document } from '@langchain/core/documents';
import {createStuffDocumentsChain} from 'langchain/chains/combine_documents';

import * as dotenv from 'dotenv';
dotenv.config();

const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature:0.7,
})

const prompt = ChatPromptTemplate.fromTemplate(`
        Answer the user's question. 
        Context: {context}
        Question: {input}
`)

const chain = await createStuffDocumentsChain({
    llm:model,
    prompt
});

// Documents
const documentA = new Document({
    pageContent: "Marko is a Muay Thai Fighter"
})
const documentB = new Document({
    pageContent: "Wild Style Crew Breakers are the best"
})
const resp = await chain.invoke({
    input: "What crew is the best at breaking?",
    context: [documentA,documentB]
})

console.log(resp);