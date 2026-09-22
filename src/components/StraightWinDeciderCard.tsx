import React from 'react';
import { MatchAnalysisResult } from '../types';
import { CheckCircle2, XCircle, ShieldAlert, Sparkles, Scale, ArrowRight, Zap } from 'lucide-react';

interface StraightWinDeciderCardProps {
  analysis: MatchAnalysisResult;
  onSelectPreset?: (teamA: string, teamB: string, date: string, competition: string) => void;
}

export const StraightWinDeciderCard: React.FC<StraightWinDeciderCardProps> = ({
  analysis,
  onSelectPreset,
}) => {
  const { straightWinDecision, fixture } = analysis;
  const {
    qualified,
    selectedTeam,
    selectionType,
    homeWinProb,
    awayWinProb,
    drawProb,
    verdict,
    tacticalProof,
    highestStraightWinProb,
    favoredTeam,
    governanceNote,
  } = straightWinDecision;

  return (
    <div
      id="straight-win-decider"
      className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 relative overflow-hidden shadow-xl ${
        qualified
          ? 'bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border-emerald-500/50 shadow-emerald-950/50'
          : 'bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border-slate-700/70'
      }`}
    >
      {/* Background Subtle Glow */}
      <div
        className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20 ${
          qualified ? 'bg-emerald-400' : 'bg-amber-400'
        }`}
      />

      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              qualified
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-amber-400'
            }`}
          >
            {qualified ? <CheckCircle2 className="w-6 h-6" /> : <Scale className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-display font-bold text-slate-100 tracking-wide uppercase">
                AI Straight Win 95% Decider
              </h3>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border ${
                  qualified
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                1X2 Home / Away Evaluator
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluates whether Home Win or Away Win mathematically satisfies the strict 95.0% certainty benchmark.
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono border ${
              qualified
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 animate-pulse'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}
          >
            {qualified ? (
              <>
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                95%+ Straight Win Confirmed
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 text-amber-400" />
                No 95% Straight Win Qualifier
              </>
            )}
          </span>
        </div>
      </div>

      {/* Decision Display */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Verdict Summary */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Quantitative AI Ruling</span>
            </div>
            <p
              className={`text-sm md:text-base font-semibold leading-snug ${
                qualified ? 'text-emerald-300' : 'text-slate-200'
              }`}
            >
              {verdict}
            </p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {tacticalProof}
            </p>
          </div>

          <p className="text-[11px] text-slate-500 italic flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span>{governanceNote}</span>
          </p>
        </div>

        {/* Right Probabilities Meter */}
        <div className="lg:col-span-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <div className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center justify-between">
            <span>Match Outcome Distribution</span>
            <span className="text-[11px] text-teal-400 font-semibold">95% Target Line</span>
          </div>

          {/* Home Win */}
          <div className="space-y-1 mb-2.5">
            <div className="flex justify-between text-xs font-medium">
              <span className={`truncate max-w-[170px] ${homeWinProb >= 95 ? 'text-emerald-300 font-bold' : 'text-slate-300'}`}>
                {fixture.teamA} (Home Win)
              </span>
              <span className={`font-mono font-bold ${homeWinProb >= 95 ? 'text-emerald-400 text-sm' : 'text-slate-300'}`}>
                {homeWinProb.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  homeWinProb >= 95 ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]' : 'bg-teal-500/80'
                }`}
                style={{ width: `${Math.min(100, homeWinProb)}%` }}
              />
              {/* 95% target marker line */}
              <div className="absolute top-0 bottom-0 left-[95%] w-0.5 bg-amber-400/90 z-10" />
            </div>
          </div>

          {/* Draw */}
          <div className="space-y-1 mb-2.5">
            <div className="flex justify-between text-xs font-medium text-slate-400">
              <span>Draw Parity</span>
              <span className="font-mono">{drawProb.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden relative">
              <div
                className="bg-slate-500/60 h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, drawProb)}%` }}
              />
              <div className="absolute top-0 bottom-0 left-[95%] w-0.5 bg-amber-400/50 z-10" />
            </div>
          </div>

          {/* Away Win */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className={`truncate max-w-[170px] ${awayWinProb >= 95 ? 'text-emerald-300 font-bold' : 'text-slate-300'}`}>
                {fixture.teamB} (Away Win)
              </span>
              <span className={`font-mono font-bold ${awayWinProb >= 95 ? 'text-emerald-400 text-sm' : 'text-slate-300'}`}>
                {awayWinProb.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  awayWinProb >= 95 ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]' : 'bg-purple-500/80'
                }`}
                style={{ width: `${Math.min(100, awayWinProb)}%` }}
              />
              <div className="absolute top-0 bottom-0 left-[95%] w-0.5 bg-amber-400/90 z-10" />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Highest Straight Win:</span>
            <span className="font-mono font-semibold text-slate-200">
              {favoredTeam} ({highestStraightWinProb.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Preset Mismatch Testing (to show what a real 95% straight win looks like) */}
      {onSelectPreset && (
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span>Test a true 95%+ Straight Win mismatch:</span>
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onSelectPreset('Manchester City', 'San Marino', '2026-11-14', 'World Cup Qualifier')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md text-[11px] font-mono border border-slate-700 transition flex items-center gap-1 cursor-pointer"
            >
              <span>Man City vs San Marino</span>
              <ArrowRight className="w-3 h-3 text-teal-400" />
            </button>
            <button
              onClick={() => onSelectPreset('Bayern Munich', 'FC Rottach-Egern', '2026-07-20', 'Club Friendly Mismatch')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md text-[11px] font-mono border border-slate-700 transition flex items-center gap-1 cursor-pointer"
            >
              <span>Bayern vs Rottach-Egern</span>
              <ArrowRight className="w-3 h-3 text-teal-400" />
            </button>
            <button
              onClick={() => onSelectPreset('Real Madrid', 'Minnow FC', '2026-01-08', 'Copa del Rey Round 1')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md text-[11px] font-mono border border-slate-700 transition flex items-center gap-1 cursor-pointer"
            >
              <span>Real Madrid vs Minnow</span>
              <ArrowRight className="w-3 h-3 text-teal-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
