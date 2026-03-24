#!/usr/bin/env node
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import os from "os";

const args = process.argv.slice(2);
const home = os.homedir();
const historyDir = path.join(home, ".gemini-cli");
const historyFile = path.join(historyDir, "history.txt");

function showHelp() {
  console.log(`
Usage:
  ask "your question"
  ask --file notes.txt "summarize this file"
  ask --history
  ask --help

Options:
  --file <path>   Include file contents in the prompt
  --history       Show saved prompt history
  --help          Show this help message
`);
}

function saveHistory(prompt) {
  fs.mkdirSync(historyDir, { recursive: true });
  const entry = `[${new Date().toISOString()}] ${prompt}\n`;
  fs.appendFileSync(historyFile, entry);
}

function showHistory() {
  if (!fs.existsSync(historyFile)) {
    console.log("No history found.");
    return;
  }
  console.log(fs.readFileSync(historyFile, "utf8"));
}

if (args.includes("--help")) {
  showHelp();
  process.exit(0);
}

if (args.includes("--history")) {
  showHistory();
  process.exit(0);
}

if (!process.env.GOOGLE_API_KEY) {
  console.error("Missing GOOGLE_API_KEY");
  process.exit(1);
}

let filePath = null;
let promptParts = [...args];

const fileIndex = promptParts.indexOf("--file");
if (fileIndex !== -1) {
  filePath = promptParts[fileIndex + 1];
  promptParts.splice(fileIndex, 2);
}

let prompt = promptParts.join(" ").trim();

if (!prompt) {
  console.log('Usage: ask "your question here"');
  process.exit(1);
}

if (filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    prompt = `File: ${filePath}\n\nContents:\n${fileContent}\n\nUser request: ${prompt}`;
  } catch (error) {
    console.error(`Could not read file: ${filePath}`);
    process.exit(1);
  }
}

saveHistory(prompt);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

try {
  const result = await model.generateContent(prompt);
  console.log("\n" + result.response.text() + "\n");
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
