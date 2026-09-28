import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Building2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Brain,
  Info,
  RotateCcw
} from 'lucide-react';
import { AdmissionPredictorInput, AdmissionPredictorMatch, ExamRecord } from '../../types/index.ts';
import { api } from '../../services/api.ts';

interface AdmissionPredictorProps {
  initialExamId?: string;
  exams: ExamRecord[];
  onSelectCollege?: (collegeId: string) => void;
}

export const AdmissionPredictor: React.FC<AdmissionPredictorProps> = ({
  initialExamId = 'ap-eapcet',
  exams,
  onSelectCollege,
}) => {
  const [examId, setExamId] = useState<string>(initialExamId);
  const [rank, setRank] = useState<string>('1850');
  const [marks, setMarks] = useState<string>('');
  const [percentile, setPercentile] = useState<string>('');
  const [category, setCategory] = useState<'General' | 'OBC-NCL' | 'SC' | 'ST' | 'EWS' | 'Open'>('General');
  const [domicile, setDomicile] = useState<string>('AU Region');
  const [preferredBranch, setPreferredBranch] = useState<string>('Computer Science');

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    matches: AdmissionPredictorMatch[];
    totalAnalyzedRecords: number;
    officialDisclaimer: string;
  } | null>(null);

  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isLoadingAiAdvice, setIsLoadingAiAdvice] = useState(false);

  const handlePredict = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setAiAdvice(null);

    try {
      const input: AdmissionPredictorInput = {
        country: 'India',
        examId,
        admissionYear: 2025,
        rank: rank ? parseInt(rank, 10) : undefined,
        marks: marks ? parseFloat(marks) : undefined,
        percentile: percentile ? parseFloat(percentile) : undefined,
        category,
        domicile,
        preferredBranch: preferredBranch === 'all' ? undefined : preferredBranch,
      };

      const res = await api.analyzeAdmission(input);
      setResults(res);
    } catch (err) {
      console.error('Prediction failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetAiAdvice = async () => {
    if (!results) return;
    setIsLoadingAiAdvice(true);
    try {
      const input: AdmissionPredictorInput = {
        country: 'India',
        examId,
        admissionYear: 2025,
        rank: rank ? parseInt(rank, 10) : undefined,
        marks: marks ? parseFloat(marks) : undefined,
        category,
        preferredBranch,
      };
      const advice = await api.getAiCounselingAdvice(input, results.matches);
      setAiAdvice(advice);
    } catch (err) {
      console.error('Failed to get counseling advice:', err);
    } finally {
      setIsLoadingAiAdvice(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in transition-colors duration-200">
      {/* Title & Official Notice */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-800 dark:text-cyan-300 bg-cyan-100/70 dark:bg-cyan-950/60 border border-cyan-300/80 dark:border-cyan-800/60">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          Deterministic Cutoff Analysis Engine
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Verified Admission Opportunity Predictor
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Evaluate historical admission ranges based on verified counseling rounds (JoSAA, APSCHE, MCC, BITS).
          We prioritize mathematical comparison with official records over ungrounded speculation.
        </p>

        {/* Required Non-Guarantee Disclaimer */}
        <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-200/90 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold text-amber-900 dark:text-amber-300">Official Counseling Advisory: </span>
            <span>
              Actual admission depends on official counseling, seat availability, candidate preference ordering, and the current admission cycle cutoffs. No guaranteed admission is claimed.
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form: Filters & Rank inputs */}
        <div className="lg:col-span-1 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl space-y-5 shadow-sm">
          <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Candidate Scorecard Inputs
          </h2>

          <form onSubmit={handlePredict} className="space-y-4 text-xs">
            {/* Target Exam */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                Target Entrance Exam
              </label>
              <select
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              >
                {exams.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.shortName} - {ex.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Rank / Percentile inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  State / All-India Rank
                </label>
                <input
                  type="number"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="e.g. 1850"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  Marks / Score (Optional)
                </label>
                <input
                  type="number"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  placeholder="e.g. 331"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                Admission Category / Quota
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="General">General / Open Category (OC)</option>
                <option value="OBC-NCL">OBC-NCL / BC</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
              </select>
            </div>

            {/* Domicile / Regional Quota */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                Regional Quota / Domicile
              </label>
              <select
                value={domicile}
                onChange={(e) => setDomicile(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="All India">All India Quota (AIQ)</option>
                <option value="AU Region">AU Region (Andhra University Local)</option>
                <option value="SVU Region">SVU Region (Sri Venkateswara University Local)</option>
                <option value="Home State">Home State Quota</option>
              </select>
            </div>

            {/* Preferred Branch */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                Preferred Academic Branch
              </label>
              <select
                value={preferredBranch}
                onChange={(e) => setPreferredBranch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Branches</option>
                <option value="Computer Science">Computer Science and Engineering (CSE)</option>
                <option value="Artificial Intelligence">Artificial Intelligence / Data Science</option>
                <option value="Electrical">Electrical / Electronics (ECE)</option>
                <option value="Medicine">Medicine & Surgery (MBBS)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isLoading ? 'Analyzing Verified Records...' : 'Analyze Admission Opportunities'}
            </button>
          </form>
        </div>

        {/* Right 2 Columns: Results Table & AI Strategy Guidance */}
        <div className="lg:col-span-2 space-y-6">
          {!results ? (
            <div className="p-12 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 space-y-3">
              <Sparkles className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mx-auto opacity-60" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">No Prediction Calculated Yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Enter your test rank or score on the left and click &ldquo;Analyze Admission Opportunities&rdquo; to test against verified historical cutoffs.
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              {/* Summary Bar */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Analyzed: </span>
                  <strong className="text-slate-900 dark:text-white font-mono">{results.matches.length} Cutoff Records</strong>
                  <span className="text-slate-400 mx-2">·</span>
                  <span className="text-slate-500 dark:text-slate-400">Target Rank: </span>
                  <strong className="text-cyan-600 dark:text-cyan-400 font-mono">{rank || 'N/A'}</strong>
                </div>

                <button
                  onClick={handleGetAiAdvice}
                  disabled={isLoadingAiAdvice}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Brain className="w-3.5 h-3.5 text-cyan-200" />
                  {isLoadingAiAdvice ? 'Synthesizing Advice...' : 'AI Strategic Counseling Advice'}
                </button>
              </div>

              {/* AI Strategic Counseling Panel */}
              {aiAdvice && (
                <div className="p-5 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/60 dark:bg-indigo-950/20 backdrop-blur-xl space-y-3 animate-in fade-in shadow-sm">
                  <div className="flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-300 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Brain className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      ExamSphere Advisor - AI Strategic Counseling Analysis
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Empirical Synthesis</span>
                  </div>
                  <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line bg-white/80 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 font-mono">
                    {aiAdvice}
                  </div>
                </div>
              )}

              {/* Records List */}
              <div className="space-y-3">
                {results.matches.map((item, idx) => {
                  let badgeColor = 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
                  if (item.categoryMatch === 'Matches available cutoff data') {
                    badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/60';
                  } else if (item.categoryMatch === 'Close to historical cutoff range') {
                    badgeColor = 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/60';
                  } else if (item.categoryMatch === 'Outside available cutoff range') {
                    badgeColor = 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60';
                  }

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                              {item.institution.name}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {item.cutoff.course} · {item.cutoff.branch}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-xs font-mono font-medium px-2.5 py-1 rounded-md border shrink-0 ${badgeColor}`}
                        >
                          {item.categoryMatch}
                        </span>
                      </div>

                      {/* Cutoff Record comparison numbers */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 dark:bg-slate-950/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800/60 font-mono">
                        <div>
                          <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Round & Year</span>
                          <span className="text-slate-800 dark:text-slate-200">
                            Round {item.cutoff.counselingRound} ({item.cutoff.admissionYear})
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Closing Rank</span>
                          <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                            {item.cutoff.closingRank.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Your Rank</span>
                          <span className="text-slate-800 dark:text-slate-200 font-semibold">{rank || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Difference</span>
                          <span
                            className={
                              (item.rankDifference || 0) <= 0
                                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                                : 'text-rose-600 dark:text-rose-400'
                            }
                          >
                            {(item.rankDifference || 0) > 0 ? `+${item.rankDifference}` : item.rankDifference}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                        <span>{item.confidenceNotes}</span>
                        {item.cutoff.officialUrl && (
                          <a
                            href={item.cutoff.officialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[10px]"
                          >
                            <span>Verify Source</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
