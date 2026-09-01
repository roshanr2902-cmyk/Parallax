/**
 * Orchestrator Service
 * Coordinates execution of all agents and orchestrates the analysis pipeline
 */

const logger = require('../utils/logger');
const TechnicalAgent = require('../agents/technicalAgent');
const FundamentalAgent = require('../agents/fundamentalAgent');
const SentimentAgent = require('../agents/sentimentAgent');
const SynthesisAgent = require('../agents/synthesisAgent');
const { getMockData } = require('../data/mockData');

class Orchestrator {
  /**
   * Execute full analysis pipeline for a stock
   */
  async executeAnalysis(ticker) {
    logger.info(`🚀 [Orchestrator] Starting analysis for ${ticker}...`);
    const pipelineStartTime = Date.now();

    try {
      // Validate ticker
      const mockData = getMockData(ticker);
      if (!mockData) {
        throw new Error(`Stock ticker "${ticker}" not found in mock data. Available: TCS, INFY, RELIANCE`);
      }

      logger.info(`✅ [Orchestrator] Data loaded for ${ticker}`);

      // Initialize agents
      const technicalAgent = new TechnicalAgent(mockData);
      const fundamentalAgent = new FundamentalAgent(mockData);
      const sentimentAgent = new SentimentAgent(mockData);
      const synthesisAgent = new SynthesisAgent();

      // Execute agents in sequence (could be parallel for performance)
      logger.info(`📊 [Orchestrator] Executing agents...`);
      
      const technicalAnalysis = await technicalAgent.analyze(ticker);
      const fundamentalAnalysis = await fundamentalAgent.analyze(ticker);
      const sentimentAnalysis = await sentimentAgent.analyze(ticker);
      
      logger.info(`🔄 [Orchestrator] Synthesizing results...`);
      const synthesisAnalysis = await synthesisAgent.analyze(
        ticker,
        technicalAnalysis,
        fundamentalAnalysis,
        sentimentAnalysis
      );

      const pipelineExecutionTime = Date.now() - pipelineStartTime;

      // Compile final response
      const result = {
        status: 'success',
        ticker: ticker,
        company: mockData.company,
        currentPrice: mockData.currentPrice,
        marketCap: mockData.marketCap,
        pipelineExecutionTime: pipelineExecutionTime,
        timestamp: new Date().toISOString(),
        analysis: {
          technical: technicalAnalysis,
          fundamental: fundamentalAnalysis,
          sentiment: sentimentAnalysis,
          synthesis: synthesisAnalysis
        },
        recommendation: {
          action: synthesisAnalysis.analysis.recommendation,
          confidence: synthesisAnalysis.analysis.confidence,
          riskLevel: synthesisAnalysis.analysis.riskLevel,
          targetPrice: synthesisAnalysis.analysis.targetPrice,
          upside: synthesisAnalysis.analysis.upside,
          summary: synthesisAnalysis.summary,
          keyFactors: synthesisAnalysis.analysis.keyFactors,
          investorProfile: synthesisAnalysis.analysis.investorProfile
        },
        agentExecutionTrace: [
          {
            agent: 'TechnicalAgent',
            status: 'completed',
            executionTime: technicalAnalysis.executionTime
          },
          {
            agent: 'FundamentalAgent',
            status: 'completed',
            executionTime: fundamentalAnalysis.executionTime
          },
          {
            agent: 'SentimentAgent',
            status: 'completed',
            executionTime: sentimentAnalysis.executionTime
          },
          {
            agent: 'SynthesisAgent',
            status: 'completed',
            executionTime: synthesisAnalysis.executionTime
          }
        ]
      };

      logger.info(`✅ [Orchestrator] Analysis complete for ${ticker} in ${pipelineExecutionTime}ms`);
      logger.info(`📈 [Orchestrator] Recommendation: ${result.recommendation.action}`);

      return result;
    } catch (error) {
      logger.error(`❌ [Orchestrator] Error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new Orchestrator();
