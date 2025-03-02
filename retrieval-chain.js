import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {createStuffDocumentsChain} from 'langchain/chains/combine_documents';
import { CheerioWebBaseLoader} from "@langchain/community/document_loaders/web/cheerio";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

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
const marcoResume = "marco.pdf";
const loaderpdf = new PDFLoader(marcoResume);

const chain = await createStuffDocumentsChain({
    llm:model,
    prompt
});

// const loader = new CheerioWebBaseLoader(
//     "https://chiton-grapefruit-y69w.squarespace.com/natomas",
//     {
//         selector: ".menu-item-description",
//     }

// )

const pdfdoc = await loaderpdf.load();

// const docos = await loader.load();
// console.log(docos)
const resp = await chain.invoke({
    input: "What is marco's phone number?",
    context: pdfdoc
})

console.log(resp);