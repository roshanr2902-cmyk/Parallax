const { GoogleGenerativeAI } = require('@google/generative-ai');

let geminiClient = null;

/**
 * Initialize Gemini API client
 * Returns null if API key is not configured
 */
function initializeGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn('⚠️  GEMINI_API_KEY not configured. Using mock responses.');
    return null;
  }

  try {
    geminiClient = new GoogleGenerativeAI(apiKey);
    console.log('✅ Gemini API initialized successfully');
    return geminiClient;
  } catch (error) {
    console.error('❌ Failed to initialize Gemini API:', error.message);
    return null;
  }
}

/**
 * Get Gemini model instance
 */
function getGeminiModel() {
  if (!geminiClient) {
    return null;
  }
  return geminiClient.getGenerativeModel({ model: 'gemini-pro' });
}

/**
 * Check if Gemini is available
 */
function isGeminiAvailable() {
  return geminiClient !== null;
}

module.exports = {
  initializeGemini,
  getGeminiModel,
  isGeminiAvailable
};
