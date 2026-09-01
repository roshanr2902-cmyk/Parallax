/**
 * Fundamental Agent
 * Analyzes company financials, earnings, growth metrics, valuation
 */

const logger = require('../utils/logger');

class FundamentalAgent {
  constructor(mockData) {
    this.mockData = mockData;
  }

  /**
   * Analyze fundamental metrics for a stock
   */
  async analyze(ticker) {
    logger.info(`[FundamentalAgent] Analyzing ${ticker}...`);
    
    const startTime = Date.now();
    const data = this.mockData.fundamental;

    if (!data) {
      throw new Error(`No fundamental data available for ${ticker}`);
    }

    // Simulate processing
    await this.sleep(350);

    const analysis = {
      agent: 'FundamentalAgent',
      ticker: ticker,
      executionTime: Date.now() - startTime,
      analysis: {
        valuation: {
          pe: data.pe,
          pb: data.pb,
          peStatus: this.assessPERatio(data.pe),
          pbStatus: this.assessPBRatio(data.pb)
        },
        profitability: {
          eps: data.eps,
          netProfit: data.netProfit,
          profitMargin: data.profitMargin,
          roe: data.roe,
          status: data.roe > 20 ? 'Excellent' : data.roe > 15 ? 'Good' : 'Fair'
        },
        growth: {
          revenueGrowth: data.revenueGrowth,
          earningsGrowth: data.earningsGrowth,
          momentum: this.assessGrowthMomentum(data.revenueGrowth, data.earningsGrowth)
        },
        financial_strength: {
          debtToEquity: data.debtToEquity,
          currentRatio: data.currentRatio,
          leverage: this.assessLeverage(data.debtToEquity),
          liquidity: this.assessLiquidity(data.currentRatio)
        },
        revenue: data.revenue,
        marketCap: this.mockData.marketCap,
        bookValue: data.bookValue
      },
      summary: this.generateFundamentalSummary(data)
    };

    logger.info(`[FundamentalAgent] Analysis complete for ${ticker}`);
    return analysis;
  }

  assessPERatio(pe) {
    if (pe < 15) return 'Undervalued';
    if (pe < 20) return 'Fair Valuation';
    if (pe < 25) return 'Slightly Overvalued';
    return 'Overvalued';
  }

  assessPBRatio(pb) {
    if (pb < 1) return 'Trading below Book Value';
    if (pb < 3) return 'Fair Valuation';
    if (pb < 5) return 'Slightly Overvalued';
    return 'Significantly Overvalued';
  }

  assessGrowthMomentum(revenueGrowth, earningsGrowth) {
    const avgGrowth = (revenueGrowth + earningsGrowth) / 2;
    if (avgGrowth > 15) return 'High Growth';
    if (avgGrowth > 10) return 'Moderate Growth';
    if (avgGrowth > 5) return 'Steady Growth';
    return 'Slow Growth';
  }

  assessLeverage(debtToEquity) {
    if (debtToEquity < 0.5) return 'Conservative';
    if (debtToEquity < 1.0) return 'Moderate';
    return 'Aggressive';
  }

  assessLiquidity(currentRatio) {
    if (currentRatio > 1.5) return 'Strong';
    if (currentRatio > 1.0) return 'Adequate';
    return 'Weak';
  }

  generateFundamentalSummary(data) {
    return `Company trading at PE ${data.pe} with PB ratio of ${data.pb}. 
    Revenue growth at ${data.revenueGrowth}% and earnings growth at ${data.earningsGrowth}%. 
    ROE of ${data.roe}% indicates ${data.roe > 20 ? 'strong' : 'moderate'} profitability. 
    Debt to equity ratio of ${data.debtToEquity} shows ${data.debtToEquity > 1 ? 'high' : 'manageable'} leverage.`;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = FundamentalAgent;
