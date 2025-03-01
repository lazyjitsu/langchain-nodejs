import { ChatOpenAI } from '@langchain/openai';
import * as dotenv from "dotenv";
dotenv.config();
const model = new ChatOpenAI({})

const response = await model.invoke("Hello");
console.log(response)

