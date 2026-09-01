/**
 * Gemini Service
 * Handles communication with Google Gemini API
 * Falls back to mock data when API is unavailable
 */

const logger = require('../utils/logger');
const { getGeminiModel, isGeminiAvailable } = require('../config/gemini');

class GeminiService {
  /**
   * Get AI insights using Gemini API or mock response
   */
  async getInsights(prompt) {
    logger.info(`🤖 [GeminiService] Processing prompt...`);

    if (!isGeminiAvailable()) {
      logger.warn(`⚠️  [GeminiService] Gemini API not available. Using mock response.`);
      return this.getMockInsights(prompt);
    }

    try {
      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      logger.info(`✅ [GeminiService] Got response from Gemini API`);
      return {
        source: 'gemini',
        content: text,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error(`❌ [GeminiService] Gemini API error: ${error.message}`);
      logger.warn(`⚠️  [GeminiService] Falling back to mock insights`);
      return this.getMockInsights(prompt);
    }
  }

  /**
   * Generate mock insights (fallback)
   */
  getMockInsights(prompt) {
    const insights = [
      'The technical indicators suggest a consolidation phase with support holding firm.',
      'Fundamental metrics indicate stable revenue growth with improving operational efficiency.',
      'Market sentiment has turned positive following recent earnings announcements.',
      'The risk-reward ratio appears favorable at current price levels for medium-term investors.',
      'Watch for resistance at the 50-day moving average in the coming sessions.'
    ];

    const randomInsight = insights[Math.floor(Math.random() * insights.length)];

    return {
      source: 'mock',
      content: randomInsight,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new GeminiService();
