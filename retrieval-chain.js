import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Document } from '@langchain/core/';
import {createStuffDocumentsChain} from '@langchain/core/documents'

import * as dotenv from 'dotenv';
dotenv.config();

const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature:0.7,
})

const prompt = ChatPromptTemplate.fromTemplate(`
        Answer the user's question. 
        Context: What is a kewl dude!
        Question: {input}
`)

const chain = prompt.pipe(model);

// Documents
const documentA = new Document({
    pageContent: "Marko is a Muay Thai Fighter"
})
const resp = await chain.invoke({
    input:" What is a Marko?",
})

console.log(resp);