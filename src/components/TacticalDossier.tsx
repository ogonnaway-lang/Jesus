import React from 'react';
import { Activity, Shield, Users, Crosshair, AlertCircle, Calendar } from 'lucide-react';
import { MatchAnalysisResult } from '../types';

interface TacticalDossierProps {
  analysis: MatchAnalysisResult;
}

export const TacticalDossier: React.FC<TacticalDossierProps> = ({ analysis }) => {
  const { fixture, expectedGoals, form, h2h, tacticalNotes, teamNews, fixtureContext, dataLimitations } = analysis;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/40 space-y-5">
      {/* Title */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Smart Beast 40-Year Tactical & Statistical Dossier
            </h3>
            <p className="text-[11px] text-slate-400">
              Form curves, H2H historical patterns, expected goals (xG), and situational fixture context
            </p>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
          CORE RULE 1 COMPLIANT
        </div>
      </div>

      {/* xG & Match Dynamics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
            <Crosshair className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {fixture.teamA} xG (Home)
            </div>
            <div className="text-xl font-display font-bold text-emerald-400 font-mono">
              {expectedGoals.home.toFixed(2)}{' '}
              <span className="text-xs text-slate-400 font-normal">goals</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold shrink-0">
            <Crosshair className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {fixture.teamB} xG (Away)
            </div>
            <div className="text-xl font-display font-bold text-cyan-400 font-mono">
              {expectedGoals.away.toFixed(2)}{' '}
              <span className="text-xs text-slate-400 font-normal">goals</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Combined Match xG
            </div>
            <div className="text-xl font-display font-bold text-amber-400 font-mono">
              {expectedGoals.total.toFixed(2)}{' '}
              <span className="text-xs text-slate-400 font-normal">expected pace</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Teams Form Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Team A */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800">
            <span className="text-sm font-bold text-emerald-400">{fixture.teamA} (Home)</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-400 mr-1">L5 FORM:</span>
              {form.teamA.recent.map((res, i) => (
                <span
                  key={i}
                  className={`w-5 h-5 rounded-md text-[10px] font-extrabold flex items-center justify-center ${
                    res === 'W'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : res === 'D'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {res}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Avg Goals Scored:</span>
              <span className="font-mono font-bold text-slate-100">{form.teamA.scoredPerGame.toFixed(2)} / match</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Avg Conceded:</span>
              <span className="font-mono font-bold text-slate-100">{form.teamA.concededPerGame.toFixed(2)} / match</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Clean Sheet Rate:</span>
              <span className="font-mono font-bold text-emerald-400">{(form.teamA.cleanSheetRate * 100).toFixed(0)}%</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Both Teams To Score Rate:</span>
              <span className="font-mono font-bold text-teal-400">{(form.teamA.bttsRate * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Team B */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800">
            <span className="text-sm font-bold text-cyan-400">{fixture.teamB} (Away)</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-400 mr-1">L5 FORM:</span>
              {form.teamB.recent.map((res, i) => (
                <span
                  key={i}
                  className={`w-5 h-5 rounded-md text-[10px] font-extrabold flex items-center justify-center ${
                    res === 'W'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : res === 'D'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {res}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Avg Goals Scored:</span>
              <span className="font-mono font-bold text-slate-100">{form.teamB.scoredPerGame.toFixed(2)} / match</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Avg Conceded:</span>
              <span className="font-mono font-bold text-slate-100">{form.teamB.concededPerGame.toFixed(2)} / match</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Clean Sheet Rate:</span>
              <span className="font-mono font-bold text-cyan-400">{(form.teamB.cleanSheetRate * 100).toFixed(0)}%</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Both Teams To Score Rate:</span>
              <span className="font-mono font-bold text-teal-400">{(form.teamB.bttsRate * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Head to Head & Matchup Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* H2H Breakdown */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" /> Head-To-Head Record (Last {h2h.totalPlayed} Matches)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 font-mono">
            <span className="text-emerald-400">{fixture.teamA}: {h2h.teamAWins}W</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400">Draws: {h2h.draws}D</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400">{fixture.teamB}: {h2h.teamBWins}W</span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed pt-1">
            {h2h.summary}
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-1">
            Recent H2H Scorelines: {h2h.recentScores.join(' | ')}
          </div>
        </div>

        {/* Tactical Matchup & Team News */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" /> Tactical Blueprint & Team News
          </span>

          <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="font-semibold text-emerald-400 block mb-0.5">Tactical Dynamic:</span>
            {tacticalNotes}
          </div>

          <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="font-semibold text-cyan-400 block mb-0.5">Confirmed / Squad News:</span>
            {teamNews}
          </div>
        </div>
      </div>

      {/* Fixture Context & Data Limitation (Core Rules 1 & 4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3 flex items-start gap-2.5">
          <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-200 block text-[11px] uppercase tracking-wider">
              Fixture & Tournament Context
            </span>
            {fixtureContext}
          </div>
        </div>

        <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-200 block text-[11px] uppercase tracking-wider">
              Core Rule 4: Data Limitation & Transparency
            </span>
            {dataLimitations}
          </div>
        </div>
      </div>
    </div>
  );
};
