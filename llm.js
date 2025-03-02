import { ChatOpenAI } from '@langchain/openai';
import * as dotenv from "dotenv";
dotenv.config();
const model = new ChatOpenAI({})


// stream: will respond in chuncks as they are being generated by OpenAI
const response = await model.stream("Write a poem about AI");

for await (const chunk of response) {
    console.log(chunk?.content);
}