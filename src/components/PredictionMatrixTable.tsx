import React, { useState } from 'react';
import { Table, Layers, ArrowUpDown, Copy, Check, Filter } from 'lucide-react';
import { MatchAnalysisResult } from '../types';

interface PredictionMatrixTableProps {
  analysis: MatchAnalysisResult;
}

export const PredictionMatrixTable: React.FC<PredictionMatrixTableProps> = ({ analysis }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'outcomes' | 'ft_goals' | 'halves' | 'team_goals' | 'scores'>('all');
  const [copied, setCopied] = useState(false);

  const {
    fixture,
    matchOutcome,
    homeOrAway,
    fullTimeGoalLines,
    firstHalfGoalLines,
    secondHalfGoalLines,
    homeTeamGoalLines,
    awayTeamGoalLines,
    btts,
    correctScoresFT,
    correctScoresHT,
    correctScores2H,
    combos,
  } = analysis;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(analysis.rawMarkdownMatrix);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/40">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Table className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">
              Prediction Matrix (All Requested Markets)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Statistical probability distribution for every requested market ({fixture.teamA} vs {fixture.teamB})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Table</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Matrix Table</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-3 text-xs">
        <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px] uppercase tracking-wider mr-1">
          <Filter className="w-3 h-3 text-slate-500" /> Filter:
        </span>
        {[
          { id: 'all', label: 'All Markets' },
          { id: 'outcomes', label: '1X2 & Outcomes' },
          { id: 'ft_goals', label: 'FT Goal Lines' },
          { id: 'halves', label: '1H & 2H Lines' },
          { id: 'team_goals', label: 'Team Goals' },
          { id: 'scores', label: 'Scores & Combos' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              filterCategory === tab.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/70">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 w-1/4">Market</th>
              <th className="py-3 px-4 w-2/5">Prediction Options</th>
              <th className="py-3 px-4 w-1/3">Statistical Probability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {/* MATCH OUTCOME 1X2 */}
            {(filterCategory === 'all' || filterCategory === 'outcomes') && (
              <>
                <tr className={`transition-colors ${matchOutcome.homeWin >= 95 || matchOutcome.awayWin >= 95 ? 'bg-emerald-950/20 hover:bg-emerald-950/30' : 'hover:bg-slate-800/30'}`}>
                  <td className="py-3 px-4 font-semibold text-slate-200">
                    <div className="flex items-center gap-2">
                      <span>Match Outcome (1X2)</span>
                      {(matchOutcome.homeWin >= 95 || matchOutcome.awayWin >= 95) && (
                        <span className="text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded">
                          95%+ Straight Win
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <span className={`font-medium ${matchOutcome.homeWin >= 95 ? 'text-emerald-300 font-bold' : 'text-slate-100'}`}>
                      {fixture.teamA} Win
                    </span>{' '}
                    / Draw /{' '}
                    <span className={`font-medium ${matchOutcome.awayWin >= 95 ? 'text-emerald-300 font-bold' : 'text-slate-100'}`}>
                      {fixture.teamB} Win
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded border ${
                        matchOutcome.homeWin >= 95
                          ? 'text-emerald-300 bg-emerald-900/60 border-emerald-400 font-bold'
                          : 'text-emerald-400 bg-emerald-950/50 border-emerald-500/20'
                      }`}>
                        {matchOutcome.homeWin.toFixed(1)}%
                      </span>
                      <span className="text-slate-400">/</span>
                      <span className="text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/20">
                        {matchOutcome.draw.toFixed(1)}%
                      </span>
                      <span className="text-slate-400">/</span>
                      <span className={`px-2 py-0.5 rounded border ${
                        matchOutcome.awayWin >= 95
                          ? 'text-emerald-300 bg-emerald-900/60 border-emerald-400 font-bold'
                          : 'text-cyan-400 bg-cyan-950/50 border-cyan-500/20'
                      }`}>
                        {matchOutcome.awayWin.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>

                {/* HOME OR AWAY */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200">Home or Away</td>
                  <td className="py-3 px-4 text-slate-300">
                    {fixture.teamA} / {fixture.teamB}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">{homeOrAway.home.toFixed(1)}%</span>
                      <span className="text-slate-400">/</span>
                      <span className="text-cyan-400">{homeOrAway.away.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              </>
            )}

            {/* FULL TIME GOAL LINES (0.5 to 6.5) */}
            {(filterCategory === 'all' || filterCategory === 'ft_goals') &&
              fullTimeGoalLines.map(line => (
                <tr key={`ft-${line.line}`} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200">Goal Line</td>
                  <td className="py-3 px-4 text-slate-300">{line.line}</td>
                  <td className="py-3 px-4 font-mono font-bold">
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          line.overProb >= 95
                            ? 'text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-400'
                            : 'text-slate-200'
                        }
                      >
                        Over: {line.overProb.toFixed(1)}%
                      </span>
                      <span className="text-slate-500">/</span>
                      <span
                        className={
                          line.underProb >= 95
                            ? 'text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-400'
                            : 'text-slate-200'
                        }
                      >
                        Under: {line.underProb.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

            {/* FIRST HALF GOAL LINES (0.5 to 6.5) */}
            {(filterCategory === 'all' || filterCategory === 'halves') &&
              firstHalfGoalLines.map(line => (
                <tr key={`1h-${line.line}`} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">1H</span>
                    First Half
                  </td>
                  <td className="py-3 px-4 text-slate-300">{line.line}</td>
                  <td className="py-3 px-4 font-mono font-bold">
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          line.overProb >= 95
                            ? 'text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-400'
                            : 'text-slate-200'
                        }
                      >
                        Over: {line.overProb.toFixed(1)}%
                      </span>
                      <span className="text-slate-500">/</span>
                      <span
                        className={
                          line.underProb >= 95
                            ? 'text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-400'
                            : 'text-slate-200'
                        }
                      >
                        Under: {line.underProb.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

            {/* SECOND HALF GOAL LINES (0.5 to 6.5) */}
            {(filterCategory === 'all' || filterCategory === 'halves') &&
              secondHalfGoalLines.map(line => (
                <tr key={`2h-${line.line}`} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">2H</span>
                    Second Half
                  </td>
                  <td className="py-3 px-4 text-slate-300">{line.line}</td>
                  <td className="py-3 px-4 font-mono font-bold">
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          line.overProb >= 95
                            ? 'text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-400'
                            : 'text-slate-200'
                        }
                      >
                        Over: {line.overProb.toFixed(1)}%
                      </span>
                      <span className="text-slate-500">/</span>
                      <span
                        className={
                          line.underProb >= 95
                            ? 'text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-400'
                            : 'text-slate-200'
                        }
                      >
                        Under: {line.underProb.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

            {/* HOME TEAM GOALS */}
            {(filterCategory === 'all' || filterCategory === 'team_goals') && (
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-200">
                  Home Team Goals ({fixture.teamA})
                </td>
                <td className="py-3 px-4 text-slate-300">Over/Under 0.5 - 6.5</td>
                <td className="py-3 px-4 font-mono text-[11px] leading-relaxed">
                  <div className="flex flex-wrap gap-2">
                    {homeTeamGoalLines.map(l => (
                      <span
                        key={l.line}
                        className={`px-2 py-1 rounded border ${
                          l.underProb >= 95 || l.overProb >= 95
                            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        {l.line.split(' ')[1]}: O {l.overProb.toFixed(1)}% / U {l.underProb.toFixed(1)}%
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {/* AWAY TEAM GOALS */}
            {(filterCategory === 'all' || filterCategory === 'team_goals') && (
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-200">
                  Away Team Goals ({fixture.teamB})
                </td>
                <td className="py-3 px-4 text-slate-300">Over/Under 0.5 - 6.5</td>
                <td className="py-3 px-4 font-mono text-[11px] leading-relaxed">
                  <div className="flex flex-wrap gap-2">
                    {awayTeamGoalLines.map(l => (
                      <span
                        key={l.line}
                        className={`px-2 py-1 rounded border ${
                          l.underProb >= 95 || l.overProb >= 95
                            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        {l.line.split(' ')[1]}: O {l.overProb.toFixed(1)}% / U {l.underProb.toFixed(1)}%
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {/* BOTH TEAMS TO SCORE */}
            {(filterCategory === 'all' || filterCategory === 'scores') && (
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-200">Both Teams To Score</td>
                <td className="py-3 px-4 text-slate-300">GG (Yes) / NG (No)</td>
                <td className="py-3 px-4 font-mono font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-teal-400 bg-teal-950/40 px-2 py-0.5 rounded border border-teal-500/20">
                      GG: {btts.ggYes.toFixed(1)}%
                    </span>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-300 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700">
                      NG: {btts.ngNo.toFixed(1)}%
                    </span>
                  </div>
                </td>
              </tr>
            )}

            {/* CORRECT SCORE FT */}
            {(filterCategory === 'all' || filterCategory === 'scores') && (
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-200">Correct Score FT</td>
                <td className="py-3 px-4 text-slate-300">3 most likely scores</td>
                <td className="py-3 px-4 font-mono font-bold">
                  <div className="flex items-center gap-2 flex-wrap">
                    {correctScoresFT.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-900 px-2.5 py-1 rounded border border-slate-700/80 text-emerald-300"
                      >
                        {s.score} <span className="text-slate-400 text-[11px]">({s.probability.toFixed(1)}%)</span>
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {/* CORRECT SCORE HT */}
            {(filterCategory === 'all' || filterCategory === 'scores') && (
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-200">Correct Score HT</td>
                <td className="py-3 px-4 text-slate-300">2 most likely scores</td>
                <td className="py-3 px-4 font-mono font-bold">
                  <div className="flex items-center gap-2 flex-wrap">
                    {correctScoresHT.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-900 px-2.5 py-1 rounded border border-slate-700/80 text-cyan-300"
                      >
                        {s.score} <span className="text-slate-400 text-[11px]">({s.probability.toFixed(1)}%)</span>
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {/* CORRECT SCORE 2H */}
            {(filterCategory === 'all' || filterCategory === 'scores') && (
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-200">Correct Score 2H</td>
                <td className="py-3 px-4 text-slate-300">2 most likely second-half-only scores</td>
                <td className="py-3 px-4 font-mono font-bold">
                  <div className="flex items-center gap-2 flex-wrap">
                    {correctScores2H.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-900 px-2.5 py-1 rounded border border-slate-700/80 text-cyan-300"
                      >
                        {s.score} <span className="text-slate-400 text-[11px]">({s.probability.toFixed(1)}%)</span>
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            )}

            {/* COMBO BETS */}
            {(filterCategory === 'all' || filterCategory === 'scores') && (
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-200">Combo Bets</td>
                <td className="py-3 px-4 text-slate-300">Home Win + GG / Away Win + GG</td>
                <td className="py-3 px-4 font-mono font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/20">
                      Home + GG: {combos.homeWinPlusGG.toFixed(1)}%
                    </span>
                    <span className="text-slate-500">/</span>
                    <span className="text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/20">
                      Away + GG: {combos.awayWinPlusGG.toFixed(1)}%
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
