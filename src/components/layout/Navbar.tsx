import React, { useState } from 'react';
import {
  Search,
  Globe,
  Compass,
  FileText,
  CheckCircle,
  GraduationCap,
  Sparkles,
  User,
  Shield,
  BookOpen,
  Menu,
  X,
  TrendingUp,
  Brain,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { useLanguage, SupportedLanguage } from '../../context/LanguageContext.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { useTheme, Theme } from '../../context/ThemeContext.tsx';
import { UserRole } from '../../types/index.ts';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenTutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  onOpenTutor,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, role, setRole, openAuthModal } = useAuth();
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'exams', label: t('navExams'), icon: GraduationCap },
    { id: 'papers', label: t('navPapers'), icon: FileText },
    { id: 'practice', label: t('navPractice'), icon: CheckCircle },
    { id: 'colleges', label: t('navColleges'), icon: BookOpen },
    { id: 'predictor', label: t('navPredictor'), icon: Sparkles },
    { id: 'updates', label: t('navUpdates'), icon: TrendingUp },
    ...(role === 'educator'
      ? [{ id: 'educators', label: t('navEducators'), icon: BookOpen }]
      : []),
    ...(role === 'admin'
      ? [{ id: 'admin', label: t('navAdmin'), icon: Shield }]
      : []),
    { id: 'dashboard', label: t('navDashboard'), icon: User },
  ];

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'te', label: 'తెలుగు', flag: 'TE' },
    { code: 'hi', label: 'हिन्दी', flag: 'HI' },
  ];

  const roles: { role: UserRole; title: string }[] = [
    { role: 'student', title: 'Student View' },
    { role: 'educator', title: 'Educator View' },
    { role: 'admin', title: 'Admin Console' },
  ];

  const themeOptions: { value: Theme; label: string; icon: any }[] = [
    { value: 'light', label: 'Light Mode', icon: Sun },
    { value: 'dark', label: 'Dark Mode', icon: Moon },
    { value: 'system', label: 'System Default', icon: Laptop },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg group"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  ExamSphere <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm">AI</span>
                </span>
                <span className="hidden sm:block text-[10px] tracking-wide text-slate-500 dark:text-slate-400 uppercase -mt-1 font-mono">
                  Global Exam Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-600/20 dark:text-indigo-300 dark:border-indigo-500/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Search, Tutor, Theme Toggle, Language, Role Switcher */}
          <div className="flex items-center gap-2">
            {/* Global Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg transition-colors group"
              title="Search exams, cutoffs, papers (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* ExamSphere Tutor Button */}
            <button
              onClick={onOpenTutor}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 rounded-lg shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Brain className="w-3.5 h-3.5 text-cyan-200" />
              <span className="hidden sm:inline">Tutor</span>
            </button>

            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsThemeDropdownOpen(!isThemeDropdownOpen);
                  setIsLangDropdownOpen(false);
                  setIsRoleDropdownOpen(false);
                }}
                className="flex items-center justify-center p-2 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors"
                title={`Current Theme: ${theme}. Click to switch theme.`}
                aria-label="Toggle Theme"
              >
                {resolvedTheme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                )}
              </button>

              {isThemeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[10px] uppercase font-mono text-slate-400 border-b border-slate-100 dark:border-slate-800/80">
                    Theme
                  </div>
                  {themeOptions.map((tOpt) => {
                    const OptIcon = tOpt.icon;
                    const isSelected = theme === tOpt.value;
                    return (
                      <button
                        key={tOpt.value}
                        onClick={() => {
                          setTheme(tOpt.value);
                          setIsThemeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 font-semibold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <OptIcon className="w-3.5 h-3.5" />
                          <span>{tOpt.label}</span>
                        </div>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                  setIsRoleDropdownOpen(false);
                  setIsThemeDropdownOpen(false);
                }}
                className="flex items-center gap-1 p-2 text-xs font-mono text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors"
                title="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-[11px] font-bold uppercase">{language}</span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[10px] uppercase font-mono text-slate-400 border-b border-slate-100 dark:border-slate-800/80">
                    Language
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                        language === l.code
                          ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[10px] font-mono text-slate-400">{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Switcher (Student / Educator / Admin) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setIsRoleDropdownOpen(!isRoleDropdownOpen);
                  setIsLangDropdownOpen(false);
                  setIsThemeDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border transition-all ${
                  role === 'admin'
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : role === 'educator'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Toggle Persona"
              >
                {role === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                ) : role === 'educator' ? (
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                )}
                <span className="capitalize text-[11px] font-semibold">{role}</span>
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50">
                  <div className="px-3 py-1 text-[10px] uppercase font-mono text-slate-400 border-b border-slate-100 dark:border-slate-800/80">
                    Switch Persona
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        setRole(r.role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        role === r.role
                          ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span>{r.title}</span>
                      {role === r.role && <CheckCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account / Auth Button */}
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
              title="Account & Auth"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {user ? (user.name ? user.name.split(' ')[0] : 'Account') : 'Sign In'}
              </span>
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-600/20 dark:text-indigo-300 dark:border-indigo-500/30'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Theme:</span>
            <div className="flex gap-1">
              {themeOptions.map((tOpt) => (
                <button
                  key={tOpt.value}
                  onClick={() => setTheme(tOpt.value)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium capitalize ${
                    theme === tOpt.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {tOpt.value}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Current Persona:</span>
            <div className="flex gap-1">
              {roles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => setRole(r.role)}
                  className={`px-2 py-1 text-xs rounded font-medium ${
                    role === r.role
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {r.role}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
