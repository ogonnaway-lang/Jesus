import React from 'react';
import { ShieldCheck, AlertOctagon, Info } from 'lucide-react';
import { QualifyingMarket } from '../types';

interface SafetyFilterBannerProps {
  status: '95%+ THRESHOLD REACHED' | 'NO 95%+ MARKET';
  reached: boolean;
  qualifyingMarkets: QualifyingMarket[];
}

export const SafetyFilterBanner: React.FC<SafetyFilterBannerProps> = ({
  status,
  reached,
  qualifyingMarkets,
}) => {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all shadow-lg ${
        reached
          ? 'bg-emerald-950/30 border-emerald-500/50 shadow-emerald-950/20'
          : 'bg-amber-950/25 border-amber-500/40 shadow-amber-950/20'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
              reached
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}
          >
            {reached ? (
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <AlertOctagon className="w-6 h-6 stroke-[2.5]" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                SAFETY FILTER ASSESSMENT
              </span>
              <span
                className={`font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
                  reached
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                }`}
              >
                {status}
              </span>
            </div>

            <p className="text-sm text-slate-200 mt-1 font-medium">
              {reached
                ? `Quantitative probability distribution verifies ${qualifyingMarkets.length} market selection(s) exceeding the rigorous 95.0% threshold.`
                : 'Due to balanced tactical parity and competitive outcome variance, no requested market meets the strict 95.0% statistical threshold.'}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Core Rule 2: Uninflated empirical confidence filter</span>
        </div>
      </div>

      {reached && qualifyingMarkets.length > 0 && (
        <div className="mt-4 pt-3.5 border-t border-emerald-800/40">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            Qualifying 95%+ Market Selections:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {qualifyingMarkets.slice(0, 6).map((q, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-200">{q.market}</span>
                  <span className="font-mono text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {q.probability.toFixed(1)}%
                  </span>
                </div>
                <div className="text-xs font-medium text-emerald-300/90 mt-1">{q.selection}</div>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{q.rationale}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
