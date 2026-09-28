import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  Calendar,
  CheckCircle,
  ExternalLink,
  BookOpen,
  FileText,
  Clock,
  Award,
  Sparkles,
  ShieldCheck,
  Building2,
  HelpCircle,
  TrendingUp,
  Brain,
  Share2,
  ChevronRight,
  AlertTriangle,
  Globe,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { ExamRecord, CutoffRecord, QuestionPaperMeta } from '../../types/index.ts';
import { api } from '../../services/api.ts';

interface ExamDetailModalProps {
  examId: string | null;
  onClose: () => void;
  onStartQuiz: (examId: string, type: string) => void;
  onOpenPredictor: (examId: string) => void;
  onOpenTutorWithContext: (context: string) => void;
}

export const ExamDetailModal: React.FC<ExamDetailModalProps> = ({
  examId,
  onClose,
  onStartQuiz,
  onOpenPredictor,
  onOpenTutorWithContext,
}) => {
  const [exam, setExam] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Real-time Google Search Grounding state
  const [liveSearchData, setLiveSearchData] = useState<{
    summary: string;
    citations: any[];
    retrievedAt: string;
    modelUsed?: string;
  } | null>(null);
  const [isLoadingLiveSearch, setIsLoadingLiveSearch] = useState(false);

  useEffect(() => {
    if (!examId) return;
    setIsLoading(true);
    setLiveSearchData(null);
    api.getExamById(examId)
      .then((data) => {
        setExam(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [examId]);

  const handleFetchLiveGoogleSearch = async () => {
    if (!examId) return;
    setIsLoadingLiveSearch(true);
    setActiveTab('live-search');
    try {
      const data = await api.fetchExamLiveGrounding(examId);
      setLiveSearchData(data);
    } catch (err) {
      console.error('Failed to fetch live Google search data:', err);
    } finally {
      setIsLoadingLiveSearch(false);
    }
  };

  if (!examId) return null;

  const tabs = [
    { id: 'overview', label: '1. Overview' },
    { id: 'live-search', label: '★ Google Search Live Data' },
    { id: 'dates', label: '2. Important Dates' },
    { id: 'eligibility', label: '3. Eligibility' },
    { id: 'application', label: '4. Application Process' },
    { id: 'pattern', label: '5. Exam Pattern' },
    { id: 'syllabus', label: '6. Syllabus' },
    { id: 'papers', label: '7. Previous Papers' },
    { id: 'questions', label: '8. Question Bank' },
    { id: 'practice', label: '9. Practice Tests' },
    { id: 'mock', label: '10. Mock Tests' },
    { id: 'colleges', label: '11. Colleges' },
    { id: 'cutoffs', label: '12. Cutoffs' },
    { id: 'predictor', label: '13. Predictor' },
    { id: 'updates', label: '14. Latest Updates' },
    { id: 'faq', label: '15. FAQ' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[92vh] animate-in zoom-in-95 duration-150 transition-colors">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-950/70 p-4 sm:p-6 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {exam?.name || 'Loading Exam Details...'}
                  </h2>
                  {exam?.shortName && (
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                      {exam.shortName}
                    </span>
                  )}
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Source
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                  <span>Authority: <strong className="text-slate-800 dark:text-slate-200">{exam?.conductingAuthority}</strong></span>
                  <span>·</span>
                  <span>Country: <strong className="text-slate-800 dark:text-slate-200">{exam?.country}</strong></span>
                  <span>·</span>
                  <span>Last Verified: <strong className="text-slate-800 dark:text-slate-200">{exam?.lastVerifiedAt}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {exam?.officialUrl && (
                <a
                  href={exam.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-lg transition-colors"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60 overflow-x-auto text-xs pb-1">
            <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] shrink-0">Quick Actions:</span>
            <button
              onClick={handleFetchLiveGoogleSearch}
              className="px-2.5 py-1 rounded-md bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
              title="Ground this exam with current live Google Search data"
            >
              <Globe className="w-3 h-3 text-cyan-200" />
              <span>Use Google Search Data</span>
            </button>
            <button
              onClick={() => onStartQuiz(exam.id, 'mock')}
              className="px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shrink-0 flex items-center gap-1"
            >
              <CheckCircle className="w-3 h-3" /> Mock Test
            </button>
            <button
              onClick={() => onOpenPredictor(exam.id)}
              className="px-2.5 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shrink-0 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Admission Predictor
            </button>
            <button
              onClick={() => onOpenTutorWithContext(exam.name)}
              className="px-2.5 py-1 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors shrink-0 flex items-center gap-1"
            >
              <Brain className="w-3 h-3" /> Ask AI Tutor
            </button>
            {exam?.registrationUrl && (
              <a
                href={exam.registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors shrink-0 flex items-center gap-1"
              >
                <span>Online Registration</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        </div>

        {/* Modal Navigation Tabs (16 Sections) */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/40 overflow-x-auto shrink-0 text-xs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-600/20 dark:text-indigo-300 dark:border-indigo-500/40 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-sm text-slate-700 dark:text-slate-300 space-y-6">
          {isLoading ? (
            <div className="py-20 text-center text-slate-400">Loading verified exam profile...</div>
          ) : !exam ? (
            <div className="py-20 text-center text-slate-400">Exam record not found.</div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">Conducting Body</div>
                      <div className="text-base font-semibold text-slate-900 dark:text-white mt-1">{exam.conductingAuthority}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Official state/national body</div>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">Exam Mode & Duration</div>
                      <div className="text-base font-semibold text-slate-900 dark:text-white mt-1">
                        {exam.examPattern.mode} ({exam.examPattern.durationMins} mins)
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{exam.examPattern.totalQuestions} Questions · {exam.examPattern.totalMarks} Marks</div>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">Participating Institutions</div>
                      <div className="text-base font-semibold text-slate-900 dark:text-white mt-1">
                        {exam.participatingInstitutionsCount}+ Colleges
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Central, State & Private Autonomous</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Admission Process</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80">
                      {exam.admissionProcess}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Primary Subjects & Marks Distribution</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {exam.subjects.map((sub: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-between">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.name}</span>
                          <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800/40">
                            {sub.questionCount} Qs · {sub.maxMarks} M
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/60 dark:indigo-950/10">
                    <h4 className="text-xs font-semibold uppercase font-mono text-indigo-700 dark:text-indigo-300 mb-2">Verified Citation Sources</h4>
                    <div className="space-y-1.5 text-xs">
                      {exam.sourceUrls.map((s: any) => (
                        <div key={s.id} className="flex items-center justify-between">
                          <span className="text-slate-700 dark:text-slate-300">{s.title}</span>
                          <a href={s.url} target="_blank" rel="noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]">
                            <span>{s.domain}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: GOOGLE SEARCH GROUNDING LIVE DATA */}
              {activeTab === 'live-search' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="p-4 rounded-2xl border border-cyan-200 dark:border-cyan-500/40 bg-gradient-to-r from-cyan-50 via-slate-50 to-indigo-50 dark:from-cyan-950/40 dark:via-slate-900/90 dark:to-indigo-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                        <span className="font-bold text-slate-900 dark:text-white text-sm">Google Search Grounding Engine</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-700/50">
                          gemini-3.5-flash + googleSearch
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Retrieves current official announcements, 2026/2027 confirmed dates, syllabus notices, and registration links directly from web authorities.
                      </p>
                    </div>

                    <button
                      onClick={handleFetchLiveGoogleSearch}
                      disabled={isLoadingLiveSearch}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-xs shadow-md shadow-cyan-600/20 flex items-center gap-2 transition-all shrink-0"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLiveSearch ? 'animate-spin' : ''}`} />
                      <span>{isLoadingLiveSearch ? 'Searching Google...' : 'Refresh Live Data'}</span>
                    </button>
                  </div>

                  {isLoadingLiveSearch ? (
                    <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-3">
                      <Loader2 className="w-8 h-8 animate-spin text-cyan-600 dark:text-cyan-400 mx-auto" />
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Running Google Search Grounding...</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        Querying official authorities and university portals for latest 2026 bulletins on {exam.name}...
                      </p>
                    </div>
                  ) : liveSearchData ? (
                    <div className="space-y-5">
                      {/* Live Grounding Summary */}
                      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono border-b border-slate-200 dark:border-slate-800/80 pb-2.5">
                          <span className="text-cyan-700 dark:text-cyan-400 font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            Live Web Grounding Intelligence
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                            Retrieved: {new Date(liveSearchData.retrievedAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                          {liveSearchData.summary}
                        </div>
                      </div>

                      {/* Source Citations with Priority Badging */}
                      {liveSearchData.citations && liveSearchData.citations.length > 0 && (
                        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold uppercase font-mono text-slate-700 dark:text-slate-300">
                              Grounding Source Citations ({liveSearchData.citations.length})
                            </h4>
                            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                              Official Authority &gt; Government &gt; University
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {liveSearchData.citations.map((cite: any, i: number) => (
                              <div
                                key={i}
                                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/60 flex items-start justify-between gap-3 text-xs"
                              >
                                <div className="space-y-1">
                                  <h5 className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{cite.title}</h5>
                                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                                    <span className="text-cyan-600 dark:text-cyan-400">{cite.domain}</span>
                                    <span>·</span>
                                    <span className="text-emerald-600 dark:text-emerald-400">{cite.sourceType}</span>
                                  </div>
                                </div>
                                <a
                                  href={cite.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-300 transition-colors shrink-0"
                                  title="Open Source Link"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Disagreement Warning Protocol */}
                      <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                        <span>
                          Source verification policy: If sources disagree on dates or deadlines, verify directly with the conducting authority portal ({exam.officialUrl}).
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-10 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 space-y-3">
                      <Globe className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto opacity-70" />
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Click &ldquo;Refresh Live Data&rdquo; to fetch real-time search information</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        This queries Google Search via Gemini 3.5 Flash for the most recent official announcements, registration deadlines, and circulars for {exam.name}.
                      </p>
                      <button
                        onClick={handleFetchLiveGoogleSearch}
                        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-colors inline-flex items-center gap-2"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Query Google Search Data Now</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ELIGIBILITY */}
              {activeTab === 'eligibility' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Educational Qualifications</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{exam.eligibility}</p>
                  </div>
                  {exam.ageRequirement && (
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Age Criteria & Regulations</h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{exam.ageRequirement}</p>
                    </div>
                  )}
                  {exam.attemptsAllowed && (
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Number of Attempts Allowed</h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{exam.attemptsAllowed}</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: IMPORTANT DATES */}
              {activeTab === 'dates' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Official Notification & Timeline</h3>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified by Authority
                    </span>
                  </div>
                  <div className="space-y-3">
                    {exam.importantDates.map((item: any, i: number) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.notes || 'As per current calendar cycle'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                            {item.date}
                          </span>
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">Confirmed</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: APPLICATION PROCESS */}
              {activeTab === 'application' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Application Fee Structure</h3>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-mono">{exam.applicationFee}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Step-by-Step Submission Guide</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li>Visit the official portal ({exam.officialUrl}).</li>
                      <li>Register with valid candidate email ID and active mobile number.</li>
                      <li>Fill personal details, academic qualifications (Class 10/12 roll numbers), and test center preferences.</li>
                      <li>Upload scanned photograph, signature, and category certificates conforming to official DPI specifications.</li>
                      <li>Pay application fee via online payment gateway and print confirmation page.</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* TAB 5: EXAM PATTERN */}
              {activeTab === 'pattern' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">Marking Scheme</div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">{exam.examPattern.markingScheme}</div>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">Negative Marking</div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                        {exam.examPattern.negativeMarking ? `Yes (${exam.examPattern.negativeMarkingValue})` : 'No negative marking'}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono mb-2">Supported Examination Languages</div>
                    <div className="flex flex-wrap gap-2">
                      {exam.languages.map((lang: string, i: number) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: SYLLABUS */}
              {activeTab === 'syllabus' && (
                <div className="space-y-6 animate-in fade-in">
                  {exam.syllabus?.map((subjectBlock: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                        <h4 className="text-base font-bold text-indigo-600 dark:text-indigo-300">{subjectBlock.subject}</h4>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{subjectBlock.units.length} Core Units</span>
                      </div>
                      <div className="space-y-3">
                        {subjectBlock.units.map((unit: any, uIdx: number) => (
                          <div key={uIdx} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                              <span>{unit.unitName}</span>
                              {unit.weightageEstimated && (
                                <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[11px]">Weightage: {unit.weightageEstimated}</span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {unit.topics.map((t: string, tIdx: number) => (
                                <span key={tIdx} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 7: PREVIOUS PAPERS */}
              {activeTab === 'papers' && (
                <div className="space-y-3 animate-in fade-in">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Official and legally stored question papers. Verified solution availability included.
                  </div>
                  {exam.papers?.length > 0 ? (
                    exam.papers.map((p: QuestionPaperMeta) => (
                      <div key={p.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{p.session} ({p.year})</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.subject} · {p.questionCount} Questions</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onStartQuiz(exam.id, 'previous')}
                            className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                          >
                            Solve Paper
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
                      No uploaded question papers for this exam in local cache. Check official portal.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 8: QUESTION BANK */}
              {activeTab === 'questions' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">Verified Multiple-Choice Question Bank</span>
                    <button
                      onClick={() => onStartQuiz(exam.id, 'practice')}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-semibold"
                    >
                      Practice All Questions
                    </button>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                    <p>Includes questions with step-by-step mathematical reasoning, derivations, and official keys.</p>
                  </div>
                </div>
              )}

              {/* TAB 9 & 10: PRACTICE & MOCK TESTS */}
              {(activeTab === 'practice' || activeTab === 'mock') && (
                <div className="space-y-4 text-center py-8 animate-in fade-in">
                  <Award className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ready for a Full Simulation?</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Full computer-based test interface with real timer, question palette, negative marking, and instant comprehensive diagnostic report.
                  </p>
                  <button
                    onClick={() => onStartQuiz(exam.id, activeTab)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all"
                  >
                    Start {activeTab === 'mock' ? 'Timed Mock Test' : 'Adaptive Practice Quiz'}
                  </button>
                </div>
              )}

              {/* TAB 11: COLLEGES */}
              {activeTab === 'colleges' && (
                <div className="space-y-3 animate-in fade-in">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Recognized institutions admitting students via {exam.shortName}:
                  </div>
                  {exam.colleges?.map((c: any) => (
                    <div key={c.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{c.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{c.city}, {c.stateRegion} · {c.institutionType}</p>
                        </div>
                      </div>
                      <a href={c.officialWebsite} target="_blank" rel="noreferrer" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
                        <span>Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 12: CUTOFF DATA */}
              {activeTab === 'cutoffs' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Verified Historical Cutoff Records</h3>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Official Counseling Archives</span>
                  </div>
                  <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 font-mono">
                          <th className="py-2.5 px-3">Institution</th>
                          <th className="py-2.5 px-3">Course / Branch</th>
                          <th className="py-2.5 px-3">Category</th>
                          <th className="py-2.5 px-3">Round</th>
                          <th className="py-2.5 px-3 text-right">Closing Rank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                        {exam.cutoffs?.map((c: CutoffRecord) => (
                          <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                            <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{c.institutionName}</td>
                            <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{c.branch}</td>
                            <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{c.category} ({c.quota})</td>
                            <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 font-mono">R{c.counselingRound} ({c.admissionYear})</td>
                            <td className="py-2.5 px-3 text-right font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                              {c.closingRank.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 13: ADMISSION PREDICTOR */}
              {activeTab === 'predictor' && (
                <div className="text-center py-8 space-y-4 animate-in fade-in">
                  <Sparkles className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Evaluate Your Admission Opportunities</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Compare your marks, percentile, or rank against verified historical round data without speculative guarantees.
                  </p>
                  <button
                    onClick={() => onOpenPredictor(exam.id)}
                    className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Open Admission Predictor for {exam.shortName}
                  </button>
                </div>
              )}

              {/* TAB 14: LATEST UPDATES */}
              {activeTab === 'updates' && (
                <div className="space-y-3 animate-in fade-in">
                  {exam.recentUpdates?.length > 0 ? (
                    exam.recentUpdates.map((u: any) => (
                      <div key={u.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{u.source}</span>
                          <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{u.publicationDate}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{u.headline}</h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300">{u.summary}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl text-xs">
                      No recent breaking notices recorded. Use the global search bar with Google Search Data for real-time bulletins.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 15: FAQ */}
              {activeTab === 'faq' && (
                <div className="space-y-3 animate-in fade-in text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Is there any negative marking in this exam?</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {exam.examPattern.negativeMarking
                        ? `Yes, negative marking is applicable: ${exam.examPattern.negativeMarkingValue}.`
                        : 'No negative marking is applied for incorrect answers.'}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">How are participating colleges allocated?</h4>
                    <p className="text-slate-600 dark:text-slate-400">{exam.admissionProcess}</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Where can I verify official announcements?</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Always cross-verify all public dates directly on the conducting authority portal: {exam.officialUrl}.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
