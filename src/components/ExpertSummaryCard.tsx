import React, { useState } from 'react';
import { FileText, Copy, Check, ShieldAlert } from 'lucide-react';

interface ExpertSummaryCardProps {
  verdictSentence: string;
  warningSentence: string;
}

export const ExpertSummaryCard: React.FC<ExpertSummaryCardProps> = ({
  verdictSentence,
  warningSentence,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `1. VERDICT: ${verdictSentence}\n2. WARNING: ${warningSentence}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Expert Summary (Strict 2-Sentence Directive)
            </h3>
            <span className="text-[11px] text-slate-400">
              Mandatory dual-sentence verdict & statistical governance
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Summary</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {/* Sentence 1: VERDICT */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3">
          <span className="shrink-0 font-mono text-[11px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mt-0.5">
            1. VERDICT
          </span>
          <p className="text-sm text-slate-200 font-medium leading-relaxed">
            {verdictSentence}
          </p>
        </div>

        {/* Sentence 2: WARNING */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3">
          <span className="shrink-0 font-mono text-[11px] font-extrabold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 mt-0.5 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            2. WARNING
          </span>
          <p className="text-sm text-slate-200 font-medium leading-relaxed">
            {warningSentence}
          </p>
        </div>
      </div>
    </div>
  );
};
