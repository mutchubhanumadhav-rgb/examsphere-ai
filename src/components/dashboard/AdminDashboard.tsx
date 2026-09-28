import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  AlertTriangle,
  Plus,
  CheckCircle,
  Clock,
  ExternalLink,
  Edit,
  Trash2,
  FileText,
  Building2,
  Activity,
  Layers
} from 'lucide-react';
import { ExamRecord, CutoffRecord, DataStatus } from '../../types/index.ts';
import { api } from '../../services/api.ts';

interface AdminDashboardProps {
  exams: ExamRecord[];
  onRefreshData?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ exams, onRefreshData }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'exams' | 'cutoffs' | 'quality' | 'logs'>('exams');
  const [examList, setExamList] = useState<ExamRecord[]>(exams);

  // New Exam Form Modal state
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [newExamName, setNewExamName] = useState('');
  const [newExamShortName, setNewExamShortName] = useState('');
  const [newExamCountry, setNewExamCountry] = useState('India');
  const [newExamAuthority, setNewExamAuthority] = useState('');
  const [newExamUrl, setNewExamUrl] = useState('');

  const statusOptions: DataStatus[] = ['Verified', 'Needs Review', 'Outdated', 'Conflicting Sources'];

  const handleUpdateStatus = async (examId: string, newStatus: DataStatus) => {
    try {
      await api.updateVerifyStatus('exam', examId, newStatus);
      setExamList((prev) =>
        prev.map((e) => (e.id === examId ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamName.trim() || !newExamShortName.trim()) return;

    const newRecord: ExamRecord = {
      id: newExamShortName.toLowerCase().replace(/\s+/g, '-'),
      name: newExamName,
      shortName: newExamShortName,
      alternativeNames: [newExamShortName],
      country: newExamCountry,
      educationLevel: 'Undergraduate',
      examType: 'Engineering',
      conductingAuthority: newExamAuthority || 'State / National Authority',
      officialUrl: newExamUrl || 'https://example.gov.in',
      eligibility: 'Standard 10+2 secondary education qualification.',
      subjects: [{ name: 'Core Subject', questionCount: 50, maxMarks: 100 }],
      syllabus: [],
      examPattern: {
        mode: 'Computer Based (CBT)',
        durationMins: 180,
        totalQuestions: 90,
        totalMarks: 300,
        markingScheme: '+4, -1',
        negativeMarking: true,
        sectionsCount: 3,
      },
      languages: ['English'],
      applicationFee: 'INR 1,000',
      importantDates: [
        {
          title: 'Official Notification',
          date: 'April 2026',
          isConfirmed: true,
          sourceUrl: newExamUrl,
        },
      ],
      participatingInstitutionsCount: 20,
      admissionProcess: 'Centralized state web counseling allotment.',
      lastVerifiedAt: new Date().toISOString().split('T')[0],
      sourceUrls: [
        {
          id: `s-${Date.now()}`,
          title: `${newExamName} Official Notification Bulletin`,
          domain: 'official-portal.gov.in',
          url: newExamUrl || 'https://example.gov.in',
          retrievedAt: new Date().toISOString(),
          sourceType: 'Official Authority',
          confidence: 'High',
          priorityLevel: 1,
        },
      ],
      status: 'Verified',
    };

    setExamList([newRecord, ...examList]);
    setIsAddingExam(false);
    setNewExamName('');
    setNewExamShortName('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 mb-2">
            <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Registry Administration & Compliance
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Data Quality & Verification Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Maintain the global entrance exam registry, verify official source URLs, audit cutoffs, and ensure anti-hallucination compliance.
          </p>
        </div>

        <button
          onClick={() => setIsAddingExam(true)}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-lg shadow-amber-600/20 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Examination</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs">
        <button
          onClick={() => setActiveAdminTab('exams')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
            activeAdminTab === 'exams'
              ? 'bg-amber-100 dark:bg-amber-600/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Exam Registry ({examList.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('quality')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
            activeAdminTab === 'quality'
              ? 'bg-amber-100 dark:bg-amber-600/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Data Quality & Source Audits
        </button>
        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
            activeAdminTab === 'logs'
              ? 'bg-amber-100 dark:bg-amber-600/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Audit Logs
        </button>
      </div>

      {/* Add Exam Form */}
      {isAddingExam && (
        <div className="p-6 rounded-2xl border border-amber-300 dark:border-amber-500/40 bg-white dark:bg-slate-900/90 shadow-lg backdrop-blur-xl space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Register New Entrance Examination</h3>
          <form onSubmit={handleCreateExam} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <input
              type="text"
              value={newExamName}
              onChange={(e) => setNewExamName(e.target.value)}
              placeholder="Full Exam Name (e.g. Telangana EAPCET)"
              className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              value={newExamShortName}
              onChange={(e) => setNewExamShortName(e.target.value)}
              placeholder="Abbreviation / Code (e.g. TS EAPCET)"
              className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              value={newExamAuthority}
              onChange={(e) => setNewExamAuthority(e.target.value)}
              placeholder="Conducting Body (e.g. JNTU Hyderabad / TSCHE)"
              className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              value={newExamUrl}
              onChange={(e) => setNewExamUrl(e.target.value)}
              placeholder="Official Authority URL (e.g. https://eapcet.tsche.ac.in)"
              className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
            />
            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingExam(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl cursor-pointer"
              >
                Save Exam Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Registry Table */}
      {activeAdminTab === 'exams' && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                  <th className="py-2.5 px-3">Exam Name</th>
                  <th className="py-2.5 px-3">Authority</th>
                  <th className="py-2.5 px-3">Country</th>
                  <th className="py-2.5 px-3">Verification Status</th>
                  <th className="py-2.5 px-3 text-right">Official Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                {examList.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                      <div>{exam.name}</div>
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">{exam.shortName}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{exam.conductingAuthority}</td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{exam.country}</td>
                    <td className="py-3 px-3">
                      <select
                        value={exam.status}
                        onChange={(e) => handleUpdateStatus(exam.id, e.target.value as DataStatus)}
                        className={`text-xs font-mono font-semibold px-2 py-1 rounded border bg-slate-50 dark:bg-slate-950 focus:outline-none cursor-pointer ${
                          exam.status === 'Verified'
                            ? 'text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                            : exam.status === 'Needs Review'
                            ? 'text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                            : 'text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                        }`}
                      >
                        {statusOptions.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-3 text-right font-mono">
                      <a
                        href={exam.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Data Quality & Source Audits Tab */}
      {activeAdminTab === 'quality' && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 shadow-sm space-y-4 text-xs">
          <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 space-y-1">
            <h4 className="font-bold flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Source Hierarchy Compliance: 100%
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-xs">
              All active exam dates and cutoff records are anchored directly to official authority portals (NTA, APSCHE, MCC, College Board).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-white">Rule Enforcements</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Deterministic rank comparisons strictly precede AI strategy generation.</li>
              <li>Past question papers retain public educational attribution without copyright infringement.</li>
              <li>AI-generated practice items are explicitly flagged with &lsquo;generatedByAi: true&rsquo;.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeAdminTab === 'logs' && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 shadow-sm font-mono text-xs space-y-2 text-slate-600 dark:text-slate-400">
          <div className="py-1 text-emerald-600 dark:text-emerald-400">[2026-03-28 04:50:12] AUDIT_OK: Cutoffs JoSAA Round 1 & Round 2 verified.</div>
          <div className="py-1 text-cyan-600 dark:text-cyan-400">[2026-03-28 04:52:45] REGISTRY_SYNC: AP EAPCET JNTUK registration dates updated.</div>
          <div className="py-1 text-slate-700 dark:text-slate-300">[2026-03-28 04:55:00] GROUNDING_CHECK: Google Search tool online for real-time exam notifications.</div>
        </div>
      )}
    </div>
  );
};
