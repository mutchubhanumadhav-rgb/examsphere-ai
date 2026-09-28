import React from 'react';
import {
  Search,
  Sparkles,
  GraduationCap,
  CheckCircle,
  FileText,
  Building2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Brain,
  Globe,
  Award,
  BookOpen,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { ExamRecord, RealTimeUpdate } from '../../types/index.ts';
import { useLanguage } from '../../context/LanguageContext.tsx';

interface HomeViewProps {
  exams: ExamRecord[];
  updates: RealTimeUpdate[];
  onOpenSearch: () => void;
  onSelectExam: (examId: string) => void;
  onNavigateToTab: (tab: string) => void;
  onOpenTutor: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  exams,
  updates,
  onOpenSearch,
  onSelectExam,
  onNavigateToTab,
  onOpenTutor,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 animate-in fade-in transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-14 pb-8 text-center max-w-4xl mx-auto space-y-6">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-cyan-800 dark:text-cyan-300 bg-cyan-100/70 dark:bg-cyan-950/70 border border-cyan-300/80 dark:border-cyan-800/80 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Verified Global Registry · Google Search Grounded · JoSAA / APSCHE Data</span>
        </div>

        {/* Hero Title with balanced typography */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance leading-[1.12]">
          Your Global Exam &{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-cyan-600 to-teal-600 dark:from-indigo-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
            Admission Intelligence
          </span>{' '}
          Platform
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
          Discover entrance examinations, practice verified previous-year questions, track your diagnostic accuracy, and analyze university admission opportunities with official cutoff data.
        </p>

        {/* Large Global Search Trigger */}
        <div className="pt-2 max-w-2xl mx-auto">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-700/80 hover:border-indigo-500/60 shadow-xl shadow-slate-200/50 dark:shadow-indigo-950/50 text-left text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-cyan-500 transition-colors" />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Search any entrance exam, college, university, course, or question...
              </span>
            </div>
            <kbd className="hidden sm:inline-block px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Quick alias tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="text-slate-500 font-mono text-[11px]">Popular Searches:</span>
            {['JEE Main', 'AP EAMCET', 'NEET UG', 'Digital SAT', 'GATE', 'BITSAT'].map((term) => (
              <button
                key={term}
                onClick={onOpenSearch}
                className="text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 hover:decoration-cyan-500 text-xs font-medium"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Primary CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigateToTab('exams')}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Explore Exams</span>
          </button>

          <button
            onClick={() => onNavigateToTab('predictor')}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/70 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-300/80 dark:border-cyan-800/80 shadow-sm transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Admission Predictor</span>
          </button>

          <button
            onClick={() => onNavigateToTab('practice')}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 shadow-sm transition-all flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Practice Now</span>
          </button>
        </div>
      </section>

      {/* Featured / Popular Exams Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured & Popular Entrance Examinations
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Extensible global exam registry with verified syllabi, marking schemes, and dates.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('exams')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center gap-1"
          >
            <span>View All ({exams.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.slice(0, 6).map((exam) => (
            <div
              key={exam.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50/80 dark:hover:bg-slate-900/90 hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between group space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800/50">
                        {exam.shortName}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
                        {exam.country} {exam.regionState ? `· ${exam.regionState}` : ''}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                    Verified
                  </span>
                </div>

                <div>
                  <h3
                    onClick={() => onSelectExam(exam.id)}
                    className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    {exam.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {exam.conductingAuthority} · {exam.examType} ({exam.educationLevel})
                  </p>
                </div>

                {exam.importantDates?.[0] && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      {exam.importantDates[0].title}
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                      {exam.importantDates[0].date}
                    </span>
                  </div>
                )}
              </div>

              {/* Action buttons inside card */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectExam(exam.id)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>16 Sections Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onNavigateToTab('predictor')}
                  className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 font-semibold"
                >
                  Predict Cutoffs
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: Latest Official Updates & Admission Predictor Highlight */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Latest Live Bulletins */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span>Latest Official Examination Updates</span>
            </h2>
            <button
              onClick={() => onNavigateToTab('updates')}
              className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800"
            >
              View All Bulletins →
            </button>
          </div>

          <div className="space-y-3">
            {updates.slice(0, 3).map((up) => (
              <div
                key={up.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/90 transition-all space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-700 dark:text-cyan-400 font-mono text-[11px] bg-cyan-50 dark:bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800/60">
                    {up.examOrInstitution}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {up.publicationDate}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{up.headline}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {up.summary}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/60">
                  <span className="text-[11px]">Source: {up.source}</span>
                  <a
                    href={up.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Admission Opportunity Banner */}
        <div className="p-6 rounded-2xl border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-b from-cyan-50/70 dark:from-cyan-950/40 via-white dark:via-slate-900/80 to-white dark:to-slate-900/80 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-sm">
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-600/20 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 w-fit">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Data-Based Admission Opportunities
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Wondering where your rank or percentile lands you? Compare your performance against verified round cutoffs for JNTUK, Andhra University, IIT Bombay, AIIMS, and BITS Pilani.
            </p>
            <div className="text-[11px] text-amber-800 dark:text-amber-300/90 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800/40">
              Deterministic calculations strictly precede AI strategic counseling. No guaranteed admission claimed.
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('predictor')}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-cyan-600/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Launch Admission Predictor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* For Educators & Institutions Banner */}
      <section className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="text-xs font-mono uppercase text-indigo-600 dark:text-indigo-400 font-semibold">
            Institutional & Educator Suite
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Empower Your Classroom With Verified Mock Tests & Analytics
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Create cohort classes, assign previous year papers or custom adaptive quizzes, and view aggregate subject performance without exposing private student records.
          </p>
        </div>
        <button
          onClick={() => onNavigateToTab('educators')}
          className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold border border-slate-800 dark:border-slate-700 transition-colors shrink-0"
        >
          Explore Educator Portal
        </button>
      </section>
    </div>
  );
};
