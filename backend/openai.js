// Import the OpenAI package
const { Configuration, OpenAIApi } = require("openai");

// Create a new Configuration object with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an OpenAI API client
const openAIApi = new OpenAIApi(configuration);

// Define a function to make a chat completion request
async function makeChatCompletionRequest(userMessage) {
  // Create a chat completion request object
  const request = {
    engine: "chatGPT",
    prompts: [
      `Chat history: ${userMessage}`,
    ],
  };

  // Make the chat completion request
  const response = await openAIApi.createChatCompletion(request);

  // Return the chat completion response
  return response.choices[0].text;
}

// Get the user's message
const userMessage = "Hello, how can I help you today?";

// Make a chat completion request
const chatCompletionResponse =  makeChatCompletionRequest(userMessage);

// Print the chat completion response
console.log(chatCompletionResponse);