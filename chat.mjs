#!/usr/bin/env node
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

if (!process.env.GOOGLE_API_KEY) {
  console.error("Missing GOOGLE_API_KEY");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const history = [];

console.log('Gemini chat started. Type "exit" to quit.\n');

function askQuestion() {
  rl.question("You: ", async (input) => {
    const message = input.trim();

    if (!message) {
      askQuestion();
      return;
    }

    if (message.toLowerCase() === "exit") {
      console.log("Goodbye.");
      rl.close();
      return;
    }

    history.push({ role: "user", parts: [{ text: message }] });

    try {
      const result = await model.generateContent({
        contents: history,
      });

      const reply = result.response.text();

      console.log(`\nGemini: ${reply}\n`);

      history.push({ role: "model", parts: [{ text: reply }] });
    } catch (error) {
      console.error("\nError:", error.message, "\n");
    }

    askQuestion();
  });
}

askQuestion();
