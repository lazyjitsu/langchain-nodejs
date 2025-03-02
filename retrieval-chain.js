import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {createStuffDocumentsChain} from 'langchain/chains/combine_documents';
import { CheerioWebBaseLoader} from "@langchain/community/document_loaders/web/cheerio";

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

const loader = new CheerioWebBaseLoader(
    "https://chiton-grapefruit-y69w.squarespace.com/natomas",

)

const docos = await loader.load();
// console.log(docos)
const resp = await chain.invoke({
    input: "What's is in a sicilian pizza?",
    context: []
})

console.log(docos[0]);