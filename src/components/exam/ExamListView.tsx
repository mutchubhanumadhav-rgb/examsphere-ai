import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { ExamRecord } from '../../types/index.ts';

interface ExamListViewProps {
  exams: ExamRecord[];
  onSelectExam: (examId: string) => void;
  onOpenPredictor: (examId: string) => void;
  onStartQuiz: (examId: string, type: string) => void;
}

export const ExamListView: React.FC<ExamListViewProps> = ({
  exams,
  onSelectExam,
  onOpenPredictor,
  onStartQuiz,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filtered = exams.filter((e) => {
    let match = true;
    if (selectedCountry !== 'all' && e.country.toLowerCase() !== selectedCountry.toLowerCase()) {
      match = false;
    }
    if (selectedType !== 'all' && e.examType.toLowerCase() !== selectedType.toLowerCase()) {
      match = false;
    }
    if (selectedLevel !== 'all' && e.educationLevel.toLowerCase() !== selectedLevel.toLowerCase()) {
      match = false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      match =
        e.name.toLowerCase().includes(q) ||
        e.shortName.toLowerCase().includes(q) ||
        e.conductingAuthority.toLowerCase().includes(q) ||
        e.alternativeNames.some((alt) => alt.toLowerCase().includes(q));
    }
    return match;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in transition-colors duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-800 dark:text-cyan-300 bg-cyan-100/70 dark:bg-cyan-950/60 border border-cyan-300/80 dark:border-cyan-800/60 mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          Extensible Global Registry
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Global Entrance Examinations Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Comprehensive registry covering engineering, medical, graduate, standardized, and state entrance examinations with verified conducting authority links.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 text-xs shadow-sm">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by exam name (e.g. JEE, EAMCET, NEET, SAT, GATE), authority, or code..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Countries</option>
            <option value="India">India</option>
            <option value="United States & Global">United States / Global</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Disciplines</option>
            <option value="Engineering">Engineering</option>
            <option value="Medical">Medical</option>
            <option value="General">General / Standardized</option>
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Education Levels</option>
            <option value="Undergraduate">Undergraduate (UG)</option>
            <option value="Postgraduate">Postgraduate (PG)</option>
          </select>
        </div>
      </div>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((exam) => (
          <div
            key={exam.id}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50/80 dark:hover:bg-slate-900/90 hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between group space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
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
                  {exam.status}
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

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => onSelectExam(exam.id)}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <span>16-Section Guide</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onStartQuiz(exam.id, 'mock')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-colors"
                >
                  Mock Test
                </button>
                <button
                  onClick={() => onOpenPredictor(exam.id)}
                  className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 font-semibold"
                >
                  Predict
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
