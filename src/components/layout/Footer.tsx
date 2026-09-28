import React from 'react';
import { ShieldCheck, ExternalLink, Globe, Scale, BookOpen, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.tsx';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 text-slate-600 dark:text-slate-400 mt-20 pb-16 lg:pb-8 transition-colors duration-200">
      {/* Verification Protocol Banner */}
      <div className="border-b border-slate-200 dark:border-slate-800/60 bg-indigo-50/70 dark:bg-indigo-950/20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="font-semibold">Academic Integrity & Source Priority Protocol:</span>
            <span className="hidden sm:inline text-slate-600 dark:text-slate-400">
              1. Official Examination Authority · 2. Government Portals · 3. University Websites · 4. Counseling Bodies
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400/90 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>If sources disagree, ExamSphere explicitly flags: &ldquo;Sources disagree. Please verify using the official authority.&rdquo;</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                ES
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white text-base">
                ExamSphere <span className="text-cyan-600 dark:text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Global learning, entrance-exam discovery, and verified admission opportunity intelligence platform for students, educators, and institutions.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>Multi-Region Coverage (India, US, UK, Global)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
              Exam Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Engineering (JEE Main, Advanced, AP EAPCET, GATE)</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Medical (NEET UG, AIIMS, UCAT)</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Global Standardized (SAT Digital, GRE, ACT)</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Management & Law (CAT, CLAT, BMAT)</span></li>
            </ul>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
              Intelligence Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Admission Predictor (Verified Cutoffs)</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Interactive Dynamic Quiz Engine</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Past Year Question Paper Bank</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">ExamSphere Tutor with Web Grounding</span></li>
            </ul>
          </div>

          {/* Compliance & Transparency */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
              Source Transparency
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              No guaranteed admission is claimed. Predictions utilize deterministic historical opening & closing ranks from official counseling bodies (JoSAA, APSCHE, MCC, College Board).
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>Complies with Educational Fair Use & Public Data Norms</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ExamSphere AI. Built with Google AI Studio.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer">Privacy & Data Quality</span>
            <span>·</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer">Official Source Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
