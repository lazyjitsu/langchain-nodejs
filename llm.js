import { ChatOpenAI } from '@langchain/openai';
import * as dotenv from "dotenv";
dotenv.config();
const model = new ChatOpenAI({})

const response = await model.batch(["Hello","How are you?"]);
console.log(response)
