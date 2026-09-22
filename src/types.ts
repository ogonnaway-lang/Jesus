export interface MatchFixture {
  id: string;
  teamA: string;
  teamB: string;
  date: string;
  competition: string;
  stadium?: string;
  country?: string;
  importance?: string;
}

export interface MarketRow {
  market: string;
  options: string;
  probability: string;
  highlight?: boolean;
  probValue?: number;
}

export interface OverUnderLine {
  line: string;
  overProb: number;
  underProb: number;
}

export interface CorrectScoreProb {
  score: string;
  probability: number;
}

export interface QualifyingMarket {
  market: string;
  selection: string;
  probability: number;
  rationale: string;
}

export interface BestMarket {
  market: string;
  selection: string;
  probability: number;
  reasons: string;
}

export interface MatchAnalysisResult {
  fixture: {
    teamA: string;
    teamB: string;
    date: string;
    competition: string;
  };
  timestamp: string;
  engine: string;
  
  // Tactical & Data Dossier
  expectedGoals: {
    home: number;
    away: number;
    total: number;
  };
  form: {
    teamA: {
      recent: ('W' | 'D' | 'L')[];
      scoredPerGame: number;
      concededPerGame: number;
      cleanSheetRate: number;
      bttsRate: number;
      homeWinRate: number;
    };
    teamB: {
      recent: ('W' | 'D' | 'L')[];
      scoredPerGame: number;
      concededPerGame: number;
      cleanSheetRate: number;
      bttsRate: number;
      awayWinRate: number;
    };
  };
  h2h: {
    summary: string;
    totalPlayed: number;
    teamAWins: number;
    draws: number;
    teamBWins: number;
    recentScores: string[];
  };
  tacticalNotes: string;
  teamNews: string;
  fixtureContext: string;
  dataLimitations: string;

  // 1X2 Probabilities
  matchOutcome: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };

  // Home or Away (Draw No Bet / Normalized)
  homeOrAway: {
    home: number;
    away: number;
  };

  // Goal Lines
  fullTimeGoalLines: OverUnderLine[];
  firstHalfGoalLines: OverUnderLine[];
  secondHalfGoalLines: OverUnderLine[];
  homeTeamGoalLines: OverUnderLine[];
  awayTeamGoalLines: OverUnderLine[];

  // BTTS
  btts: {
    ggYes: number;
    ngNo: number;
  };

  // Correct Scores
  correctScoresFT: CorrectScoreProb[];
  correctScoresHT: CorrectScoreProb[];
  correctScores2H: CorrectScoreProb[];

  // Combo Bets
  combos: {
    homeWinPlusGG: number;
    awayWinPlusGG: number;
  };

  // Safety Filter
  safetyFilter: {
    status: '95%+ THRESHOLD REACHED' | 'NO 95%+ MARKET';
    reached: boolean;
    qualifyingMarkets: QualifyingMarket[];
  };

  // Straight Win 95% Decider (Home or Away)
  straightWinDecision: {
    status: '95%+ STRAIGHT WIN QUALIFIED' | 'NO 95% STRAIGHT WIN QUALIFIER';
    qualified: boolean;
    selectedTeam: string | null;
    selectionType: 'HOME_WIN' | 'AWAY_WIN' | null;
    homeWinProb: number;
    awayWinProb: number;
    drawProb: number;
    homeOrAwayHomeProb: number;
    homeOrAwayAwayProb: number;
    threshold: number;
    highestStraightWinProb: number;
    favoredTeam: string;
    verdict: string;
    tacticalProof: string;
    governanceNote: string;
  };

  // Best Available Markets (Up to 3)
  bestMarkets: BestMarket[];

  // Expert Summary (Strictly 2 sentences)
  expertSummary: {
    verdictSentence: string;
    warningSentence: string;
    fullText: string;
  };

  rawMarkdownMatrix: string;
}
