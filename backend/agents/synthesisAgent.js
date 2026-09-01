/**
 * Synthesis Agent
 * Combines insights from all other agents and provides final recommendation
 */

const logger = require('../utils/logger');

class SynthesisAgent {
  /**
   * Synthesize analysis from all agents
   */
  async analyze(ticker, technicalAnalysis, fundamentalAnalysis, sentimentAnalysis) {
    logger.info(`[SynthesisAgent] Synthesizing analysis for ${ticker}...`);
    
    const startTime = Date.now();

    // Simulate processing
    await this.sleep(300);

    // Extract scores and signals
    const technicalSignal = this.extractSignalValue(technicalAnalysis.analysis.signal);
    const fundamentalHealth = this.assessFundamentalHealth(fundamentalAnalysis.analysis);
    const sentimentScore = sentimentAnalysis.analysis.overallSentimentScore;

    // Calculate composite score
    const compositeScore = this.calculateCompositeScore(
      technicalSignal,
      fundamentalHealth,
      sentimentScore
    );

    // Generate recommendation
    const recommendation = this.generateRecommendation(compositeScore, technicalAnalysis, fundamentalAnalysis, sentimentAnalysis);

    const analysis = {
      agent: 'SynthesisAgent',
      ticker: ticker,
      executionTime: Date.now() - startTime,
      analysis: {
        recommendation: recommendation.action,
        confidence: recommendation.confidence,
        riskLevel: this.assessRiskLevel(fundamentalAnalysis.analysis),
        scores: {
          technical: technicalSignal,
          fundamental: fundamentalHealth,
          sentiment: sentimentScore,
          composite: compositeScore
        },
        targetPrice: sentimentAnalysis.analysis.targetPrice,
        upside: sentimentAnalysis.analysis.targetPriceImplied,
        keyFactors: {
          bullish: this.extractBullishFactors(technicalAnalysis, fundamentalAnalysis, sentimentAnalysis),
          bearish: this.extractBearishFactors(technicalAnalysis, fundamentalAnalysis, sentimentAnalysis),
          neutral: this.extractNeutralFactors(fundamentalAnalysis)
        },
        investorProfile: this.recommendInvestorProfile(recommendation.action, fundamentalAnalysis.analysis.profitability.roe)
      },
      summary: recommendation.summary
    };

    logger.info(`[SynthesisAgent] Synthesis complete - Recommendation: ${recommendation.action}`);
    return analysis;
  }

  extractSignalValue(signal) {
    const signalMap = {
      'Strong Buy': 0.95,
      'Buy': 0.75,
      'Hold': 0.50,
      'Sell': 0.25,
      'Strong Sell': 0.05
    };
    return signalMap[signal] || 0.50;
  }

  assessFundamentalHealth(analysis) {
    let score = 0.5;
    
    // ROE component
    if (analysis.profitability.roe > 25) score += 0.15;
    else if (analysis.profitability.roe > 15) score += 0.10;
    else score -= 0.05;

    // Growth component
    const avgGrowth = (analysis.growth.revenueGrowth + analysis.growth.earningsGrowth) / 2;
    if (avgGrowth > 15) score += 0.15;
    else if (avgGrowth > 10) score += 0.10;
    else if (avgGrowth > 5) score += 0.05;

    // Valuation component
    if (analysis.valuation.pe < 20) score += 0.10;
    else if (analysis.valuation.pe < 25) score += 0.05;
    else score -= 0.05;

    // Leverage component
    if (analysis.financial_strength.debtToEquity < 0.5) score += 0.05;
    else if (analysis.financial_strength.debtToEquity > 1.5) score -= 0.10;

    return Math.min(Math.max(score, 0), 1);
  }

  calculateCompositeScore(technicalScore, fundamentalScore, sentimentScore) {
    const weights = {
      technical: 0.35,
      fundamental: 0.40,
      sentiment: 0.25
    };

    return (technicalScore * weights.technical + 
            fundamentalScore * weights.fundamental + 
            sentimentScore * weights.sentiment);
  }

