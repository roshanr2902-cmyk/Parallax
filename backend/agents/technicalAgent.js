/**
 * Technical Agent
 * Analyzes price charts, trends, technical indicators, support/resistance
 */

const logger = require('../utils/logger');

class TechnicalAgent {
  constructor(mockData) {
    this.mockData = mockData;
  }

  /**
   * Analyze technical indicators for a stock
   */
  async analyze(ticker) {
    logger.info(`[TechnicalAgent] Analyzing ${ticker}...`);
    
    const startTime = Date.now();
    const data = this.mockData.technical;

    if (!data) {
      throw new Error(`No technical data available for ${ticker}`);
    }

    // Simulate processing
    await this.sleep(300);

    const analysis = {
      agent: 'TechnicalAgent',
      ticker: ticker,
      executionTime: Date.now() - startTime,
      analysis: {
        currentPrice: this.mockData.currentPrice,
        trend: data.trend,
        momentum: this.calculateMomentum(data),
        volatility: this.calculateVolatility(data),
        indicators: {
          movingAverage50: data.movingAverage50,
          movingAverage200: data.movingAverage200,
          rsi: data.rsi,
          macd: data.macd
        },
        support: data.support,
        resistance: data.resistance,
        volume: data.volume,
        chartPattern: this.identifyPattern(data),
        signal: data.signal,
        keyLevels: {
          dayHigh: this.mockData.dayHigh,
          dayLow: this.mockData.dayLow,
          weekHigh: this.mockData.weekHigh,
          weekLow: this.mockData.weekLow
        }
      },
      summary: this.generateTechnicalSummary(data)
    };

    logger.info(`[TechnicalAgent] Analysis complete for ${ticker}`);
    return analysis;
  }

  calculateMomentum(data) {
    if (data.rsi > 70) return 'Strong Bullish';
    if (data.rsi > 60) return 'Moderately Bullish';
    if (data.rsi < 30) return 'Strong Bearish';
    if (data.rsi < 40) return 'Moderately Bearish';
    return 'Neutral';
  }

  calculateVolatility(data) {
    const range = data.weekHigh - data.weekLow;
    const volatilityPercent = (range / data.weekLow) * 100;
    return volatilityPercent > 5 ? 'High' : volatilityPercent > 2 ? 'Medium' : 'Low';
  }

  identifyPattern(data) {
    if (data.trend === 'uptrend') return 'Ascending Triangle / Bullish';
    if (data.trend === 'downtrend') return 'Descending Triangle / Bearish';
    return 'Consolidation / Neutral';
  }

  generateTechnicalSummary(data) {
    return `Price at ${data.rsi > 50 ? 'resistance' : 'support'} levels. 
    ${data.macd === 'positive' ? 'Positive' : 'Negative'} MACD confirms ${data.trend}. 
    RSI at ${data.rsi} suggests ${this.calculateMomentum(data)} momentum.`;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = TechnicalAgent;
