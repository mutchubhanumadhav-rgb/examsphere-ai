import React, { useState } from 'react';
import {
  Building2,
  ExternalLink,
  GraduationCap,
  MapPin,
  CheckCircle,
  Scale,
  Sparkles,
  ArrowRight,
  Filter,
  DollarSign,
  Briefcase,
  X
} from 'lucide-react';
import { CollegeRecord } from '../../types/index.ts';

interface CollegeExplorerProps {
  colleges: CollegeRecord[];
  onSelectCollege?: (collegeId: string) => void;
  onOpenPredictor?: (examId: string) => void;
}

export const CollegeExplorer: React.FC<CollegeExplorerProps> = ({
  colleges,
  onSelectCollege,
  onOpenPredictor,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Comparison state (select up to 2 colleges to compare factually)
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const filteredColleges = colleges.filter((col) => {
    let match = true;
    if (selectedCountry !== 'all' && col.country.toLowerCase() !== selectedCountry.toLowerCase()) {
      match = false;
    }
    if (selectedCourse !== 'all' && !col.courses.some((c) => c.toLowerCase().includes(selectedCourse.toLowerCase()))) {
      match = false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      match =
        col.name.toLowerCase().includes(q) ||
        col.city.toLowerCase().includes(q) ||
        col.stateRegion.toLowerCase().includes(q) ||
        col.branches.some((b) => b.toLowerCase().includes(q));
    }
    return match;
  });

  const toggleComparison = (id: string) => {
    setComparisonIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const comparedColleges = colleges.filter((c) => comparisonIds.includes(c.id));

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-indigo-800 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-950/60 border border-indigo-300/80 dark:border-indigo-800/60 mb-2">
            <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Verified Higher Education Directory
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Institutions & Universities
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Explore recognized institutions worldwide, approved entrance exam pathways, verified tuition fees, accreditation, and campus facts.
          </p>
        </div>

        {comparisonIds.length > 0 && (
          <button
            onClick={() => setIsComparing(true)}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/20 flex items-center gap-2 transition-all shrink-0"
          >
            <Scale className="w-4 h-4" />
            <span>Compare Selected ({comparisonIds.length}/2)</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 text-xs shadow-sm">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by college name, city, state, or branch..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Countries</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
          </select>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Degrees</option>
            <option value="B.Tech">B.Tech / B.E.</option>
            <option value="MBBS">MBBS</option>
            <option value="Bachelor of Science">BS (USA / Global)</option>
          </select>
        </div>
      </div>

      {/* Comparison Modal Overlay */}
      {isComparing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 dark:bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-950/60">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Scale className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Factual Academic Institution Comparison</span>
              </div>
              <button
                onClick={() => setIsComparing(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {comparedColleges.map((col) => (
                  <div key={col.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{col.name}</h3>
                    <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{col.city}, {col.stateRegion} ({col.country})</span>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 font-mono">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Institution Type:</span>
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">{col.institutionType}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Recognized Exam Routes:</span>
                        <span className="text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
                          {col.recognizedExamRoutes.join(', ')}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Accreditation / Eminence:</span>
                        <span className="text-slate-800 dark:text-slate-200">{col.accreditation || 'Verified Public Body'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Placement Rate / Package:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          {col.placementRate} (Avg {col.averagePackage})
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Estimated Tuition per Year:</span>
                        <span className="text-slate-800 dark:text-slate-200">{col.tuitionPerYear}</span>
                      </div>
                    </div>

                    <a
                      href={col.officialWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-semibold"
                    >
                      <span>Visit Official Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => {
          const isSelected = comparisonIds.includes(college.id);
          return (
            <div
              key={college.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50/80 dark:hover:bg-slate-900/90 hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between group space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <button
                    onClick={() => toggleComparison(college.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all ${
                      isSelected
                        ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/50'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : '+ Compare'}
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {college.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{college.city}, {college.stateRegion} · {college.country}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Degree: {college.courses.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Placement: {college.placementRate} ({college.averagePackage})</span>
                  </div>
                  {college.tuitionPerYear && (
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      <DollarSign className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <span>{college.tuitionPerYear}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <a
                  href={college.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 font-medium"
                >
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {onOpenPredictor && college.recognizedExamRoutes?.[0] && (
                  <button
                    onClick={() => onOpenPredictor(college.recognizedExamRoutes[0])}
                    className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <span>Predict Cutoff</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