  generateRecommendation(compositeScore, technical, fundamental, sentiment) {
    let action, confidence, summary;

    if (compositeScore >= 0.75) {
      action = 'STRONG BUY';
      confidence = Math.min(compositeScore + 0.1, 0.95);
      summary = this.generateBuyRecommendation(technical, fundamental, sentiment, true);
    } else if (compositeScore >= 0.60) {
      action = 'BUY';
      confidence = compositeScore;
      summary = this.generateBuyRecommendation(technical, fundamental, sentiment, false);
    } else if (compositeScore >= 0.40) {
      action = 'HOLD';
      confidence = 0.70;
      summary = this.generateHoldRecommendation(technical, fundamental, sentiment);
    } else if (compositeScore >= 0.25) {
      action = 'SELL';
      confidence = Math.max(1 - compositeScore, 0.60);
      summary = this.generateSellRecommendation(technical, fundamental, sentiment, false);
    } else {
      action = 'STRONG SELL';
      confidence = 0.90;
      summary = this.generateSellRecommendation(technical, fundamental, sentiment, true);
    }

    return { action, confidence: parseFloat(confidence.toFixed(2)), summary };
  }

  generateBuyRecommendation(tech, fund, sent, isStrong) {
    const strength = isStrong ? 'strong' : 'moderate';
    return `${strength.charAt(0).toUpperCase() + strength.slice(1)} buy signal. ${tech.analysis.signal} based on technical analysis. 
    Fundamentals are ${fund.analysis.profitability.status} with ${fund.analysis.growth.momentum}. 
    Sentiment is ${sent.analysis.overallSentiment}. Analyst target price offers ${sent.analysis.targetPriceImplied} upside. 
    Suitable for growth-oriented investors with medium-term horizon.`;
  }

  generateHoldRecommendation(tech, fund, sent) {
    return `Hold recommendation. Technical analysis shows ${tech.analysis.trend} but mixed momentum. 
    Fundamentals are stable with ${fund.analysis.growth.momentum}. 
    Sentiment is ${sent.analysis.overallSentiment}. 
    Better suited for accumulation at lower levels or for risk-averse investors. Monitor analyst upgrades.`;
  }

  generateSellRecommendation(tech, fund, sent, isStrong) {
    const strength = isStrong ? 'strong' : 'moderate';
    return `${strength.charAt(0).toUpperCase() + strength.slice(1)} sell signal. ${tech.analysis.signal} based on technical analysis. 
    Fundamentals show ${fund.analysis.growth.momentum}. 
    Sentiment is ${sent.analysis.overallSentiment}. 
    Consider reducing position or avoiding entry. Better opportunities may exist in the market.`;
  }

  extractBullishFactors(technical, fundamental, sentiment) {
    const factors = [];
    
    if (technical.analysis.trend === 'uptrend') factors.push('Strong technical uptrend');
    if (fundamental.analysis.profitability.roe > 25) factors.push('Excellent ROE performance');
    if (fundamental.analysis.growth.momentum.includes('High')) factors.push('High growth momentum');
    if (sentiment.analysis.overallSentiment.includes('Positive')) factors.push('Positive market sentiment');
    if (sentiment.analysis.analystRating === 'Buy') factors.push('Analyst buy recommendation');

    return factors.length > 0 ? factors : ['Stock showing relative strength'];
  }

  extractBearishFactors(technical, fundamental, sentiment) {
    const factors = [];
    
    if (technical.analysis.indicators.rsi > 70) factors.push('Overbought technical conditions');
    if (fundamental.analysis.financial_strength.debtToEquity > 1.5) factors.push('High leverage');
    if (fundamental.analysis.growth.revenueGrowth < 5) factors.push('Slow revenue growth');
    if (sentiment.analysis.overallSentiment.includes('Negative')) factors.push('Negative market sentiment');

    return factors.length > 0 ? factors : [];
  }

  extractNeutralFactors(fundamental) {
    const factors = [];
    
    if (fundamental.analysis.valuation.peStatus === 'Fair Valuation') {
      factors.push('Fair valuation at current levels');
    }
    
    return factors;
  }

  assessRiskLevel(fundamental) {
    let riskScore = 0.5;

    if (fundamental.financial_strength.debtToEquity > 1.5) riskScore += 0.2;
    else if (fundamental.financial_strength.debtToEquity > 1) riskScore += 0.1;

    if (fundamental.financial_strength.liquidity === 'Weak') riskScore += 0.15;

    if (riskScore > 0.7) return 'High';
    if (riskScore > 0.45) return 'Medium';
    return 'Low';
  }

  recommendInvestorProfile(action, roe) {
    if (action.includes('STRONG BUY') || action === 'BUY') {
      return roe > 20 ? 'Growth investors, aggressive traders' : 'Conservative to moderate investors';
    } else if (action === 'HOLD') {
      return 'Long-term value investors, risk-averse investors';
    } else {
      return 'Traders looking for exits, avoid or short-term traders';
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = SynthesisAgent;
