import { Project, RegionLocation, ProjectStatus } from '../types.ts';
import { 
  Building2, 
  Layers2, 
  SearchCode, 
  MapPin, 
  CircleDollarSign, 
  Calendar, 
  Activity, 
  ChevronRight,
  Filter,
  X
} from 'lucide-react';

interface ProjectListPanelProps {
  locations: RegionLocation[];
  projects: Project[];
  selectedRegionId: string | null;
  onSelectRegion: (id: string | null) => void;
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLightMode: boolean;
}

export default function ProjectListPanel({
  locations,
  projects,
  selectedRegionId,
  onSelectRegion,
  selectedProject,
  onSelectProject,
  filterStatus,
  setFilterStatus,
  filterType,
  setFilterType,
  searchTerm,
  setSearchTerm,
  isLightMode,
}: ProjectListPanelProps) {
  const activeRegion = locations.find((l) => l.id === selectedRegionId);

  // Filter projects by Selected Location AND Search Queries AND Dropdown selectors
  const filteredProjects = projects.filter((p) => {
    // 1. Filter by Region
    if (activeRegion) {
      if (activeRegion.type === 'Barangay') {
        const isBarangayMatch = p.barangay.toLowerCase() === activeRegion.name.replace('Barangay ', '').toLowerCase();
        if (!isBarangayMatch) return false;
      } else {
        const isCityMatch = p.city.toLowerCase() === activeRegion.name.toLowerCase();
        if (!isCityMatch) return false;
      }
    }

    // 2. Filter by search text (Project Name, description, barangay, or city)
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      const matchesSearch = 
        p.project_name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.barangay.toLowerCase().includes(query) ||
        p.city.toLowerCase().includes(query) ||
        p.project_type.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // 3. Filter by Status
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;

    // 4. Filter by Type
    if (filterType !== 'all' && p.project_type !== filterType) return false;

    return true;
  });

  // Calculate high-quality instant summary indicators for the selected scope
  const totalBudget = filteredProjects.reduce((sum, p) => sum + p.budget, 0);
  const ongoingCount = filteredProjects.filter((p) => p.status === 'Ongoing').length;
  const completedCount = filteredProjects.filter((p) => p.status === 'Completed').length;
  const newCount = filteredProjects.filter((p) => p.status === 'New').length;

  const handleClearFilters = () => {
    setFilterStatus('all');
    setFilterType('all');
    setSearchTerm('');
    onSelectRegion(null);
    onSelectProject(null);
  };

  // Helper helper to format Currency neatly
  const formatPESO = (val: number) => {
    if (val >= 1000000000) {
      return `₱${(val / 1000000000).toFixed(2)}B`;
    }
    if (val >= 1000000) {
      return `₱${(val / 1000000).toFixed(1)}M`;
    }
    return `₱${val.toLocaleString()}`;
  };

  // Project Types options
  const projectTypesOptions = [
    { value: 'all', label: 'All Sectors' },
    { value: 'Infrastructure', label: 'Infrastructure' },
    { value: 'Health', label: 'Health & Wellness' },
    { value: 'Education', label: 'Education' },
    { value: 'Environment', label: 'Environment' },
    { value: 'Technology', label: 'Technology / Digital' },
    { value: 'Livelihood', label: 'Livelihood & Skills' },
  ];

  return (
    <div className={`flex flex-col h-full border-l overflow-hidden transition-colors duration-200
      ${isLightMode 
        ? 'bg-zinc-50 border-zinc-200 text-zinc-900 shadow-xl' 
        : 'bg-zinc-900 border-zinc-800 shadow-2xl text-zinc-100'
      }`} id="project-list-panel-container">
      {/* Scope Header */}
      <div className={`p-4 flex-shrink-0 border-b transition-colors duration-200
        ${isLightMode ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className={`text-[10px] uppercase font-bold tracking-wider font-mono ${isLightMode ? 'text-emerald-700' : 'text-emerald-500'}`}>Exploring Locale</span>
            <h2 className={`font-display font-bold text-lg leading-snug flex items-center gap-1.5 mt-0.5
              ${isLightMode ? 'text-zinc-950' : 'text-zinc-150'}`}>
              <MapPin className={`w-4 h-4 flex-shrink-0 ${isLightMode ? 'text-emerald-600' : 'text-emerald-500'}`} />
              {activeRegion ? activeRegion.name : 'All Locales (Philippines)'}
            </h2>
            {activeRegion?.parentName && (
              <p className={`text-xs font-medium font-mono ${isLightMode ? 'text-zinc-550' : 'text-zinc-500'}`}>Part of {activeRegion.parentName}</p>
            )}
          </div>
          {selectedRegionId && (
            <button 
              onClick={() => onSelectRegion(null)}
              className={`p-1.5 rounded-full transition-colors
                ${isLightMode ? 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'}`}
              title="Reset Location Filter"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mini stats cards for the filtered views */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className={`p-2.5 rounded-lg border shadow-xs transition-colors duration-200 ${isLightMode ? 'bg-white border-zinc-300' : 'bg-zinc-900 border-zinc-800'}`}>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Est. Budget</span>
            <span className={`font-mono text-xs font-bold leading-none mt-1.5 block ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>
              {formatPESO(totalBudget)}
            </span>
          </div>
          <div className={`p-2.5 rounded-lg border shadow-xs transition-colors duration-200 ${isLightMode ? 'bg-white border-zinc-300' : 'bg-zinc-900 border-zinc-800'}`}>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Active Registry</span>
            <span className={`text-xs font-bold leading-none mt-1.5 block ${isLightMode ? 'text-zinc-900 font-extrabold' : 'text-zinc-100'}`}>
              {filteredProjects.length} Projects
            </span>
          </div>
        </div>
      </div>

      {/* Advanced Filter Widgets (Combos & Status selector) */}
      <div className={`p-4 border-b flex-shrink-0 space-y-3 transition-colors duration-200
        ${isLightMode ? 'bg-zinc-105 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
        {/* Search bar inside panel */}
        <div className="relative">
          <SearchCode className="absolute left-3 top-2.5 w-4 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search name, category, area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full text-xs pl-9 pr-8 py-2 border rounded-lg focus:outline-none placeholder-zinc-500 font-sans transition-all
              ${isLightMode 
                ? 'bg-white border-zinc-300 text-zinc-950 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/20' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:focus:border-emerald-500/60'
              }`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className={`absolute right-3 top-2.5 text-zinc-500 ${isLightMode ? 'hover:text-zinc-850' : 'hover:text-zinc-300'}`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdowns row */}
        <div className="grid grid-cols-2 gap-2">
          {/* Sector Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">Sector</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`w-full text-xs py-1.5 px-2 border rounded-md focus:outline-none font-sans cursor-pointer transition-colors duration-200
                ${isLightMode 
                  ? 'bg-white border-zinc-300 text-zinc-800 focus:border-emerald-500' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-300 focus:border-emerald-500'
                }`}
            >
              {projectTypesOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">Progress</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`w-full text-xs py-1.5 px-2 border rounded-md focus:outline-none font-sans cursor-pointer transition-colors duration-200
                ${isLightMode 
                  ? 'bg-white border-zinc-300 text-zinc-800 focus:border-emerald-500' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-300 focus:border-emerald-500'
                }`}
            >
              <option value="all">All States</option>
              <option value="New">New / Proposed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Status badges summary counts row */}
        <div className="flex gap-1.5 flex-wrap pt-1 text-[10px]">
          <button 
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-2 py-0.5 rounded-full border transition-all 
              ${filterStatus === 'all' 
                ? (isLightMode ? 'bg-zinc-900 border-zinc-900 text-white font-bold' : 'bg-zinc-100 border-zinc-100 text-zinc-950 font-bold') 
                : (isLightMode ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800/80'
              )}`}
          >
            All · {filteredProjects.length}
          </button>
          <button 
            type="button"
            onClick={() => setFilterStatus('New')}
            className={`px-2 py-0.5 rounded-full border transition-all 
              ${filterStatus === 'New' 
                ? (isLightMode ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold' : 'bg-amber-500/10 border-amber-500/20 text-amber-400 font-bold') 
                : (isLightMode ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800/80'
              )}`}
          >
            New · {projects.filter(p => p.status === 'New' && (!activeRegion || (p.barangay.toLowerCase() === activeRegion.name.replace('Barangay ', '').toLowerCase() || p.city.toLowerCase() === activeRegion.name.toLowerCase()))).length}
          </button>
          <button 
            type="button"
            onClick={() => setFilterStatus('Ongoing')}
            className={`px-2 py-0.5 rounded-full border transition-all 
              ${filterStatus === 'Ongoing' 
                ? (isLightMode ? 'bg-blue-100 border-blue-300 text-blue-900 font-bold' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 font-bold') 
                : (isLightMode ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800/80'
              )}`}
          >
            Ongoing · {projects.filter(p => p.status === 'Ongoing' && (!activeRegion || (p.barangay.toLowerCase() === activeRegion.name.replace('Barangay ', '').toLowerCase() || p.city.toLowerCase() === activeRegion.name.toLowerCase()))).length}
          </button>
          <button 
            type="button"
            onClick={() => setFilterStatus('Completed')}
            className={`px-2 py-0.5 rounded-full border transition-all 
              ${filterStatus === 'Completed' 
                ? (isLightMode ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold') 
                : (isLightMode ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800/80'
              )}`}
          >
            Completed · {projects.filter(p => p.status === 'Completed' && (!activeRegion || (p.barangay.toLowerCase() === activeRegion.name.replace('Barangay ', '').toLowerCase() || p.city.toLowerCase() === activeRegion.name.toLowerCase()))).length}
          </button>
        </div>
      </div>

      {/* Project list results flow */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-3 transition-colors duration-200
        ${isLightMode ? 'bg-zinc-50' : 'bg-zinc-955'}`} id="project-list-results-flow">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((proj) => {
            const isCardSelected = selectedProject?.id === proj.id;
            return (
              <div
                key={proj.id}
                id={`project-card-${proj.id}`}
                onClick={() => onSelectProject(proj)}
                className={`flex flex-col p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left focus:outline-none ${
                  isCardSelected 
                    ? (isLightMode 
                        ? 'border-emerald-600 ring-2 ring-emerald-500/15 shadow-md bg-white' 
                        : 'border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-lg shadow-emerald-500/5 bg-zinc-900/60'
                      ) 
                    : (isLightMode 
                        ? 'border-zinc-300 bg-white hover:border-zinc-400 hover:bg-zinc-100/50' 
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/80'
                      )
                }`}
              >
                {/* Header: Sector Icon & status Badge */}
                <div className="flex items-center justify-between gap-1.5 mb-2.5">
                  <span className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest font-mono
                    ${isLightMode ? 'text-zinc-620' : 'text-zinc-400'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-450" />
                    {proj.project_type}
                  </span>
                  
                  {/* Status Badge */}
                  <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase border
                    ${proj.status === 'Completed' ? (isLightMode ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20') : ''}
                    ${proj.status === 'Ongoing' ? (isLightMode ? 'bg-blue-105 text-blue-800 border-blue-300' : 'bg-blue-500/10 text-blue-400 border-blue-500/20') : ''}
                    ${proj.status === 'New' ? (isLightMode ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-amber-500/10 text-amber-400 border-amber-500/20') : ''}
                  `}>
                    {proj.status}
                  </span>
                </div>

                {/* Name */}
                <h3 className={`font-display font-semibold text-sm leading-snug line-clamp-2 hover:text-emerald-500 transition-colors mb-2
                  ${isLightMode ? 'text-zinc-950 font-bold' : 'text-zinc-100'}`}>
                  {proj.project_name}
                </h3>

                {/* Barangay / Location */}
                <div className={`flex items-center gap-1.5 text-xs mb-3 font-medium ${isLightMode ? 'text-zinc-650' : 'text-zinc-400'}`}>
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-zinc-500" />
                  <span className="line-clamp-1">
                    {proj.barangay ? `${proj.barangay}, ` : ''}{proj.city}
                  </span>
                </div>

                {/* Footer: Budget & Timelines */}
                <div className={`flex items-center justify-between border-t pt-3 mt-1 text-[11px]
                  ${isLightMode ? 'border-zinc-200' : 'border-zinc-800'}`}>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold text-zinc-500 block">Budget</span>
                    <span className={`font-mono font-bold mt-0.5 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>{formatPESO(proj.budget)}</span>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-[9px] uppercase font-bold text-zinc-500 block">Schedule</span>
                    <span className={`font-mono font-medium mt-0.5 ${isLightMode ? 'text-zinc-700 font-semibold' : 'text-zinc-400'}`}>
                      {new Date(proj.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {new Date(proj.completion_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={`text-center py-12 px-4 rounded-xl border border-dashed shadow-xs transition-colors duration-200
            ${isLightMode ? 'bg-white border-zinc-300' : 'bg-zinc-900 border-zinc-800'}`}>
            <Building2 className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
            <p className={`text-sm font-semibold ${isLightMode ? 'text-zinc-800 font-bold font-display' : 'text-zinc-300'}`}>No Projects Found</p>
            <p className="text-xs mt-1 max-w-[200px] mx-auto leading-relaxed text-zinc-505">
              Try adjusting your status/type selections or search keywords.
            </p>
            <button
              onClick={handleClearFilters}
              className={`mt-4 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all
                ${isLightMode
                  ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
                  : 'bg-zinc-950 hover:bg-zinc-850 hover:text-white border-zinc-800 text-zinc-300'
                }`}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
