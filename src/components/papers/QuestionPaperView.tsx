import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Clock,
  Filter,
  Search,
  BookOpen,
  ArrowRight,
  Bookmark,
  AlertCircle
} from 'lucide-react';
import { QuestionPaperMeta, QuestionItem } from '../../types/index.ts';
import { SEED_QUESTION_PAPERS } from '../../data/seedData.ts';

interface QuestionPaperViewProps {
  onStartQuiz: (examId: string, type: string, questions?: QuestionItem[]) => void;
  onOpenExam: (examId: string) => void;
}

export const QuestionPaperView: React.FC<QuestionPaperViewProps> = ({
  onStartQuiz,
  onOpenExam,
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const papers = SEED_QUESTION_PAPERS;

  const filteredPapers = papers.filter((p) => {
    let match = true;
    if (selectedYear !== 'all' && String(p.year) !== selectedYear) match = false;
    if (selectedSubject !== 'all' && !p.subject.toLowerCase().includes(selectedSubject.toLowerCase())) match = false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      match =
        p.examName.toLowerCase().includes(q) ||
        p.session.toLowerCase().includes(q) ||
        p.subject.toLowerCase().includes(q);
    }
    return match;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in transition-colors duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-purple-800 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-950/60 border border-purple-300/80 dark:border-purple-800/60 mb-2">
          <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          Verified Past Examination Archives
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Previous Year Question Papers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Solve official past papers under authentic timed conditions. All papers adhere to authorized educational provenance with verified answer keys.
        </p>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 text-xs shadow-sm">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search paper by exam, year, or session..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Streams</option>
            <option value="PCM">PCM (Engineering)</option>
            <option value="Biology">PCB (Medical)</option>
            <option value="Math">Mathematics</option>
          </select>
        </div>
      </div>

      {/* Paper Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800/60">
                    {paper.examName} · {paper.year}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{paper.session}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{paper.subject} · {paper.paperSet}</p>
                </div>

                <button
                  onClick={() => toggleBookmark(paper.id)}
                  className={`p-2 rounded-lg border transition-colors ${
                    bookmarkedIds.has(paper.id)
                      ? 'border-purple-300 dark:border-purple-500/60 bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white'
                  }`}
                  title="Bookmark Paper"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-300">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Questions:</span>
                  <span>{paper.questionCount} Questions</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Standard Duration:</span>
                  <span>{paper.durationMins} Minutes</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" /> Official Authority Paper
                </span>
                <span>Source: {paper.source}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              {paper.officialUrl && (
                <a
                  href={paper.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 font-medium"
                >
                  <span>Official Document</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <button
                onClick={() => onStartQuiz(paper.examId, 'previous', paper.questions)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Solve Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
