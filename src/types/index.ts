export type UserRole = 'student' | 'educator' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  targetExams?: string[];
  educationLevel?: string;
  country?: string;
  createdAt: string;
}

export type DataStatus = 'Verified' | 'Needs Review' | 'Outdated' | 'Conflicting Sources' | 'Unavailable';

export interface SourceCitation {
  id: string;
  title: string;
  domain: string;
  url: string;
  retrievedAt: string;
  sourceType: 'Official Authority' | 'Government' | 'University Portal' | 'Counseling Portal' | 'Academic Organization' | 'Secondary Source' | 'Other';
  confidence: 'High' | 'Medium' | 'Low';
  priorityLevel: number; // 1 = Official authority, 7 = Other
  notes?: string;
}

export interface ImportantDate {
  title: string;
  date: string;
  isConfirmed: boolean;
  notes?: string;
  sourceUrl?: string;
}

export interface ExamSubject {
  name: string;
  questionCount: number;
  maxMarks: number;
  durationMins?: number;
}

export interface SyllabusTopic {
  unitName: string;
  topics: string[];
  weightageEstimated?: string;
}

export interface ExamRecord {
  id: string;
  name: string;
  shortName: string;
  alternativeNames: string[];
  country: string;
  regionState?: string;
  educationLevel: 'Undergraduate' | 'Postgraduate' | 'Doctorate' | 'School / K12';
  examType: 'Engineering' | 'Medical' | 'Management' | 'General' | 'Law' | 'Civil Services' | 'Sciences';
  conductingAuthority: string;
  officialUrl: string;
  registrationUrl?: string;
  resultUrl?: string;
  eligibility: string;
  ageRequirement?: string;
  subjects: ExamSubject[];
  syllabus: {
    subject: string;
    units: SyllabusTopic[];
  }[];
  examPattern: {
    mode: 'Computer Based (CBT)' | 'Pen and Paper (PBT)' | 'Hybrid';
    durationMins: number;
    totalQuestions: number;
    totalMarks: number;
    markingScheme: string;
    negativeMarking: boolean;
    negativeMarkingValue?: string;
    sectionsCount: number;
  };
  languages: string[];
  applicationFee: string;
  attemptsAllowed?: string;
  importantDates: ImportantDate[];
  participatingInstitutionsCount: number;
  admissionProcess: string;
  lastVerifiedAt: string;
  sourceUrls: SourceCitation[];
  status: DataStatus;
  popularRank?: number;
  logoIcon?: string;
}

export interface CutoffRecord {
  id: string;
  examId: string;
  examName: string;
  admissionYear: number;
  institutionId: string;
  institutionName: string;
  campus?: string;
  course: string;
  branch: string;
  category: 'General' | 'OBC-NCL' | 'SC' | 'ST' | 'EWS' | 'Open';
  quota: 'All India' | 'Home State' | 'AU Region' | 'SVU Region' | 'Management' | 'NRI';
  domicileRule?: string;
  counselingRound: number | string;
  openingRank?: number;
  closingRank: number;
  openingScore?: number;
  closingScore?: number;
  source: string;
  officialUrl: string;
  verificationDate: string;
  dataStatus: DataStatus;
}

export interface CollegeRecord {
  id: string;
  name: string;
  country: string;
  stateRegion: string;
  city: string;
  campus?: string;
  institutionType: 'Government / Public' | 'Private' | 'Autonomous' | 'Deemed' | 'Ivy League / Premier';
  courses: string[];
  branches: string[];
  officialWebsite: string;
  admissionsWebsite: string;
  recognizedExamRoutes: string[];
  tuitionPerYear?: string;
  scholarshipsAvailable?: boolean;
  accommodationAvailable?: boolean;
  accreditation?: string;
  placementRate?: string;
  averagePackage?: string;
  source: string;
  lastVerifiedDate: string;
  logoIcon?: string;
}

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface QuestionItem {
  id: string;
  examId: string;
  examName: string;
  year?: number;
  session?: string;
  paperCode?: string;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: QuestionOption[];
  correctAnswer: string; // 'A', 'B', 'C', 'D'
  explanation: string;
  source: string;
  verified: boolean;
  generatedByAi: boolean;
  licenseUsageStatus?: string;
}

export interface QuestionPaperMeta {
  id: string;
  examId: string;
  examName: string;
  year: number;
  session: string;
  subject: string;
  paperSet: string;
  questionCount: number;
  durationMins: number;
  source: string;
  licenseStatus: string;
  solutionAvailability: boolean;
  officialUrl: string;
  documentUrl?: string;
  verificationStatus: DataStatus;
  questions: QuestionItem[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  quizType: 'Quick' | 'Subject' | 'Topic' | 'Previous-Year' | 'Weak-Area' | 'Timed' | 'Mock' | 'AI Practice';
  examId: string;
  examName: string;
  startedAt: string;
  completedAt?: string;
  durationSpentSeconds: number;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  totalMarksEarned: number;
  maxPossibleMarks: number;
  accuracyPercentage: number;
  answers: Record<string, {
    selectedAnswer: string;
    isCorrect: boolean;
    timeSpentSeconds?: number;
  }>;
}

export interface RealTimeUpdate {
  id: string;
  headline: string;
  summary: string;
  examOrInstitution: string;
  category: 'exams' | 'admissions' | 'results' | 'applications' | 'counseling' | 'scholarships' | 'universities';
  publicationDate?: string;
  source: string;
  sourceType: 'Official Authority' | 'Government' | 'University Portal' | 'Counseling Portal' | 'Secondary Source';
  isOfficial: boolean;
  retrievalTimestamp: string;
  link: string;
  confidence: 'High' | 'Medium' | 'Low';
  hasConflicts?: boolean;
}

export interface AdmissionPredictorInput {
  country: string;
  stateRegion?: string;
  examId: string;
  admissionYear: number;
  marks?: number;
  percentile?: number;
  rank?: number;
  category: 'General' | 'OBC-NCL' | 'SC' | 'ST' | 'EWS' | 'Open';
  domicile?: string;
  preferredCourse?: string;
  preferredBranch?: string;
  counselingRound?: string;
}

export interface AdmissionPredictorMatch {
  institution: CollegeRecord;
  cutoff: CutoffRecord;
  categoryMatch: 'Matches available cutoff data' | 'Close to historical cutoff range' | 'Outside available cutoff range' | 'Insufficient current data';
  rankDifference?: number;
  confidenceNotes: string;
}

export interface EducatorClassroom {
  id: string;
  educatorId: string;
  name: string;
  subjectOrExam: string;
  joinCode: string;
  studentsCount: number;
  createdAt: string;
  assignments: {
    id: string;
    title: string;
    dueDate: string;
    questionsCount: number;
    completedCount: number;
  }[];
}

export const TypesVersion = '1.0.0';
