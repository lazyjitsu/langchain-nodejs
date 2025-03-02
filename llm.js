import { ChatOpenAI } from '@langchain/openai';
import * as dotenv from "dotenv";
dotenv.config();
const model = new ChatOpenAI({})


const response = await model.streamLog("Write a poem about AI");
// now ea. of the words being streamed back to us
for await (const chunk of response) {
    console.log(chunk);
}