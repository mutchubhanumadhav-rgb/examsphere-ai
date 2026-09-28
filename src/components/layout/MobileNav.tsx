import React from 'react';
import { Compass, Search, GraduationCap, CheckCircle, Sparkles, User } from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
}) => {
  const items = [
    { id: 'home', label: 'Home', icon: Compass, action: () => setCurrentTab('home') },
    { id: 'search', label: 'Search', icon: Search, action: onOpenSearch },
    { id: 'exams', label: 'Exams', icon: GraduationCap, action: () => setCurrentTab('exams') },
    { id: 'practice', label: 'Practice', icon: CheckCircle, action: () => setCurrentTab('practice') },
    { id: 'predictor', label: 'Predictor', icon: Sparkles, action: () => setCurrentTab('predictor') },
    { id: 'dashboard', label: 'Dashboard', icon: User, action: () => setCurrentTab('dashboard') },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800/80 px-2 py-1 safe-area-pb transition-colors duration-200"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-indigo-600 dark:text-indigo-400' : ''}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
