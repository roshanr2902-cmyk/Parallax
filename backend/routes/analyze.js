/**
 * Analyze Routes
 * Handles POST /api/analyze endpoint
 */

const express = require('express');
const router = express.Router();
const orchestrator = require('../services/orchestrator');
const geminiService = require('../services/geminiService');
const logger = require('../utils/logger');
const { getAvailableTickers } = require('../data/mockData');

/**
 * POST /api/analyze
 * Request body: { ticker: "TCS" | "INFY" | "RELIANCE" }
 * Returns: Complete stock analysis with recommendation
 */
router.post('/analyze', async (req, res) => {
  try {
    const { ticker } = req.body;

    // Validation
    if (!ticker || typeof ticker !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'Missing or invalid ticker parameter',
        availableTickers: getAvailableTickers()
      });
    }

    const upperTicker = ticker.toUpperCase();
    const availableTickers = getAvailableTickers();

    if (!availableTickers.includes(upperTicker)) {
      return res.status(400).json({
        status: 'error',
        message: `Ticker "${ticker}" not available`,
        availableTickers: availableTickers,
        suggestion: 'Use one of the available tickers above'
      });
    }

    logger.info(`📥 [API] Received analysis request for ${upperTicker}`);

    // Execute analysis pipeline
    const analysis = await orchestrator.executeAnalysis(upperTicker);

    // Optional: Get additional insights from Gemini
    logger.info(`🤖 [API] Fetching AI insights...`);
    const geminiPrompt = `Based on this stock analysis:
      Recommendation: ${analysis.recommendation.action}
      Confidence: ${analysis.recommendation.confidence}
      Key Factors: ${JSON.stringify(analysis.recommendation.keyFactors)}
      
      Provide a concise investment insight in one sentence.`;

    const insights = await geminiService.getInsights(geminiPrompt);

    // Compile final response
    const response = {
      status: 'success',
      data: {
        ...analysis,
        aiInsights: insights.content,
        insightSource: insights.source
      }
    };

    logger.info(`✅ [API] Analysis response ready for ${upperTicker}`);
    res.json(response);

  } catch (error) {
    logger.error(`❌ [API] Error: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/available-tickers
 * Returns list of available stock tickers
 */
router.get('/available-tickers', (req, res) => {
  res.json({
    status: 'success',
    tickers: getAvailableTickers(),
    description: 'Available stock tickers for analysis'
  });
});

/**
 * GET /api/sample-response
 * Returns a sample analysis response (for frontend testing)
 */
router.get('/sample-response', (req, res) => {
  res.json({
    status: 'success',
    message: 'This is a sample response structure',
    data: {
      ticker: 'TCS',
      company: 'Tata Consultancy Services',
      currentPrice: 3245.50,
      recommendation: {
        action: 'BUY',
        confidence: 0.82,
        riskLevel: 'Low-Medium',
        targetPrice: 3600,
        upside: '+10.92%',
        summary: 'Strong technical and fundamental setup with positive sentiment',
        keyFactors: {
          bullish: ['Strong technical uptrend', 'Excellent ROE performance'],
          bearish: [],
          neutral: []
        }
      },
      agentExecutionTrace: [
        { agent: 'TechnicalAgent', status: 'completed', executionTime: 300 },
        { agent: 'FundamentalAgent', status: 'completed', executionTime: 350 },
        { agent: 'SentimentAgent', status: 'completed', executionTime: 400 },
        { agent: 'SynthesisAgent', status: 'completed', executionTime: 300 }
      ]
    }
  });
});

module.exports = router;
