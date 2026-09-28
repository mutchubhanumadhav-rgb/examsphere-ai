import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  Filter,
  AlertCircle,
  RefreshCw,
  Globe,
  Loader2
} from 'lucide-react';
import { RealTimeUpdate } from '../../types/index.ts';
import { api } from '../../services/api.ts';

export const LatestUpdatesView: React.FC = () => {
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Google Search Grounding state
  const [liveGoogleData, setLiveGoogleData] = useState<{
    summary: string;
    citations: any[];
    retrievedAt: string;
    modelUsed?: string;
  } | null>(null);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const categories = [
    { id: 'all', label: 'All Updates' },
    { id: 'exams', label: 'Exam Dates' },
    { id: 'applications', label: 'Applications' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'counseling', label: 'Counseling' },
    { id: 'results', label: 'Results' },
  ];

  const loadUpdates = async () => {
    setIsLoading(true);
    try {
      const data = await api.getUpdates(selectedCategory === 'all' ? undefined : selectedCategory);
      setUpdates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUpdates();
  }, [selectedCategory]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await loadUpdates();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleFetchGoogleSearchData = async () => {
    setIsLoadingGoogle(true);
    try {
      const data = await api.fetchUpdatesLiveGrounding();
      setLiveGoogleData(data);
    } catch (err) {
      console.error('Google search news fetch failed:', err);
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Verified Live Notification Feed
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Latest Official Exam & Admission Updates
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Real-time notifications gathered from official examination authorities (NTA, APSCHE, MCC, College Board). Grounded directly with live Google Search.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFetchGoogleSearchData}
            disabled={isLoadingGoogle}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition-all shrink-0 cursor-pointer"
            title="Search the live web for breaking 2026 notifications"
          >
            {isLoadingGoogle ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Globe className="w-3.5 h-3.5 text-cyan-200" />
            )}
            <span>Live Google Search Data</span>
          </button>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-500' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Live Google Search Grounded News Card (if fetched) */}
      {liveGoogleData && (
        <div className="p-6 rounded-2xl border border-cyan-300 dark:border-cyan-500/40 bg-gradient-to-br from-cyan-50/80 via-white to-indigo-50/50 dark:from-cyan-950/30 dark:via-slate-900/90 dark:to-indigo-950/30 shadow-md backdrop-blur-xl space-y-4 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-200 dark:border-cyan-500/30 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Breaking Exam Bulletins via Google Search Grounding</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200 border border-cyan-300 dark:border-cyan-700/50 font-medium">
                gemini-3.5-flash + googleSearch
              </span>
            </div>
            <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              Retrieved: {new Date(liveGoogleData.retrievedAt).toLocaleTimeString()}
            </span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans">
            {liveGoogleData.summary}
          </div>

          {liveGoogleData.citations?.length > 0 && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
              <div className="text-xs font-mono font-semibold uppercase text-cyan-700 dark:text-cyan-400">
                Official Web Sources ({liveGoogleData.citations.length}):
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {liveGoogleData.citations.map((cite: any, i: number) => (
                  <a
                    key={i}
                    href={cite.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-200 flex items-center gap-1.5 transition-colors font-mono text-[11px] shadow-xs"
                  >
                    <span>{cite.domain}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-indigo-100 dark:bg-indigo-600/20 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400 text-xs">
            Retrieving official bulletins...
          </div>
        ) : updates.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 text-xs">
            No updates in this category.
          </div>
        ) : (
          updates.map((update) => (
            <div
              key={update.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/90 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-700 dark:text-cyan-400 font-mono text-[11px] bg-cyan-50 dark:bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800/60">
                    {update.examOrInstitution}
                  </span>
                  {update.isOfficial && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Official Authority
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                  <span>Published: {update.publicationDate}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                {update.headline}
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {update.summary}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Source Portal: <strong className="text-slate-800 dark:text-slate-300">{update.source}</strong>
                </span>

                <a
                  href={update.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Official Bulletin</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

