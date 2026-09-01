/**
 * Sentiment Agent
 * Analyzes market sentiment, news, social media, analyst ratings
 */

const logger = require('../utils/logger');

class SentimentAgent {
  constructor(mockData) {
    this.mockData = mockData;
  }

  /**
   * Analyze sentiment for a stock
   */
  async analyze(ticker) {
    logger.info(`[SentimentAgent] Analyzing ${ticker}...`);
    
    const startTime = Date.now();
    const data = this.mockData.sentiment;

    if (!data) {
      throw new Error(`No sentiment data available for ${ticker}`);
    }

    // Simulate processing
    await this.sleep(400);

    const analysis = {
      agent: 'SentimentAgent',
      ticker: ticker,
      executionTime: Date.now() - startTime,
      analysis: {
        newsScore: data.newsScore,
        newsInterpretation: this.interpretScore(data.newsScore),
        socialScore: data.socialScore,
        socialInterpretation: this.interpretScore(data.socialScore),
        overallSentimentScore: (data.newsScore + data.socialScore) / 2,
        analystRating: data.analystRating,
        targetPrice: data.targetPrice,
        targetPriceImplied: ((data.targetPrice - this.mockData.currentPrice) / this.mockData.currentPrice * 100).toFixed(2) + '%',
        sentiment: {
          newsSource: data.overallSentiment,
          socialMedia: this.deriveSocialSentiment(data.socialScore),
          analyst: this.deriveAnalystSentiment(data.analystRating)
        },
        recentNews: data.recentNews,
        newsCount: data.recentNews.length,
        overallSentiment: data.overallSentiment
      },
      summary: this.generateSentimentSummary(data)
    };

    logger.info(`[SentimentAgent] Analysis complete for ${ticker}`);
    return analysis;
  }

  interpretScore(score) {
    if (score >= 0.8) return 'Very Positive';
    if (score >= 0.6) return 'Positive';
    if (score >= 0.4) return 'Neutral';
    if (score >= 0.2) return 'Negative';
    return 'Very Negative';
  }

  deriveSocialSentiment(score) {
    if (score > 0.7) return 'Bullish sentiment on social platforms';
    if (score > 0.5) return 'Moderately bullish social sentiment';
    if (score > 0.3) return 'Mixed social sentiment';
    return 'Bearish sentiment on social platforms';
  }

  deriveAnalystSentiment(rating) {
    if (rating === 'Buy') return 'Strong bullish outlook from analysts';
    if (rating === 'Hold') return 'Neutral outlook from analysts';
    if (rating === 'Sell') return 'Bearish outlook from analysts';
    return 'Mixed analyst opinions';
  }

  generateSentimentSummary(data) {
    const overallScore = (data.newsScore + data.socialScore) / 2;
    const priceUpside = ((data.targetPrice - this.mockData.currentPrice) / this.mockData.currentPrice * 100).toFixed(1);
    
    return `Market sentiment is ${data.overallSentiment}. News score at ${(data.newsScore * 100).toFixed(0)}% and social score at ${(data.socialScore * 100).toFixed(0)}%. 
    Analysts rate this as "${data.analystRating}" with target price of ${data.targetPrice} (${priceUpside > 0 ? '+' : ''}${priceUpside}% upside). 
    Recent positive developments: ${data.recentNews[0]}.`;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = SentimentAgent;
