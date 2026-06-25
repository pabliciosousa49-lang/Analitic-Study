import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

async function test() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        console.log("API carregada:", process.env.GEMINI_API_KEY ? "SIM" : "NÃO");

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent("Diga apenas: teste funcionando.");

        console.log(result.response.text());

    } catch (err) {
        console.error(err);
    }
}

test();