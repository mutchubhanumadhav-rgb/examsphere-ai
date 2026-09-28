import React, { useState, useEffect } from 'react';
import {
  Award,
  TrendingUp,
  Target,
  Flame,
  CheckCircle,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Brain,
  BarChart3
} from 'lucide-react';
import { api } from '../../services/api.ts';
import { QuizAttempt } from '../../types/index.ts';

interface StudentDashboardProps {
  onStartQuiz: (examId: string, type: string) => void;
  onOpenPredictor: (examId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onStartQuiz,
  onOpenPredictor,
}) => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.getProgress()
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Loading student analytics & study metrics...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in transition-colors duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/60 mb-2">
          <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Academic Performance Intelligence
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Student Progress & Performance Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Track verified test accuracy, study streaks, question mastery, and personalized AI-generated revision recommendations.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Total Mock Tests</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">{stats.totalTests}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">Completed</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Average Score</div>
          <div className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1">{stats.averageScore}%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">+4.2% this week</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Overall Accuracy</div>
          <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">{stats.accuracy}%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">High Precision</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Study Streak</div>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
            <span>{stats.studyStreakDays}</span>
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Days Active</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 col-span-2 md:col-span-1 shadow-sm">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Completion Rate</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">{stats.completionRate}%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Above Target</div>
        </div>
      </div>

      {/* Strongest vs Weakest & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Breakdown */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4 shadow-sm">
          <h3 className="text-sm font-mono font-semibold uppercase text-slate-700 dark:text-slate-200">
            Subject Proficiency Matrix
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Strongest Topics:</span>
              <div className="flex flex-wrap gap-2">
                {stats.strongestSubjects?.map((sub: string, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-medium"
                  >
                    ✓ {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Recommended for Focused Revision:</span>
              <div className="flex flex-wrap gap-2">
                {stats.weakestSubjects?.map((sub: string, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-medium"
                  >
                    ⚠ {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Personalized AI Recommendations */}
        <div className="p-6 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/60 dark:bg-indigo-950/20 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-semibold uppercase text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              AI Personalized Study Prescription
            </h3>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Based on past errors</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-800 dark:text-slate-200">
            {stats.aiRecommendations?.map((rec: string, i: number) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/60 flex items-start gap-2.5 leading-relaxed"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              onClick={() => onStartQuiz('jee-main', 'practice')}
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Practice Recommended Topics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Test Attempts History */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4 shadow-sm">
        <h3 className="text-sm font-mono font-semibold uppercase text-slate-700 dark:text-slate-200">
          Recent Test Attempts History
        </h3>

        {stats.recentAttempts?.length > 0 ? (
          <div className="divide-y divide-slate-200 dark:divide-slate-800/80">
            {stats.recentAttempts.map((att: QuizAttempt) => (
              <div key={att.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{att.quizTitle}</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    {new Date(att.completedAt || att.startedAt).toLocaleDateString()} · Time:{' '}
                    {Math.round(att.durationSpentSeconds / 60)} mins
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {att.totalMarksEarned} / {att.maxPossibleMarks} M
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                    {att.accuracyPercentage}% Accuracy
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-xs">
            Start a practice test or mock examination to log your first verified diagnostic attempt.
          </div>
        )}
      </div>
    </div>
  );
};
