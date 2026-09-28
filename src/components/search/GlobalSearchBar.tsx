import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Building2,
  FileText,
  Calendar,
  CheckCircle,
  Filter,
  Loader2,
  AlertCircle,
  ArrowRight,
  Globe
} from 'lucide-react';
import { api } from '../../services/api.ts';
import { ExamRecord, CollegeRecord, QuestionPaperMeta } from '../../types/index.ts';

interface GlobalSearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExam: (examId: string) => void;
  onSelectCollege: (collegeId: string) => void;
  onSelectPaper: (paperId: string) => void;
  onNavigateToTab: (tab: string) => void;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  isOpen,
  onClose,
  onSelectExam,
  onSelectCollege,
  onSelectPaper,
  onNavigateToTab,
}) => {
  const [query, setQuery] = useState('');
  const [liveGrounding, setLiveGrounding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    exams: ExamRecord[];
    colleges: CollegeRecord[];
    papers: QuestionPaperMeta[];
    webGrounding?: { summary: string; citations: any[]; retrievedAt: string } | null;
  }>({
    exams: [],
    colleges: [],
    papers: [],
    webGrounding: null,
  });

  // Filters
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedExamType, setSelectedExamType] = useState<string>('all');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Execute search with debounce
  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(() => {
      handleSearch(query);
    }, 280);
    return () => clearTimeout(timeout);
  }, [query, liveGrounding, selectedCountry, selectedExamType, isOpen]);

  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      if (!searchTerm.trim()) {
        const defaultExams = await api.getExams({
          country: selectedCountry !== 'all' ? selectedCountry : undefined,
          examType: selectedExamType !== 'all' ? selectedExamType : undefined,
        });
        setResults({
          exams: defaultExams.slice(0, 5),
          colleges: [],
          papers: [],
          webGrounding: null,
        });
      } else {
        const response = await api.searchGlobal(searchTerm, liveGrounding);
        if (response.success) {
          let filteredExams = response.results.exams || [];
          if (selectedCountry !== 'all') {
            filteredExams = filteredExams.filter(
              (e: ExamRecord) => e.country.toLowerCase() === selectedCountry.toLowerCase()
            );
          }
          if (selectedExamType !== 'all') {
            filteredExams = filteredExams.filter(
              (e: ExamRecord) => e.examType.toLowerCase() === selectedExamType.toLowerCase()
            );
          }

          setResults({
            exams: filteredExams,
            colleges: response.results.colleges || [],
            papers: response.results.papers || [],
            webGrounding: response.results.webGrounding,
          });
        }
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-4 bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150 transition-colors"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/50">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exams (JEE Main, AP EAMCET, NEET, SAT), colleges, or topics..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter bar & Live Grounding Switch */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-100/80 dark:bg-slate-950/30 border-b border-slate-200 dark:border-slate-800/60 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono text-[11px]">
              <Filter className="w-3 h-3 text-slate-400" /> Filters:
            </span>
            {/* Country filter */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Countries</option>
              <option value="India">India</option>
              <option value="United States & Global">United States / Global</option>
            </select>

            {/* Exam Type filter */}
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="General">General Standardized</option>
            </select>
          </div>

          {/* Level 3: Google Search Grounding Toggle */}
          <button
            onClick={() => setLiveGrounding(!liveGrounding)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              liveGrounding
                ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/50 shadow-sm'
                : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-700/50'
            }`}
            title="Use Gemini 3.5 Flash Google Search grounding for real-time exam notifications & dates"
          >
            <Globe className={`w-3.5 h-3.5 ${liveGrounding ? 'text-cyan-600 dark:text-cyan-400 animate-pulse' : ''}`} />
            <span>Google Search Data: {liveGrounding ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600 dark:text-indigo-400" />
              <p className="text-xs">Searching verified registries and official sources...</p>
            </div>
          ) : (
            <>
              {/* Level 3: Live Web Grounding result if available */}
              {results.webGrounding && (
                <div className="p-4 rounded-xl border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50/80 dark:bg-cyan-950/20 space-y-2">
                  <div className="flex items-center justify-between text-xs text-cyan-800 dark:text-cyan-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-300" />
                      Live Web Grounding (Google Search Verified)
                    </span>
                    <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400/80">
                      Retrieved: {new Date(results.webGrounding.retrievedAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    {results.webGrounding.summary}
                  </p>
                  {results.webGrounding.citations?.length > 0 && (
                    <div className="pt-2 border-t border-cyan-200 dark:border-cyan-500/20 flex flex-wrap gap-2 text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Sources:</span>
                      {results.webGrounding.citations.slice(0, 3).map((cite: any, i: number) => (
                        <a
                          key={i}
                          href={cite.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-200 underline underline-offset-2"
                        >
                          <span>{cite.domain}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Matching Exams */}
              {results.exams.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
                    <span>Examinations ({results.exams.length})</span>
                    <span>Level 1: Verified Registry</span>
                  </div>
                  <div className="space-y-2">
                    {results.exams.map((exam) => (
                      <div
                        key={exam.id}
                        onClick={() => {
                          onSelectExam(exam.id);
                          onClose();
                        }}
                        className="group p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-600/30 transition-colors">
                              <GraduationCap className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                                  {exam.name}
                                </h4>
                                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-200 dark:border-cyan-800/40">
                                  {exam.shortName}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                {exam.conductingAuthority} · {exam.country} {exam.regionState ? `(${exam.regionState})` : ''}
                              </p>
                              {exam.importantDates?.[0] && (
                                <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{exam.importantDates[0].title}: {exam.importantDates[0].date}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                            <span>Open</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Colleges */}
              {results.colleges.length > 0 && (
                <div className="space-y-2.5">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
                    Colleges & Universities ({results.colleges.length})
                  </div>
                  <div className="space-y-2">
                    {results.colleges.map((col) => (
                      <div
                        key={col.id}
                        onClick={() => {
                          onSelectCollege(col.id);
                          onClose();
                        }}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-600/20 text-cyan-600 dark:text-cyan-400">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{col.name}</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {col.city}, {col.stateRegion} · {col.institutionType}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">View Cutoffs</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Past Papers */}
              {results.papers.length > 0 && (
                <div className="space-y-2.5">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
                    Question Papers ({results.papers.length})
                  </div>
                  <div className="space-y-2">
                    {results.papers.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectPaper(p.id);
                          onClose();
                        }}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{p.examName} ({p.year})</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">{p.session} · {p.subject}</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Practice</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {results.exams.length === 0 &&
                results.colleges.length === 0 &&
                results.papers.length === 0 &&
                !results.webGrounding && (
                  <div className="text-center py-12 space-y-3">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      No exact records found in internal database for &ldquo;{query}&rdquo;.
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                      Enable <strong>Google Search Data</strong> above to run real-time Google Search grounding for latest official notifications.
                    </p>
                    <button
                      onClick={() => setLiveGrounding(true)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Try with Google Search Data
                    </button>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
