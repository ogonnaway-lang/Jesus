import React, { useState } from 'react';
import { Search, Calendar, Trophy, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface FixtureSelectorProps {
  onAnalyze: (teamA: string, teamB: string, date: string, competition: string) => void;
  isLoading: boolean;
}

export const FixtureSelector: React.FC<FixtureSelectorProps> = ({ onAnalyze, isLoading }) => {
  const [teamA, setTeamA] = useState('Real Madrid');
  const [teamB, setTeamB] = useState('Barcelona');
  const [date, setDate] = useState('2026-10-25');
  const [competition, setCompetition] = useState('La Liga EA Sports');
  const [isPressed, setIsPressed] = useState(false);
  const [recentlyExecuted, setRecentlyExecuted] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const triggerPressFeedback = (e?: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true);
    setRecentlyExecuted(true);

    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      setRipples(prev => [...prev.slice(-2), newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }

    setTimeout(() => setIsPressed(false), 220);
    setTimeout(() => setRecentlyExecuted(false), 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamA.trim() || !teamB.trim()) return;
    triggerPressFeedback();
    onAnalyze(teamA.trim(), teamB.trim(), date.trim(), competition.trim());
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/40">
      <div className="mb-4 pb-3 border-b border-slate-800/80">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            Analyze Football Fixture
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Enter any two football clubs or national teams worldwide for complete mathematical probability breakdown.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Team A (Home) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Home Team (Team A)
            </label>
            <div className="relative">
              <input
                type="text"
                value={teamA}
                onChange={e => setTeamA(e.target.value)}
                required
                placeholder="e.g. Arsenal, Real Madrid, Inter"
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium"
              />
              <span className="absolute right-3 top-2.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                HOME
              </span>
            </div>
          </div>

          {/* Team B (Away) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Away Team (Team B)
            </label>
            <div className="relative">
              <input
                type="text"
                value={teamB}
                onChange={e => setTeamB(e.target.value)}
                required
                placeholder="e.g. Man City, Barcelona, Juventus"
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium"
              />
              <span className="absolute right-3 top-2.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                AWAY
              </span>
            </div>
          </div>

          {/* Match Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Match Date
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
            />
          </div>

          {/* Competition */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-slate-400" /> Competition
            </label>
            <input
              type="text"
              value={competition}
              onChange={e => setCompetition(e.target.value)}
              placeholder="e.g. Premier League, UCL, La Liga"
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
          <span className="text-slate-400 text-[11px] font-medium mr-1">Quick Select:</span>
          {[
            { a: 'Real Madrid', b: 'Barcelona', d: '2026-10-25', c: 'La Liga EA Sports', label: 'El Clásico' },
            { a: 'Arsenal', b: 'Chelsea', d: '2026-10-30', c: 'Premier League', label: 'London Derby' },
            { a: 'Inter Milan', b: 'Juventus', d: '2026-11-02', c: 'Serie A', label: 'Derby d\'Italia' },
            { a: 'Manchester City', b: 'San Marino', d: '2026-11-14', c: 'World Cup Qualifier', label: '⚡ 95%+ Straight Win: Man City' },
            { a: 'Bayern Munich', b: 'FC Rottach-Egern', d: '2026-07-20', c: 'Club Friendly Mismatch', label: '⚡ 95%+ Straight Win: Bayern' },
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setTeamA(item.a);
                setTeamB(item.b);
                setDate(item.d);
                setCompetition(item.c);
                onAnalyze(item.a, item.b, item.d, item.c);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer border ${
                item.label.includes('95%+')
                  ? 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border-emerald-500/40 font-mono shadow-sm'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            <span>Internal Dixon-Coles Poisson matrix ensures 100% mathematical probability consistency</span>
          </div>

          <button
            id="run-analysis-button"
            type="submit"
            onClick={e => triggerPressFeedback(e)}
            disabled={isLoading || !teamA || !teamB}
            className={`w-full sm:w-auto px-7 py-3 rounded-xl text-sm font-extrabold tracking-wide transition-all duration-150 relative overflow-hidden select-none touch-manipulation cursor-pointer flex items-center justify-center gap-2.5 min-h-[48px] ${
              recentlyExecuted
                ? 'bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.7)] ring-4 ring-emerald-300 scale-95'
                : 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5'
            } active:scale-95 active:translate-y-1 active:brightness-90 active:ring-4 active:ring-white/80 active:ring-offset-2 active:ring-offset-slate-900 active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
          >
            {/* Visual Click / Tap Wave Ripples */}
            {ripples.map(r => (
              <span
                key={r.id}
                className="absolute rounded-full bg-white/40 pointer-events-none animate-ping"
                style={{
                  left: r.x,
                  top: r.y,
                  width: 120,
                  height: 120,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}

            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span className="font-extrabold">Analyzing Fixture...</span>
              </>
            ) : recentlyExecuted ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-slate-950 animate-bounce" />
                <span className="font-extrabold text-slate-950">Analysis Executed!</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span className="font-extrabold">Run SMART BEAST Analysis</span>
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
