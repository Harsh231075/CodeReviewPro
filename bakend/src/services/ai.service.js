const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.Goole_key);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
   You are a concise and precise code reviewer.  
    Identify only the most critical issues and improvements.  
    Keep responses under 5 bullet points, each under 20 words.
    And your response must be short not long okay.
    If code is under 50 line you only reply your answer in 100 words only and with code okay no any extra suggestion . 
    If code is good you should not give any suggstion and say code is already well struture.
  `
});

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;