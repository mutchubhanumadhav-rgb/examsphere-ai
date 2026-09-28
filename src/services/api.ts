import {
  ExamRecord,
  CollegeRecord,
  CutoffRecord,
  QuestionItem,
  RealTimeUpdate,
  AdmissionPredictorInput,
  AdmissionPredictorMatch,
  EducatorClassroom,
  QuizAttempt,
} from '../types/index.ts';

export const api = {
  async getExams(filters?: { country?: string; examType?: string; educationLevel?: string; query?: string }): Promise<ExamRecord[]> {
    const params = new URLSearchParams();
    if (filters?.country) params.append('country', filters.country);
    if (filters?.examType) params.append('examType', filters.examType);
    if (filters?.educationLevel) params.append('educationLevel', filters.educationLevel);
    if (filters?.query) params.append('query', filters.query);

    const res = await fetch(`/api/exams?${params.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  async getExamById(id: string): Promise<any> {
    const res = await fetch(`/api/exams/${id}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch exam');
    return data.data;
  },

  async getColleges(filters?: { country?: string; course?: string; exam?: string; query?: string }): Promise<CollegeRecord[]> {
    const params = new URLSearchParams();
    if (filters?.country) params.append('country', filters.country);
    if (filters?.course) params.append('course', filters.course);
    if (filters?.exam) params.append('exam', filters.exam);
    if (filters?.query) params.append('query', filters.query);

    const res = await fetch(`/api/colleges?${params.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  async getCollegeById(id: string): Promise<any> {
    const res = await fetch(`/api/colleges/${id}`);
    const data = await res.json();
    return data.data;
  },

  async searchGlobal(query: string, liveGrounding = false): Promise<any> {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, liveGrounding }),
    });
    return res.json();
  },

  async analyzeAdmission(input: AdmissionPredictorInput): Promise<{
    matches: AdmissionPredictorMatch[];
    totalAnalyzedRecords: number;
    officialDisclaimer: string;
  }> {
    const res = await fetch('/api/admission/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Admission analysis failed');
    return data;
  },

  async getAiCounselingAdvice(input: AdmissionPredictorInput, matches: AdmissionPredictorMatch[]): Promise<string> {
    const res = await fetch('/api/admission/ai-advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, matches }),
    });
    const data = await res.json();
    return data.advice || '';
  },

  async generateQuiz(params: {
    examId?: string;
    subject?: string;
    topic?: string;
    count?: number;
    mode?: string;
    difficulty?: string;
  }): Promise<{ questions: QuestionItem[]; isAiGenerated: boolean }> {
    const res = await fetch('/api/quiz/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return { questions: data.questions || [], isAiGenerated: Boolean(data.isAiGenerated) };
  },

  async submitQuiz(attempt: Partial<QuizAttempt>): Promise<any> {
    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attempt),
    });
    return res.json();
  },

  async getProgress(): Promise<any> {
    const res = await fetch('/api/progress');
    const data = await res.json();
    return data.data;
  },

  async askTutor(message: string, examContext?: string, history?: any[]): Promise<{ reply: string; citations: any[] }> {
    const res = await fetch('/api/ai/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, examContext, history }),
    });
    const data = await res.json();
    return { reply: data.reply || '', citations: data.citations || [] };
  },

  async getUpdates(category?: string): Promise<RealTimeUpdate[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    const res = await fetch(`/api/updates?${params.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  async fetchExamLiveGrounding(examId: string): Promise<{
    summary: string;
    citations: any[];
    modelUsed?: string;
    retrievedAt: string;
  }> {
    const res = await fetch(`/api/exams/${examId}/live-grounding`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch live exam data');
    return data;
  },

  async fetchUpdatesLiveGrounding(): Promise<{
    summary: string;
    citations: any[];
    modelUsed?: string;
    retrievedAt: string;
  }> {
    const res = await fetch('/api/updates/live-grounding');
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch live updates');
    return data;
  },

  async getClassrooms(): Promise<EducatorClassroom[]> {
    const res = await fetch('/api/classrooms');
    const data = await res.json();
    return data.data || [];
  },

  async createClassroom(name: string, subjectOrExam: string): Promise<EducatorClassroom> {
    const res = await fetch('/api/classrooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, subjectOrExam }),
    });
    const data = await res.json();
    return data.data;
  },

  async updateVerifyStatus(type: 'exam' | 'cutoff', id: string, status: string): Promise<any> {
    const res = await fetch('/api/admin/verify-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id, status }),
    });
    return res.json();
  }
};
