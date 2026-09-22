import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { computeFixtureProbabilities } from './src/utils/footballEngine.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client if key available
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// In-memory cache for ultra-fast instant responses
const fixtureCache = new Map<string, any>();

// API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    analyst: 'The SMART BEAST',
    version: '4.2.0',
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
    author: 'oway',
  });
});

// Primary Fixture Analysis Endpoint
app.post('/api/analyze-match', async (req, res) => {
  try {
    const { teamA, teamB, date, competition } = req.body;

    if (!teamA || !teamB) {
      return res.status(400).json({ error: 'teamA and teamB are required fields.' });
    }

    const fixtureDate = date || 'Upcoming';
    const fixtureComp = competition || 'Top Tier Competition';
    const cacheKey = `${teamA.toLowerCase().trim()}_vs_${teamB.toLowerCase().trim()}_${fixtureDate}_${fixtureComp}`;

    // Return instant cached analysis if available
    if (fixtureCache.has(cacheKey)) {
      return res.json(fixtureCache.get(cacheKey));
    }

    let tacticalNotes = '';
    let teamNews = '';
    let lambdaHomeOverride: number | undefined = undefined;
    let lambdaAwayOverride: number | undefined = undefined;

    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `You are "The SMART BEAST," an expert football betting analyst with 40+ years of experience.
Match: ${teamA} (Home) vs ${teamB} (Away), Date: ${fixtureDate}, Comp: ${fixtureComp}.
Provide tactical matchup notes, team news, and expected goals (xG).
Return JSON:
{
  "tacticalNotes": "2 concise sentences on tactical dynamic",
  "teamNews": "key team news or injuries",
  "expectedHomeGoals": 1.75,
  "expectedAwayGoals": 1.15
}`;

        // Fast timeout promise (max 2 seconds) so user never waits
        const generatePromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1800));
        const aiResponse = (await Promise.race([generatePromise, timeoutPromise])) as any;

        if (aiResponse && aiResponse.text) {
          try {
            const parsed = JSON.parse(aiResponse.text);
            if (parsed.tacticalNotes) tacticalNotes = parsed.tacticalNotes;
            if (parsed.teamNews) teamNews = parsed.teamNews;
            if (typeof parsed.expectedHomeGoals === 'number' && parsed.expectedHomeGoals > 0.3 && parsed.expectedHomeGoals < 5.0) {
              lambdaHomeOverride = parsed.expectedHomeGoals;
            }
            if (typeof parsed.expectedAwayGoals === 'number' && parsed.expectedAwayGoals > 0.2 && parsed.expectedAwayGoals < 5.0) {
              lambdaAwayOverride = parsed.expectedAwayGoals;
            }
          } catch (e) {
            console.warn('Could not parse Gemini JSON response, utilizing core engine default distributions:', e);
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed or timed out, utilizing core quantitative engine:', err);
      }
    }

    // Compute complete probabilities using the mathematical engine
    const analysis = computeFixtureProbabilities(
      teamA,
      teamB,
      fixtureDate,
      fixtureComp,
      {
        tactical: tacticalNotes || undefined,
        news: teamNews || undefined,
        lambdaHomeOverride,
        lambdaAwayOverride,
      }
    );

    // Cache the result for subsequent instant hits
    fixtureCache.set(cacheKey, analysis);

    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to process match analysis' });
  }
});

// Vite Middleware & Static Serving Setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The SMART BEAST server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
