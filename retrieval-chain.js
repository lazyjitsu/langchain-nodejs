import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import * as dotenv from 'dotenv';
dotenv.config();

const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature:0.7,
})

const prompt = ChatPromptTemplate.fromTemplate(`
        Anser the user's question. {input}
`)

const chain = prompt.pipe(model);

const resp = await chain.invoke({
    input:" What is Marko?",
})

console.log(resp);