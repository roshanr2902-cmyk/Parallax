import { useEffect, useState } from 'react'

const stocks = {
  TCS: { price: '3,421.50', change: '+1.82%', tone: 'up', code: 'TCS · NSE' },
  Infosys: { price: '1,568.35', change: '+0.94%', tone: 'up', code: 'INFY · NSE' },
  Reliance: { price: '2,944.80', change: '+2.31%', tone: 'up', code: 'RELIANCE · NSE' },
  'HDFC Bank': { price: '1,738.20', change: '-0.42%', tone: 'down', code: 'HDFCBANK · NSE' },
  Apple: { price: '227.16', change: '+1.14%', tone: 'up', code: 'AAPL · NASDAQ' },
}

const signals = [
  ['↗', 'Momentum', 'BULLISH', '82%', 'Price action is holding above key moving averages.', 'positive'],
  ['▥', 'Volume', 'MODERATE', '76%', 'Participation is steady with room for confirmation.', 'neutral'],
  ['◉', 'Sentiment', 'POSITIVE', '88%', 'Recent coverage leans constructive on the outlook.', 'positive'],
  ['◌', 'Fundamentals', 'NEUTRAL', '71%', 'Strong quality is balanced by a full valuation.', 'neutral'],
  ['◇', 'Risk', 'MEDIUM', '5.8/10', 'Volatility is elevated but within your comfort range.', 'warning'],
]

const pipeline = ['Technical Agent', 'Fundamental Agent', 'Sentiment Agent', 'Risk Engine', 'Synthesis Agent']
const loadingSteps = ['Retrieving market data...', 'Running Technical Agent...', 'Running Fundamental Agent...', 'Running Sentiment Agent...', 'Synthesizing intelligence...']

function SectionHeading({ eyebrow, title, action }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{action}</div>
}

function SignalCard({ signal }) {
  const [icon, title, status, value, explanation, tone] = signal
  const progress = value.includes('/') ? 58 : Number.parseInt(value, 10)
  return <article className="signal-card">
    <div className={`signal-icon ${tone}`}>{icon}</div><div className="signal-copy"><div className="signal-title"><h3>{title}</h3><span className={`status ${tone}`}>{status}</span></div><p>{explanation}</p><div className="progress-row"><div className="progress"><i style={{ width: `${progress}%` }} /></div><strong>{value}</strong></div></div>
  </article>
}

function PriceChart({ tone }) {
  return <div className="chart-wrap"><div className="chart-labels"><span>3,500</span><span>3,400</span><span>3,300</span><span>3,200</span></div><svg className="price-chart" viewBox="0 0 700 230" preserveAspectRatio="none" role="img" aria-label="Mock stock price chart trending upward"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={tone === 'down' ? '#f27b86' : '#52d7a4'} stopOpacity=".28" /><stop offset="100%" stopColor={tone === 'down' ? '#f27b86' : '#52d7a4'} stopOpacity="0" /></linearGradient></defs><path className="chart-area" fill="url(#chartFill)" d="M0 183 C35 167 48 174 72 151 S117 148 137 125 S174 141 198 115 S232 131 257 100 S305 119 332 89 S363 104 389 72 S428 80 449 57 S481 74 509 42 S547 62 574 34 S625 47 700 12 V230 H0Z" /><path className="chart-line" stroke={tone === 'down' ? '#f27b86' : '#52d7a4'} d="M0 183 C35 167 48 174 72 151 S117 148 137 125 S174 141 198 115 S232 131 257 100 S305 119 332 89 S363 104 389 72 S428 80 449 57 S481 74 509 42 S547 62 574 34 S625 47 700 12" /></svg><div className="chart-dates"><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span></div></div>
}

