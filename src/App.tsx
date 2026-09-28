import React, { useState, useEffect } from 'react';
import { ConstellationBackground } from './components/background/ConstellationBackground.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { MobileNav } from './components/layout/MobileNav.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { GlobalSearchBar } from './components/search/GlobalSearchBar.tsx';
import { ExamDetailModal } from './components/exam/ExamDetailModal.tsx';
import { ExamSphereTutor } from './components/tutor/ExamSphereTutor.tsx';
import { HomeView } from './components/home/HomeView.tsx';
import { ExamListView } from './components/exam/ExamListView.tsx';
import { QuestionPaperView } from './components/papers/QuestionPaperView.tsx';
import { AdmissionPredictor } from './components/predictor/AdmissionPredictor.tsx';
import { CollegeExplorer } from './components/colleges/CollegeExplorer.tsx';
import { LatestUpdatesView } from './components/updates/LatestUpdatesView.tsx';
import { StudentDashboard } from './components/dashboard/StudentDashboard.tsx';
import { EducatorDashboard } from './components/dashboard/EducatorDashboard.tsx';
import { AdminDashboard } from './components/dashboard/AdminDashboard.tsx';
import { QuizPlayer } from './components/quiz/QuizPlayer.tsx';
import { AuthModal } from './components/layout/AuthModal.tsx';

import { LanguageProvider } from './context/LanguageContext.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { api } from './services/api.ts';
import { ExamRecord, CollegeRecord, RealTimeUpdate, QuestionItem } from './types/index.ts';

function AppContent() {
  const { role, isAuthModalOpen, closeAuthModal } = useAuth();

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState<string | undefined>(undefined);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  // Active quiz state
  const [activeQuiz, setActiveQuiz] = useState<{
    examId: string;
    type: string;
    questions?: QuestionItem[];
  } | null>(null);

  // App data loaded from backend
  const [exams, setExams] = useState<ExamRecord[]>([]);
  const [colleges, setColleges] = useState<CollegeRecord[]>([]);
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getExams(), api.getColleges(), api.getUpdates()])
      .then(([examData, collegeData, updateData]) => {
        setExams(examData);
        setColleges(collegeData);
        setUpdates(updateData);
      })
      .catch((err) => console.error('Failed to load initial data:', err))
      .finally(() => setIsLoading(false));
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K) for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStartQuiz = (examId: string, type: string, questions?: QuestionItem[]) => {
    setActiveQuiz({ examId, type, questions });
    setSelectedExamId(null);
  };

  const handleOpenPredictor = (examId: string) => {
    setCurrentTab('predictor');
    setSelectedExamId(null);
  };

  const handleOpenTutorWithContext = (context: string) => {
    setTutorContext(context);
    setIsTutorOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-700 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-200 transition-colors duration-200">
      {/* Background Interactive Animation */}
      <ConstellationBackground />

      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setActiveQuiz(null);
          setCurrentTab(tab);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTutor={() => {
          setTutorContext(undefined);
          setIsTutorOpen(true);
        }}
      />

      {/* Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeQuiz ? (
          <QuizPlayer
            examId={activeQuiz.examId}
            quizType={activeQuiz.type}
            initialQuestions={activeQuiz.questions}
            onBack={() => setActiveQuiz(null)}
          />
        ) : currentTab === 'home' ? (
          <HomeView
            exams={exams}
            updates={updates}
            onOpenSearch={() => setIsSearchOpen(true)}
            onSelectExam={(id) => setSelectedExamId(id)}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
            onOpenTutor={() => setIsTutorOpen(true)}
          />
        ) : currentTab === 'exams' ? (
          <ExamListView
            exams={exams}
            onSelectExam={(id) => setSelectedExamId(id)}
            onOpenPredictor={(id) => handleOpenPredictor(id)}
            onStartQuiz={(id, type) => handleStartQuiz(id, type)}
          />
        ) : currentTab === 'papers' ? (
          <QuestionPaperView
            onStartQuiz={(id, type, q) => handleStartQuiz(id, type, q)}
            onOpenExam={(id) => setSelectedExamId(id)}
          />
        ) : currentTab === 'practice' ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Dynamic Quiz & Practice Engine
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Choose a diagnostic mode, previous-year question set, or AI adaptive practice test.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Timed Mock Test', desc: 'Simulate official exam timing with negative marking and question palette.', type: 'mock', exam: 'jee-main' },
                { title: 'Topic Speed Drill', desc: 'Focus on speed and conceptual accuracy on high-weightage topics.', type: 'practice', exam: 'ap-eapcet' },
                { title: 'Diagnostic Previous Paper', desc: 'Solve verified official past session question papers.', type: 'previous', exam: 'sat-digital' }
              ].map((quiz, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{quiz.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{quiz.desc}</p>
                  </div>
                  <button
                    onClick={() => handleStartQuiz(quiz.exam, quiz.type)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Start Test ({quiz.exam.toUpperCase()})
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : currentTab === 'colleges' ? (
          <CollegeExplorer
            colleges={colleges}
            onOpenPredictor={(id) => handleOpenPredictor(id)}
          />
        ) : currentTab === 'predictor' ? (
          <AdmissionPredictor
            exams={exams}
            onSelectCollege={() => setCurrentTab('colleges')}
          />
        ) : currentTab === 'updates' ? (
          <LatestUpdatesView />
        ) : currentTab === 'educators' ? (
          <EducatorDashboard />
        ) : currentTab === 'admin' ? (
          <AdminDashboard exams={exams} />
        ) : currentTab === 'dashboard' ? (
          <StudentDashboard
            onStartQuiz={(id, type) => handleStartQuiz(id, type)}
            onOpenPredictor={(id) => handleOpenPredictor(id)}
          />
        ) : null}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Navigation Bar */}
      <MobileNav
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setActiveQuiz(null);
          setCurrentTab(tab);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Search Modal */}
      <GlobalSearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectExam={(id) => {
          setSelectedExamId(id);
          setIsSearchOpen(false);
        }}
        onSelectCollege={() => {
          setCurrentTab('colleges');
          setIsSearchOpen(false);
        }}
        onSelectPaper={(id) => {
          setCurrentTab('papers');
          setIsSearchOpen(false);
        }}
        onNavigateToTab={(tab) => {
          setCurrentTab(tab);
          setIsSearchOpen(false);
        }}
      />

      {/* Exam Detail Modal (16-Sections) */}
      <ExamDetailModal
        examId={selectedExamId}
        onClose={() => setSelectedExamId(null)}
        onStartQuiz={(id, type) => handleStartQuiz(id, type)}
        onOpenPredictor={(id) => handleOpenPredictor(id)}
        onOpenTutorWithContext={(ctx) => handleOpenTutorWithContext(ctx)}
      />

      {/* ExamSphere Tutor (AI Study Assistant with Search Grounding) */}
      <ExamSphereTutor
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        initialContext={tutorContext}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
