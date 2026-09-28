import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Award,
  ArrowLeft,
  ShieldCheck,
  Brain,
  HelpCircle,
  Check
} from 'lucide-react';
import { QuestionItem, QuizAttempt } from '../../types/index.ts';
import { api } from '../../services/api.ts';

interface QuizPlayerProps {
  examId?: string;
  quizType: string;
  initialQuestions?: QuestionItem[];
  onBack: () => void;
  onFinish?: (attempt: QuizAttempt) => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  examId = 'jee-main',
  quizType = 'practice',
  initialQuestions,
  onBack,
  onFinish,
}) => {
  const [questions, setQuestions] = useState<QuestionItem[]>(initialQuestions || []);
  const [isLoading, setIsLoading] = useState(!initialQuestions || initialQuestions.length === 0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User state: map of questionId -> selectedOptionId ('A', 'B', 'C', 'D')
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  // Mark for review set
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  // Visited set
  const [visitedQuestions, setVisitedQuestions] = useState<Set<string>>(new Set());

  // Timer in seconds
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 mins default
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scoreReport, setScoreReport] = useState<QuizAttempt | null>(null);

  // Fetch questions if not passed in
  useEffect(() => {
    if (!initialQuestions || initialQuestions.length === 0) {
      setIsLoading(true);
      api.generateQuiz({
        examId,
        count: 5,
        mode: quizType === 'mock' ? 'mock' : 'practice',
      })
        .then((res) => {
          setQuestions(res.questions);
          if (res.questions.length > 0) {
            setVisitedQuestions(new Set([res.questions[0].id]));
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    } else {
      setVisitedQuestions(new Set([initialQuestions[0]?.id || '']));
    }
  }, [examId, quizType, initialQuestions]);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || isLoading || questions.length === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted, isLoading, questions.length]);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted || !currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleToggleMarkForReview = () => {
    if (!currentQuestion) return;
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  const handleNavigate = (index: number) => {
    if (index < 0 || index >= questions.length) return;
    setCurrentIndex(index);
    const targetQ = questions[index];
    if (targetQ) {
      setVisitedQuestions((prev) => new Set(prev).add(targetQ.id));
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setIsSubmitting(true);

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    const answersRecord: Record<string, { selectedAnswer: string; isCorrect: boolean }> = {};

    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (!selected) {
        unansweredCount++;
        answersRecord[q.id] = { selectedAnswer: '', isCorrect: false };
      } else if (selected === q.correctAnswer) {
        correctCount++;
        answersRecord[q.id] = { selectedAnswer: selected, isCorrect: true };
      } else {
        incorrectCount++;
        answersRecord[q.id] = { selectedAnswer: selected, isCorrect: false };
      }
    });

    const marksEarned = correctCount * 4 - incorrectCount * 1;
    const maxMarks = questions.length * 4;
    const accuracy = questions.length > 0 ? Math.round((correctCount / (correctCount + incorrectCount || 1)) * 100) : 0;

    const attempt: QuizAttempt = {
      id: `att-${Date.now()}`,
      quizId: `quiz-${examId}-${quizType}`,
      quizTitle: `${examId.toUpperCase()} ${quizType === 'mock' ? 'Timed Mock Test' : 'Diagnostic Quiz'}`,
      quizType: (quizType === 'mock' ? 'Mock' : 'Quick') as any,
      examId,
      examName: examId.toUpperCase(),
      startedAt: new Date(Date.now() - (15 * 60 - timeLeft) * 1000).toISOString(),
      completedAt: new Date().toISOString(),
      durationSpentSeconds: 15 * 60 - timeLeft,
      totalQuestions: questions.length,
      answeredCount: correctCount + incorrectCount,
      correctCount,
      incorrectCount,
      unansweredCount,
      totalMarksEarned: marksEarned,
      maxPossibleMarks: maxMarks,
      accuracyPercentage: accuracy,
      answers: answersRecord,
    };

    setScoreReport(attempt);
    setIsSubmitted(true);
    setIsSubmitting(false);

    try {
      await api.submitQuiz(attempt);
      if (onFinish) onFinish(attempt);
    } catch (err) {
      console.error('Failed to submit attempt:', err);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400">Preparing structured question paper...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
        <h3 className="text-base font-bold text-white">No Questions Available</h3>
        <p className="text-xs text-slate-400">Please choose another subject or exam mode.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs"
        >
          Return to Exams
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in transition-colors duration-200">
      {/* Top Test Header */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Exit Test"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{examId.toUpperCase()} {quizType === 'mock' ? 'Mock Test' : 'Practice Test'}</span>
              {currentQuestion?.generatedByAi && (
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> AI Generated
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Question {currentIndex + 1} of {questions.length} · Marking: +4, -1
            </p>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          {!isSubmitted && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold ${
                timeLeft < 180
                  ? 'border-rose-400 dark:border-rose-500/50 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 animate-pulse'
                  : 'border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          )}

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-md transition-colors"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedAnswers({});
                setMarkedForReview(new Set());
                setTimeLeft(15 * 60);
                setCurrentIndex(0);
              }}
              className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1.5 shadow-md"
            >
              <RotateCcw className="w-3 h-3" /> Retry Test
            </button>
          )}
        </div>
      </div>

      {/* Main Test Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Columns: Active Question Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Question Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl space-y-6 shadow-sm">
            <div className="flex items-center justify-between text-xs border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                Question {currentIndex + 1}
              </span>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <span>Subject: <strong className="text-slate-800 dark:text-slate-200">{currentQuestion.subject}</strong></span>
                <span>·</span>
                <span>Topic: <strong className="text-slate-800 dark:text-slate-200">{currentQuestion.topic}</strong></span>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentQuestion.question}
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                const isCorrect = currentQuestion.correctAnswer === option.id;

                let optionStyles = 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-300';
                if (!isSubmitted) {
                  if (isSelected) {
                    optionStyles = 'border-indigo-500 bg-indigo-50 dark:bg-indigo-600/20 text-indigo-900 dark:text-indigo-200 shadow-sm';
                  }
                } else {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-500/80 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'border-rose-500/80 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isSubmitted}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all ${optionStyles}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {option.id}
                    </span>
                    <span className="flex-1 mt-0.5 leading-relaxed">{option.text}</span>
                    {isSubmitted && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Bar (Review & Next/Prev) */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800/80">
              {!isSubmitted ? (
                <button
                  onClick={handleToggleMarkForReview}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    markedForReview.has(currentQuestion.id)
                      ? 'border-purple-300 dark:border-purple-500/50 bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300'
                      : 'border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>
                    {markedForReview.has(currentQuestion.id) ? 'Marked for Review' : 'Mark for Review'}
                  </span>
                </button>
              ) : (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Source: {currentQuestion.source}
                </span>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigate(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>
                <button
                  onClick={() => handleNavigate(currentIndex + 1)}
                  disabled={currentIndex === questions.length - 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Explanation Accordion (Visible after submission) */}
          {isSubmitted && (
            <div className="p-6 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-slate-900/90 backdrop-blur-xl space-y-3 animate-in fade-in shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-700 dark:text-indigo-300">
                <Brain className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Verified Step-by-Step Mathematical Explanation</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs sm:text-sm text-slate-800 dark:text-slate-300 whitespace-pre-line leading-relaxed font-mono">
                {currentQuestion.explanation}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Column: Question Palette & Score Report */}
        <div className="space-y-4">
          {/* Diagnostic Score Card (Shown after submit) */}
          {isSubmitted && scoreReport && (
            <div className="p-5 rounded-2xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/20 backdrop-blur-xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-emerald-800 dark:text-emerald-400 font-semibold">
                  Test Performance
                </span>
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {scoreReport.totalMarksEarned}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">/ {scoreReport.maxPossibleMarks} Marks</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-emerald-200 dark:border-emerald-500/20">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Accuracy:</span>
                  <div className="font-semibold text-emerald-700 dark:text-emerald-300 font-mono text-sm">
                    {scoreReport.accuracyPercentage}%
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Correct:</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-sm">
                    {scoreReport.correctCount} / {scoreReport.totalQuestions}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Question Palette Card */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl space-y-4 shadow-sm">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Question Palette ({questions.length})
            </h3>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Answered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Marked Review
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Unanswered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Not Visited
              </div>
            </div>

            {/* Grid of question numbers */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isSelected = Boolean(selectedAnswers[q.id]);
                const isMarked = markedForReview.has(q.id);
                const isVisited = visitedQuestions.has(q.id);
                const isCurrent = idx === currentIndex;

                let paletteColor = 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60';
                if (!isSubmitted) {
                  if (isMarked) {
                    paletteColor = 'bg-purple-100 dark:bg-purple-600/30 text-purple-700 dark:text-purple-200 border-purple-300 dark:border-purple-500/60 font-semibold';
                  } else if (isSelected) {
                    paletteColor = 'bg-emerald-100 dark:bg-emerald-600/30 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500/60 font-semibold';
                  } else if (isVisited) {
                    paletteColor = 'bg-rose-100 dark:bg-rose-600/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40';
                  }
                } else {
                  const correct = q.correctAnswer === selectedAnswers[q.id];
                  paletteColor = correct
                    ? 'bg-emerald-100 dark:bg-emerald-600/30 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500'
                    : 'bg-rose-100 dark:bg-rose-600/30 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-500';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleNavigate(idx)}
                    className={`h-9 rounded-lg border text-xs font-mono flex items-center justify-center transition-all ${paletteColor} ${
                      isCurrent ? 'ring-2 ring-indigo-500 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
