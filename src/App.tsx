import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FixtureSelector } from './components/FixtureSelector';
import { SafetyFilterBanner } from './components/SafetyFilterBanner';
import { StraightWinDeciderCard } from './components/StraightWinDeciderCard';
import { ExpertSummaryCard } from './components/ExpertSummaryCard';
import { BestMarketsCard } from './components/BestMarketsCard';
import { PredictionMatrixTable } from './components/PredictionMatrixTable';
import { TacticalDossier } from './components/TacticalDossier';
import { MarkdownExportModal } from './components/MarkdownExportModal';
import { MatchAnalysisResult } from './types';
import { computeFixtureProbabilities } from './utils/footballEngine';
import { Code, Share2, Sparkles, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [analysis, setAnalysis] = useState<MatchAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [geminiActive, setGeminiActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Initial load
  useEffect(() => {
    // Check health
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.geminiEnabled) setGeminiActive(true);
      })
      .catch(() => {
        // standalone mode
      });

    // Run initial marquee analysis
    handleRunAnalysis('Real Madrid', 'Barcelona', '2026-10-25', 'La Liga EA Sports');
  }, []);

  const handleRunAnalysis = async (
    teamA: string,
    teamB: string,
    date: string,
    competition: string
  ) => {
    setErrorMsg(null);

    // ⚡ INSTANT RESPONSE: Compute Dixon-Coles Poisson probabilities immediately in 0ms
    const instantData = computeFixtureProbabilities(teamA, teamB, date, competition);
    setAnalysis(instantData);

    // Concurrently fetch server/cache/AI enhancements in background without blocking the UI
    try {
      const response = await fetch('/api/analyze-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamA, teamB, date, competition }),
      });

      if (response.ok) {
        const enrichedData: MatchAnalysisResult = await response.json();
        setAnalysis(enrichedData);
      }
    } catch (err) {
      // Seamlessly keep instant statistical calculation
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header */}
      <Header geminiActive={geminiActive} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Fixture Selector & Search Input */}
        <FixtureSelector onAnalyze={handleRunAnalysis} isLoading={isLoading} />

        {errorMsg && (
          <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {analysis && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Fixture Subheader Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-display font-bold text-sm">
                  VS
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-100">
                    {analysis.fixture.teamA} <span className="text-slate-400 font-normal">vs</span>{' '}
                    {analysis.fixture.teamB}
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="font-medium text-emerald-400">{analysis.fixture.competition}</span>
                    <span>•</span>
                    <span className="font-mono">{analysis.fixture.date}</span>
                    <span>•</span>
                    <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                      Calculated: {new Date(analysis.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5 text-emerald-400" />
                  <span>View Raw Markdown</span>
                </button>

                <button
                  onClick={() =>
                    handleRunAnalysis(
                      analysis.fixture.teamA,
                      analysis.fixture.teamB,
                      analysis.fixture.date,
                      analysis.fixture.competition
                    )
                  }
                  disabled={isLoading}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                  title="Re-run statistical simulation"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
                </button>
              </div>
            </div>

            {/* AI STRAIGHT WIN 95% DECIDER (Home or Away) */}
            {analysis.straightWinDecision && (
              <StraightWinDeciderCard
                analysis={analysis}
                onSelectPreset={(teamA, teamB, date, competition) =>
                  handleRunAnalysis(teamA, teamB, date, competition)
                }
              />
            )}

            {/* SAFETY FILTER BANNER (Core Rule 2) */}
            <SafetyFilterBanner
              status={analysis.safetyFilter.status}
              reached={analysis.safetyFilter.reached}
              qualifyingMarkets={analysis.safetyFilter.qualifyingMarkets}
            />

            {/* EXPERT SUMMARY CARD (Strict 2 sentences) */}
            <ExpertSummaryCard
              verdictSentence={analysis.expertSummary.verdictSentence}
              warningSentence={analysis.expertSummary.warningSentence}
            />

            {/* BEST AVAILABLE MARKETS (Top 3 by estimated probability) */}
            <BestMarketsCard markets={analysis.bestMarkets} />

            {/* PREDICTION MATRIX TABLE (All Requested Markets) */}
            <PredictionMatrixTable analysis={analysis} />

            {/* TACTICAL DOSSIER (Rule 1 & Rule 4 data analysis) */}
            <TacticalDossier analysis={analysis} />
          </div>
        )}
      </main>

      {/* Raw Markdown Export Popover */}
      {analysis && (
        <MarkdownExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          markdownContent={analysis.rawMarkdownMatrix}
          title={`${analysis.fixture.teamA} vs ${analysis.fixture.teamB}`}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>The SMART BEAST™</strong> — 40+ Years Worldwide Football Quantitative Analysis.
              </span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="font-semibold text-teal-300 bg-teal-950/70 border border-teal-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-mono shadow-sm">
              Programmed by oway
            </span>
          </div>

          <p className="text-center md:text-right text-[11px] text-slate-400 max-w-xl">
            FINAL REMINDER: Statistical models estimate empirical probabilities based on historical goal rates,
            possession efficiency, and tactical variance. No outcome in sports betting is guaranteed. Only gamble with funds
            you can afford to lose.
          </p>
        </div>
      </footer>
    </div>
  );
}
