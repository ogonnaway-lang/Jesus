import React from 'react';
import { Shield, Sparkles, Activity, Award } from 'lucide-react';

interface HeaderProps {
  geminiActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({ geminiActive }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
            <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-bold text-xl tracking-wider text-slate-100 uppercase">
                The SMART BEAST
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                QUANT PRO
              </span>
              <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-800 text-teal-300 border border-teal-500/30 rounded-full font-mono">
                Programmed by oway
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              40+ Years Worldwide Football Probability & Statistical Betting Analyst • <span className="text-slate-300 font-semibold">Programmed by oway</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px]">BIVARIATE POISSON + DIXON-COLES</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[11px]">
              {geminiActive ? 'GEMINI TACTICAL ACTIVE' : 'STATISTICAL ENGINE ONLINE'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-700/40 text-emerald-300">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium text-[11px]">95% THRESHOLD FILTER</span>
          </div>
        </div>
      </div>
    </header>
  );
};
