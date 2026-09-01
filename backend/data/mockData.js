/**
 * Mock financial data for TCS, Infosys, and Reliance
 * Used for testing and fallback when Gemini is unavailable
 */

const mockData = {
  TCS: {
    ticker: 'TCS',
    company: 'Tata Consultancy Services',
    currentPrice: 3245.50,
    dayHigh: 3280.00,
    dayLow: 3210.00,
    weekHigh: 3350.00,
    weekLow: 3100.00,
    marketCap: 14500000000000,
    
    // Technical data
    technical: {
      movingAverage50: 3210.00,
      movingAverage200: 3050.00,
      rsi: 65,
      macd: 'positive',
      volume: 2500000,
      trend: 'uptrend',
      support: 3150.00,
      resistance: 3350.00,
      signal: 'Strong Buy'
    },

    // Fundamental data
    fundamental: {
      eps: 142.50,
      pe: 22.75,
      bookValue: 185.30,
      pb: 17.50,
      debtToEquity: 0.25,
      currentRatio: 1.85,
      roe: 32.5,
      revenue: 28500000000,
      netProfit: 5250000000,
      profitMargin: 18.4,
      revenueGrowth: 12.3,
      earningsGrowth: 15.8,
      signal: 'Healthy Fundamentals'
    },

    // Sentiment data
    sentiment: {
      newsScore: 0.78,
      socialScore: 0.72,
      analystRating: 'Buy',
      targetPrice: 3600,
      recentNews: [
        'TCS Q3 results beat expectations',
        'Digital transformation driving growth',
        'Strong client retention rate'
      ],
      overallSentiment: 'Positive'
    },

    // Synthesis
    synthesis: {
      recommendation: 'BUY',
      confidence: 0.82,
      riskLevel: 'Low-Medium',
      summary: 'TCS shows strong technical momentum with healthy fundamentals. Positive sentiment and analyst recommendations support upside potential. Good entry point for medium-term investors.'
    }
  },

  INFY: {
    ticker: 'INFY',
    company: 'Infosys Limited',
    currentPrice: 1445.75,
    dayHigh: 1465.00,
    dayLow: 1420.00,
    weekHigh: 1510.00,
    weekLow: 1380.00,
    marketCap: 6100000000000,

    // Technical data
    technical: {
      movingAverage50: 1420.00,
      movingAverage200: 1350.00,
      rsi: 58,
      macd: 'positive',
      volume: 3200000,
      trend: 'uptrend',
      support: 1380.00,
      resistance: 1500.00,
      signal: 'Buy'
    },

    // Fundamental data
    fundamental: {
      eps: 52.30,
      pe: 27.60,
      bookValue: 95.40,
      pb: 15.15,
      debtToEquity: 0.15,
      currentRatio: 1.95,
      roe: 28.8,
      revenue: 18200000000,
      netProfit: 3200000000,
      profitMargin: 17.6,
      revenueGrowth: 8.5,
      earningsGrowth: 10.2,
      signal: 'Stable Fundamentals'
    },

    // Sentiment data
    sentiment: {
      newsScore: 0.65,
      socialScore: 0.68,
      analystRating: 'Hold',
      targetPrice: 1520,
      recentNews: [
        'Infosys expands AI capabilities',
        'Stable client base',
        'Cloud migration demand growing'
      ],
      overallSentiment: 'Neutral-Positive'
    },

    // Synthesis
    synthesis: {
      recommendation: 'HOLD',
      confidence: 0.71,
      riskLevel: 'Low',
      summary: 'Infosys exhibits moderate uptrend with solid fundamentals. Neutral market sentiment suggests a hold position. Better suited for risk-averse long-term investors. Potential for gradual appreciation.'
    }
  },

  RELIANCE: {
    ticker: 'RELIANCE',
    company: 'Reliance Industries Limited',
    currentPrice: 2890.25,
    dayHigh: 2920.00,
    dayLow: 2850.00,
    weekHigh: 3050.00,
    weekLow: 2800.00,
    marketCap: 19000000000000,

    // Technical data
    technical: {
      movingAverage50: 2950.00,
      movingAverage200: 2750.00,
      rsi: 48,
      macd: 'neutral',
      volume: 1800000,
      trend: 'sideways',
      support: 2800.00,
      resistance: 3000.00,
      signal: 'Hold'
    },

    // Fundamental data
    fundamental: {
      eps: 186.40,
      pe: 15.50,
      bookValue: 512.60,
      pb: 5.64,
      debtToEquity: 0.35,
      currentRatio: 1.45,
      roe: 38.2,
      revenue: 98500000000,
      netProfit: 15200000000,
      profitMargin: 15.4,
      revenueGrowth: 6.2,
      earningsGrowth: 8.5,
      signal: 'Strong Financials'
    },

    // Sentiment data
    sentiment: {
      newsScore: 0.60,
      socialScore: 0.62,
      analystRating: 'Hold',
      targetPrice: 3100,
      recentNews: [
        'Oil prices impacting margins',
        'Jio digital growth continues',
        'Refining capacity optimization'
      ],
      overallSentiment: 'Neutral'
    },

    // Synthesis
    synthesis: {
      recommendation: 'HOLD',
      confidence: 0.68,
      riskLevel: 'Medium',
      summary: 'Reliance trading sideways with strong fundamentals but oil price sensitivity. Neutral sentiment and analyst ratings suggest holding. Suitable for experienced investors who can manage commodity exposure. Watch for oil price trends.'
    }
  }
};

/**
 * Get mock data for a specific ticker
 */
function getMockData(ticker) {
  const upperTicker = ticker.toUpperCase();
  return mockData[upperTicker] || null;
}

/**
 * Get all available mock tickers
 */
function getAvailableTickers() {
  return Object.keys(mockData);
}

module.exports = {
  mockData,
  getMockData,
  getAvailableTickers
};
