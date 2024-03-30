import OpenAI from "openai";
import dotenv from "dotenv";

// Initialize OpenAI client with your API key
const openai = new OpenAI({ apiKey : `${process.env.OPENAI_API_KEY}`});

// Function to generate AI chat response
async function chatGPTResponse(message) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, an error occurred while processing your request.";
  }
}

// Define Express route handler for /chatgpt endpoint
function chatGPTRoutes(app) {
  app.post('/chatgpt', async (req, res) => {
    const { message } = req.body;
    const response = await chatGPTResponse(message);
    res.json({ response });
  });
}





export default chatGPTRoutes;
