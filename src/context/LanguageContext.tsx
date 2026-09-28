import React, { createContext, useContext, useState } from 'react';

export type SupportedLanguage = 'en' | 'te' | 'hi';

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    brandName: 'ExamSphere AI',
    tagline: 'Global Entrance Exam & Admission Intelligence Platform',
    heroTitle: 'Your Global Exam & Admission Intelligence Platform',
    heroSubtitle: 'Discover entrance exams, practice verified previous year questions, track your progress, and explore college admission opportunities using verified cutoff data.',
    searchPlaceholder: 'Search exams (e.g. JEE Main, AP EAMCET, NEET, SAT, GATE), colleges, or topics...',
    exploreExams: 'Explore Exams',
    admissionPredictor: 'Admission Predictor',
    practiceNow: 'Practice Now',
    navExams: 'Exams',
    navPapers: 'Question Papers',
    navPractice: 'Practice & Quizzes',
    navColleges: 'Colleges',
    navPredictor: 'Predictor',
    navUpdates: 'Latest Updates',
    navEducators: 'Educators',
    navDashboard: 'Dashboard',
    navAdmin: 'Admin Console',
    popularExams: 'Popular Entrance Examinations',
    trendingExams: 'Trending Globally & Nationally',
    latestUpdates: 'Live Exam & Admission Updates',
    verifiedSources: 'Official & Verified Sources',
    sourcePriorityInfo: 'Prioritized by Official Authority > Government > University Portals',
    officialDisclaimer: 'Data presented is based on verified public authorities. Live updates utilize web-grounded validation.',
    takeMockTest: 'Take Mock Test',
    viewCutoffs: 'Verified Cutoffs',
    eligibility: 'Eligibility Criteria',
    examPattern: 'Exam Pattern',
    completeSyllabus: 'Syllabus',
    tutorAssistant: 'ExamSphere Tutor',
    askTutor: 'Ask ExamSphere Tutor',
  },
  te: {
    brandName: 'ఎగ్జామ్ స్పియర్ AI',
    tagline: 'గ్లోబల్ ప్రవేశ పరీక్షలు మరియు అడ్మిషన్ల సమాచార వేదిక',
    heroTitle: 'మీ గ్లోబల్ పరీక్ష & అడ్మిషన్ ఇంటెలిజెన్స్ ప్లాట్‌ఫారమ్',
    heroSubtitle: 'ప్రపంచ ప్రవేశ పరీక్షలను కనుగొనండి, గత ప్రశ్నలను ప్రాక్టీస్ చేయండి, ఖచ్చితమైన కటాఫ్ సమాచారంతో కళాశాల అడ్మిషన్ అవకాశాలను విశ్లేషించండి.',
    searchPlaceholder: 'పరీక్షలు (JEE, AP EAMCET, NEET, GATE), కళాశాలలు లేదా అంశాలను శోధించండి...',
    exploreExams: 'పరీక్షలను అన్వేషించండి',
    admissionPredictor: 'అడ్మిషన్ ప్రిడిక్టర్',
    practiceNow: 'ఇప్పుడే ప్రాక్టీస్ చేయండి',
    navExams: 'పరీక్షలు',
    navPapers: 'గత ప్రశ్నపత్రాలు',
    navPractice: 'ప్రాక్టీస్ & క్విజ్‌లు',
    navColleges: 'కళాశాలలు',
    navPredictor: 'అడ్మిషన్ ప్రిడిక్టర్',
    navUpdates: 'తాజా సమాచారం',
    navEducators: 'విద్యావేత్తలు',
    navDashboard: 'డాష్‌బోర్డ్',
    navAdmin: 'అడ్మిన్ డెస్క్',
    popularExams: 'ప్రముఖ ప్రవేశ పరీక్షలు',
    trendingExams: 'ట్రెండింగ్ పరీక్షలు',
    latestUpdates: 'తాజా అధికారిక నోటిఫికేషన్లు',
    verifiedSources: 'ధృవీకరించబడిన అధికారిక మూలాలు',
    sourcePriorityInfo: 'అధికారిక సంస్థలు > ప్రభుత్వ పోర్టల్స్ > విశ్వవిద్యాలయాల మూలాలు',
    officialDisclaimer: 'ఈ డేటా ధృవీకరించబడిన అధికారిక మూలాల ఆధారంగా రూపొందించబడింది.',
    takeMockTest: 'మాక్ టెస్ట్ రాయండి',
    viewCutoffs: 'కటాఫ్ వివరాలు',
    eligibility: 'అర్హత నిబంధనలు',
    examPattern: 'పరీక్షా విధానం',
    completeSyllabus: 'సిలబస్',
    tutorAssistant: 'ఎగ్జామ్ స్పియర్ ట్యూటర్',
    askTutor: 'AI ట్యూటర్‌ను అడగండి',
  },
  hi: {
    brandName: 'एग्जाम स्फीयर AI',
    tagline: 'वैश्विक प्रवेश परीक्षा एवं प्रवेश परामर्श प्लेटफॉर्म',
    heroTitle: 'आपका वैश्विक परीक्षा एवं प्रवेश आसूचना मंच',
    heroSubtitle: 'प्रवेश परीक्षाओं की खोज करें, पिछले वर्षों के प्रश्नों का अभ्यास करें, और सत्यापित कटऑफ डेटा का उपयोग करके कॉलेज प्रवेश अवसरों का विश्लेषण करें।',
    searchPlaceholder: 'प्रवेश परीक्षाएं (JEE, NEET, GATE, EAMCET), कॉलेज या विषय खोजें...',
    exploreExams: 'परीक्षाएं देखें',
    admissionPredictor: 'प्रवेश भविष्यवक्ता',
    practiceNow: 'अभी अभ्यास करें',
    navExams: 'परीक्षाएं',
    navPapers: 'प्रश्न पत्र',
    navPractice: 'अभ्यास व क्विज़',
    navColleges: 'कॉलेज',
    navPredictor: 'प्रवेश विश्लेषक',
    navUpdates: 'नवीनतम अपडेट',
    navEducators: 'शिक्षक पोर्टल',
    navDashboard: 'डैशबोर्ड',
    navAdmin: 'एडमिन पैनल',
    popularExams: 'लोकप्रिय प्रवेश परीक्षाएं',
    trendingExams: 'ट्रेंडिंग परीक्षाएं',
    latestUpdates: 'लाइव परीक्षा व प्रवेश सूचनाएं',
    verifiedSources: 'सत्यापित आधिकारिक स्रोत',
    sourcePriorityInfo: 'प्राथमिकता: आधिकारिक संस्था > सरकारी पोर्टल > विश्वविद्यालय',
    officialDisclaimer: 'प्रदर्शित डेटा आधिकारिक पोर्टलों द्वारा सत्यापित है।',
    takeMockTest: 'मॉक टेस्ट दें',
    viewCutoffs: 'सत्यापित कटऑफ',
    eligibility: 'पात्रता मानदंड',
    examPattern: 'परीक्षा पैटर्न',
    completeSyllabus: 'पाठ्यक्रम',
    tutorAssistant: 'एग्जाम स्फीयर ट्यूटर',
    askTutor: 'AI ट्यूटर से पूछें',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