function Dashboard() {
  const [selectedStock, setSelectedStock] = useState('TCS')
  const [analysisState, setAnalysisState] = useState('idle')
  const [step, setStep] = useState(0)
  const stock = stocks[selectedStock]

  useEffect(() => {
    if (analysisState !== 'loading') return undefined
    if (step >= loadingSteps.length) { setAnalysisState('complete'); return undefined }
    const timer = setTimeout(() => setStep((current) => current + 1), 650)
    return () => clearTimeout(timer)
  }, [analysisState, step])

  const analyze = () => { setStep(0); setAnalysisState('loading') }

  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><span className="brand-mark">F</span><span>FINVISTA <b>AI</b></span></div><div className="side-label">Workspace</div><nav>{[['⌂', 'Dashboard'], ['✦', 'AI Agents'], ['◫', 'Portfolio'], ['◎', 'Risk Profile'], ['◷', 'Analysis History']].map(([icon, label], index) => <button className={index === 0 ? 'active' : ''} key={label}><span>{icon}</span>{label}{index === 0 && <i />}</button>)}</nav><div className="sidebar-foot"><span className="live-dot" />Market data live<div className="version">FINVISTA 2.0 <span>HACKVERSE</span></div></div></aside>
    <main className="main-content"><header className="topbar"><div className="mobile-brand"><span className="brand-mark">F</span> FINVISTA AI</div><label className="search-box"><span>⌕</span><select value={selectedStock} onChange={(event) => setSelectedStock(event.target.value)} aria-label="Select stock">{Object.keys(stocks).map((name) => <option key={name}>{name}</option>)}</select><kbd>⌘ K</kbd></label><button className="analyze-button" onClick={analyze}><span>✦</span> Analyze</button><div className="top-divider" /><div className="market-pill"><span className="live-dot" />MARKET <strong>OPEN</strong></div><div className="profile"><span className="avatar">AR</span><span><b>Alex Rao</b><small>MODERATE RISK</small></span><span className="chevron">⌄</span></div></header>
      <div className="content-inner"><div className="welcome-row"><div><span className="eyebrow">MONDAY, 24 JUNE 2026</span><h1>Good morning, Alex <span>✦</span></h1><p>Your market intelligence workspace is ready.</p></div><div className="time-chip"><span className="live-dot" />NSE <b>10:42:18 IST</b></div></div>
        {analysisState !== 'idle' && <div className={`analysis-banner ${analysisState}`}><div className="banner-icon">{analysisState === 'complete' ? '✓' : '◌'}</div><div><strong>{analysisState === 'complete' ? 'Analysis Complete ✓' : loadingSteps[Math.min(step, loadingSteps.length - 1)]}</strong><span>{analysisState === 'complete' ? 'Fresh intelligence synthesized for your watchlist.' : `Step ${Math.min(step + 1, loadingSteps.length)} of ${loadingSteps.length}`}</span></div>{analysisState === 'loading' && <div className="banner-progress"><i style={{ width: `${(step / loadingSteps.length) * 100}%` }} /></div>}</div>}
        <SectionHeading eyebrow="MARKET SNAPSHOT" title="Stock overview" action={<span className="updated">Updated just now <span className="live-dot" /></span>} />
        <section className="overview-grid"><article className="price-card"><div className="price-top"><div><span className="stock-code">{stock.code}</span><h3>{selectedStock}</h3></div><span className="market-open"><span className="live-dot" /> OPEN</span></div><div className="price-line"><strong>₹{stock.price}</strong><span className={stock.tone}>{stock.change}</span></div><span className="today-label">Today <b>•</b> Real-time demo data</span><PriceChart tone={stock.tone} /></article><div className="stats-column"><div className="mini-stat"><span>DAY RANGE</span><strong>3,385.20 <em>—</em> 3,451.75</strong><div className="range-line"><i /></div></div><div className="mini-stat"><span>52W PERFORMANCE</span><strong className="positive">+24.68%</strong><small>Outperforming NIFTY 50 <b>+12.4%</b></small></div><div className="mini-stat"><span>MARKET CAP</span><strong>₹12.42T</strong><small>Large cap <b className="neutral-text">Stable</b></small></div></div></section>
        <SectionHeading eyebrow="SIGNAL MATRIX" title="AI signal cards" action={<span className="signal-legend"><i className="positive" /> Bullish <i className="neutral" /> Neutral <i className="warning" /> Watch</span>} />
        <section className="signal-grid">{signals.map((signal) => <SignalCard signal={signal} key={signal[1]} />)}</section>
        <section className="intel-layout"><article className="intel-card"><div className="intel-top"><div><span className="eyebrow">AI MARKET INTELLIGENCE</span><h2>Overall signal</h2></div><div className="bullish-badge"><span>↗</span> BULLISH</div></div><div className="confidence"><strong>81<span>%</span></strong><div><span>CONFIDENCE SCORE</span><div className="confidence-bar"><i /></div></div></div><p className="intel-copy">Technical momentum and market sentiment remain positive, while fundamental indicators are mixed.</p><div className="factor-list"><span className="positive">✓ Positive momentum</span><span className="positive">✓ Positive sentiment</span><span className="warning">⚠ Mixed fundamentals</span><span className="warning">⚠ Moderate volatility</span></div></article><article className="pipeline-card"><SectionHeading eyebrow="AGENT ORCHESTRATION" title="Multi-agent pipeline" action={<span className="complete-label">5 / 5 COMPLETE</span>} /><div className="pipeline">{pipeline.map((agent, index) => <div className="agent-step" key={agent}><div className="agent-check">✓</div><span>{agent}</span>{index < pipeline.length - 1 && <i />}</div>)}</div><p className="pipeline-note">Five specialized agents collaborated to produce this synthesis.</p></article></section>
        <section className="bottom-layout"><article className="sources-card"><SectionHeading eyebrow="VERIFIABLE INPUTS" title="Sources & evidence" action={<button className="text-button">View all <span>→</span></button>} /><div className="source-list">{[['▤', 'Financial Filing', 'Company Annual Report', '86%', 'purple'], ['⌁', 'Market Data', 'Demo Market Feed', '91%', 'green'], ['▧', 'News', 'Recent Company News', '82%', 'orange']].map(([icon, type, detail, relevance, tone]) => <div className="source-row" key={type}><div className={`source-icon ${tone}`}>{icon}</div><div><strong>{type}</strong><span>{detail}</span></div><div className="relevance"><span>RELEVANCE</span><b>{relevance}</b></div><span className="external">↗</span></div>)}</div></article><article className="risk-card"><div className="risk-header"><span className="eyebrow">RISK-ADJUSTED INSIGHT</span><span className="status warning">MEDIUM</span></div><h2>Moderate risk</h2><div className="risk-score"><strong>5.8</strong><span>/10<br /><small>RISK SCORE</small></span><div className="risk-meter"><i /></div></div><p>Based on your moderate-risk profile, current positive momentum may be attractive, but elevated volatility should be considered.</p><footer>AI-generated financial information. Not professional financial advice.</footer></article></section>
      </div></main>
  </div>
}

export default Dashboard