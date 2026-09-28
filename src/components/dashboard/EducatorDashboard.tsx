import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Users,
  Award,
  Calendar,
  CheckCircle,
  FileText,
  BarChart2,
  Copy,
  Check,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { EducatorClassroom } from '../../types/index.ts';
import { api } from '../../services/api.ts';

export const EducatorDashboard: React.FC = () => {
  const [classrooms, setClassrooms] = useState<EducatorClassroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingClass, setIsCreatingClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassExam, setNewClassExam] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New assignment modal
  const [isCreatingAssignment, setIsCreatingAssignment] = useState<string | null>(null);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentQuestions, setAssignmentQuestions] = useState('15');

  useEffect(() => {
    setIsLoading(true);
    api.getClassrooms()
      .then((data) => setClassrooms(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    try {
      const created = await api.createClassroom(newClassName, newClassExam || 'Engineering Entrance Prep');
      setClassrooms([created, ...classrooms]);
      setNewClassName('');
      setNewClassExam('');
      setIsCreatingClass(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleAddAssignment = (classId: string) => {
    if (!assignmentTitle.trim()) return;
    setClassrooms((prev) =>
      prev.map((c) => {
        if (c.id === classId) {
          return {
            ...c,
            assignments: [
              ...c.assignments,
              {
                id: `as-${Date.now()}`,
                title: assignmentTitle,
                dueDate: '2026-04-20',
                questionsCount: parseInt(assignmentQuestions, 10) || 15,
                completedCount: 0,
              },
            ],
          };
        }
        return c;
      })
    );
    setAssignmentTitle('');
    setIsCreatingAssignment(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Educator & Faculty Portal
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Classroom Management & Test Distribution
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Create structured entrance exam cohorts, assign adaptive mock tests, and review class-level accuracy without exposing private student data.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingClass(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Cohort</span>
        </button>
      </div>

      {/* Create Class Form */}
      {isCreatingClass && (
        <div className="p-6 rounded-2xl border border-indigo-200 dark:border-indigo-500/40 bg-white dark:bg-slate-900/90 shadow-md backdrop-blur-xl space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Create a New Student Cohort</h3>
          <form onSubmit={handleCreateClassroom} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder="Cohort Name (e.g. AP EAPCET Math Super 60)"
              className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              value={newClassExam}
              onChange={(e) => setNewClassExam(e.target.value)}
              placeholder="Subject or Exam (e.g. Calculus / JEE Main)"
              className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl cursor-pointer"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingClass(false)}
                className="px-3 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cohorts List */}
      <div className="space-y-6">
        {classrooms.map((cls) => (
          <div
            key={cls.id}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{cls.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 font-semibold">
                    {cls.subjectOrExam}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <strong>{cls.studentsCount} Students</strong>
                  </span>
                  <span>·</span>
                  <span>Created: {cls.createdAt}</span>
                </div>
              </div>

              {/* Student Invite Code */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">Invite Code:</span>
                <button
                  onClick={() => handleCopyCode(cls.joinCode)}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-cyan-600 dark:text-cyan-400 font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{cls.joinCode}</span>
                  {copiedCode === cls.joinCode ? (
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Assignments in this class */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">
                  Assigned Tests & Quizzes ({cls.assignments.length})
                </span>
                <button
                  onClick={() => setIsCreatingAssignment(cls.id)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Assign Test</span>
                </button>
              </div>

              {isCreatingAssignment === cls.id && (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex flex-wrap gap-2 text-xs animate-in fade-in">
                  <input
                    type="text"
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    placeholder="Assignment / Test Name (e.g. Kinematics Timed Quiz)"
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-800 dark:text-slate-200"
                  />
                  <input
                    type="number"
                    value={assignmentQuestions}
                    onChange={(e) => setAssignmentQuestions(e.target.value)}
                    placeholder="Questions count"
                    className="w-28 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-800 dark:text-slate-200 font-mono"
                  />
                  <button
                    onClick={() => handleAddAssignment(cls.id)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold cursor-pointer"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setIsCreatingAssignment(null)}
                    className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {cls.assignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{asg.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Due: {asg.dueDate} · {asg.questionsCount} Questions
                      </p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{asg.completedCount}</span>
                      <span className="text-slate-500 dark:text-slate-400">/{cls.studentsCount} Done</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
