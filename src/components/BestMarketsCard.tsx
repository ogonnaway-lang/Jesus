import React from 'react';
import { Target, TrendingUp, BarChart3 } from 'lucide-react';
import { BestMarket } from '../types';

interface BestMarketsCardProps {
  markets: BestMarket[];
}

export const BestMarketsCard: React.FC<BestMarketsCardProps> = ({ markets }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/40">
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Best Available Markets (Top 3 by Estimated Probability)
            </h3>
            <p className="text-[11px] text-slate-400">
              Reported objectively by statistical probability and quantitative rationale (no subjective ranking).
            </p>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
          <BarChart3 className="w-3.5 h-3.5 text-teal-400" />
          <span>MAX 3 SELECTIONS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {markets.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  MARKET {index + 1}: {item.market}
                </span>
                <span className="font-mono text-sm font-black text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {item.probability.toFixed(1)}%
                </span>
              </div>

              <div className="text-base font-bold text-slate-100 mb-2">
                {item.selection}
              </div>

              {/* Progress visual */}
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden mb-3">
                <div
                  className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, item.probability))}%` }}
                ></div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                <span className="font-semibold text-slate-400 text-[11px] block mb-0.5">
                  Supporting Statistical Reason:
                </span>
                {item.reasons}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
