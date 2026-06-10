import { useState, useRef, useEffect } from 'react';
import { Search, Map, HelpCircle, CornerDownRight, Landmark, Building2, MapPin, X, Briefcase, Sun, Moon } from 'lucide-react';
import { RegionLocation, Project } from '../types.ts';

interface NavbarProps {
  locations: RegionLocation[];
  projects: Project[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectRegion: (id: string | null) => void;
  onSelectProject: (project: Project | null) => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({
  locations,
  projects,
  searchTerm,
  setSearchTerm,
  onSelectRegion,
  onSelectProject,
  isLightMode,
  onToggleTheme,
}: NavbarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Filter recommendations based on current search term
  const suggestedLocations = searchTerm ? locations.filter((l) =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.parentName && l.parentName.toLowerCase().includes(searchTerm.toLowerCase()))
  ) : [];

  const suggestedProjects = searchTerm ? projects.filter((p) =>
    p.project_name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Hide suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocationSuggestion = (loc: RegionLocation) => {
    onSelectRegion(loc.id);
    onSelectProject(null); // Clear active project
    setSearchTerm(loc.name);
    setShowSuggestions(false);
  };

  const handleSelectProjectSuggestion = (proj: Project) => {
    onSelectProject(proj);
    // Find associated location
    const matchedLoc = locations.find((l) => {
      if (l.type === 'Barangay') {
        return proj.barangay.toLowerCase() === l.name.replace('Barangay ', '').toLowerCase();
      } else {
        return proj.city.toLowerCase() === l.name.toLowerCase();
      }
    });
    if (matchedLoc) {
      onSelectRegion(matchedLoc.id);
    }
    setSearchTerm(proj.project_name);
    setShowSuggestions(false);
  };

  // Quick preset pills
  const shortcuts = [
    { label: 'Manila', id: 'metro-manila' },
    { label: 'Cebu City', id: 'cebu-city' },
    { label: 'Davao City', id: 'davao-city' },
    { label: 'Iloilo City', id: 'iloilo-city' },
  ];

  return (
    <nav className={`px-4 py-3.5 sticky top-0 z-[1100] shadow-2xl flex-shrink-0 transition-colors duration-200 border-b
      ${isLightMode 
        ? 'bg-white text-zinc-950 border-zinc-300' 
        : 'bg-zinc-950 text-zinc-100 border-zinc-800'
      }`} id="main-application-navigation-bar">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Branding */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <Map className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg tracking-tight leading-none uppercase">
                ProjectMap <span className="text-emerald-500">PH</span>
              </h1>
              <span className={`text-[10px] tracking-widest uppercase font-mono font-bold mt-1.5 block
                ${isLightMode ? 'text-zinc-650' : 'text-zinc-500'}`}>
                Civic Transparency Locator
              </span>
            </div>
          </div>
 
          {/* Mobile controls (contrast toggle and information button) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg transition-colors border flex items-center justify-center
                ${isLightMode 
                  ? 'bg-zinc-100 border-zinc-350 text-zinc-800' 
                  : 'bg-zinc-900 border-zinc-850 text-zinc-300'
                }`}
              title="Toggle theme mode"
            >
              {isLightMode ? <Moon className="w-4 h-4 text-emerald-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <button 
              onClick={() => setShowInfoModal(true)}
              className={`p-2 rounded-lg transition-colors
                ${isLightMode ? 'text-zinc-600 hover:text-black hover:bg-zinc-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
 
        {/* Global Search and autocomplete recommendations */}
        <div className="flex-1 max-w-xl mx-auto w-full relative" ref={suggestionRef}>
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search Barangay, City, Municipality, or Project..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className={`w-full pl-10 pr-10 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 font-sans border transition-all
                ${isLightMode 
                  ? 'bg-zinc-100 text-zinc-950 placeholder-zinc-500 border-zinc-300 focus:ring-emerald-500/50 focus:bg-white' 
                  : 'bg-zinc-900 text-zinc-100 placeholder-zinc-500 border-zinc-800 focus:ring-emerald-500/30 focus:bg-zinc-900/90'
                }`}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  onSelectRegion(null);
                  onSelectProject(null);
                }}
                className="absolute right-3.5 top-3 text-zinc-500 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
 
          {/* Autocomplete Dropdown List */}
          {showSuggestions && searchTerm && (suggestedLocations.length > 0 || suggestedProjects.length > 0) && (
            <div className={`absolute top-full left-0 right-0 mt-1.5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[2000] overflow-hidden max-h-80 overflow-y-auto border transition-colors duration-200
              ${isLightMode 
                ? 'bg-white text-zinc-950 border-zinc-305' 
                : 'bg-zinc-900 text-zinc-200 border-zinc-800'
              }`}>
              {/* Location matches */}
              {suggestedLocations.length > 0 && (
                <div className={`border-b last:border-none ${isLightMode ? 'border-zinc-200' : 'border-zinc-800'}`}>
                  <div className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1 border-b
                    ${isLightMode 
                      ? 'bg-zinc-100 text-zinc-600 border-zinc-200' 
                      : 'bg-zinc-950 text-zinc-500 border-zinc-800'
                    }`}>
                    <Landmark className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Locations</span>
                  </div>
                  <div className={`divide-y ${isLightMode ? 'divide-zinc-200/50' : 'divide-zinc-800/40'}`}>
                    {suggestedLocations.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => handleSelectLocationSuggestion(loc)}
                        className={`w-full px-4 py-3 text-left text-xs flex items-center gap-2.5 transition-colors focus:outline-none
                          ${isLightMode ? 'hover:bg-zinc-100 text-zinc-800' : 'hover:bg-zinc-800/50 text-zinc-300'}`}
                      >
                        <MapPin className="w-4 h-4 text-zinc-550 flex-shrink-0" />
                        <div className="flex-1">
                          <p className={`font-semibold ${isLightMode ? 'text-zinc-900' : 'text-zinc-100'}`}>{loc.name}</p>
                          <p className={`text-[10px] font-medium mt-0.5 ${isLightMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                            {loc.type} {loc.parentName ? `in ${loc.parentName}` : ''}
                          </p>
                        </div>
                        <CornerDownRight className="w-3.5 h-3.5 text-zinc-550" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
 
              {/* Project matches */}
              {suggestedProjects.length > 0 && (
                <div>
                  <div className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1 border-b
                    ${isLightMode 
                      ? 'bg-zinc-100 text-zinc-600 border-zinc-200' 
                      : 'bg-zinc-950 text-zinc-500 border-zinc-800'
                    }`}>
                    <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Development Projects</span>
                  </div>
                  <div className={`divide-y ${isLightMode ? 'divide-zinc-200/50' : 'divide-zinc-800/40'}`}>
                    {suggestedProjects.map((proj) => (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => handleSelectProjectSuggestion(proj)}
                        className={`w-full px-4 py-3 text-left text-xs flex items-center gap-2.5 transition-colors focus:outline-none
                          ${isLightMode ? 'hover:bg-zinc-100 text-zinc-800' : 'hover:bg-zinc-800/50 text-zinc-300'}`}
                      >
                        <Briefcase className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <div className="flex-1">
                          <p className={`font-semibold line-clamp-1 ${isLightMode ? 'text-zinc-900' : 'text-zinc-100'}`}>{proj.project_name}</p>
                          <p className={`text-[10px] font-medium mt-0.5 ${isLightMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                            {proj.project_type} · {proj.barangay ? `${proj.barangay}, ` : ''}{proj.city}
                          </p>
                        </div>
                        <CornerDownRight className="w-3.5 h-3.5 text-zinc-550" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
 
        {/* Shortcuts for cities map fly-tos, Theme Switcher, and Information modal launcher */}
        <div className="flex items-center justify-between md:justify-end gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`hidden lg:inline text-[9px] font-bold uppercase tracking-wider font-mono mr-1
              ${isLightMode ? 'text-zinc-550' : 'text-zinc-500'}`}>Fly to:</span>
            {shortcuts.map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  onSelectRegion(sc.id);
                  onSelectProject(null);
                  const found = locations.find(l => l.id === sc.id);
                  if (found) setSearchTerm(found.name);
                }}
                className={`px-2 py-1 text-[10px] font-medium rounded-lg transition-all border
                  ${isLightMode
                    ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-305 text-zinc-800 hover:text-zinc-955'
                    : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-805 text-zinc-300 hover:text-zinc-100'
                  }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
 
          {/* Desktop High-Contrast Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`hidden md:flex items-center justify-center p-2 rounded-xl border transition-all duration-200
              ${isLightMode
                ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-200 hover:border-zinc-700'
              }`}
            title="Toggle high-contrast mode"
          >
            {isLightMode ? <Moon className="w-4 h-4 text-emerald-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
 
          <button
            onClick={() => setShowInfoModal(true)}
            className={`hidden md:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all font-semibold
              ${isLightMode
                ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
                : 'bg-zinc-900 hover:bg-zinc-850 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
          >
            <HelpCircle className="w-4 h-4 text-emerald-500" />
            <span>Civic transparency portal</span>
          </button>
        </div>
      </div>
 
      {/* Transparency Info Overlay modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]" id="civic-info-modal-backdrop">
          <div className={`rounded-2xl max-w-md w-full shadow-2xl p-6 border transition-all duration-200 animate-in fade-in zoom-in-95 duration-155
            ${isLightMode 
              ? 'bg-white border-zinc-300 text-zinc-900' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-200'
            }`}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                  <Map className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base leading-snug uppercase">
                    ProjectMap <span className="text-emerald-500">PH</span>
                  </h3>
                  <p className={`text-[10px] font-bold tracking-wider uppercase font-mono ${isLightMode ? 'text-zinc-550' : 'text-zinc-550'}`}>
                    Civic Transparency Initiative
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="text-zinc-500 hover:text-zinc-300 p-1 rounded-full hover:bg-zinc-150 transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
 
            <div className={`space-y-3.5 text-xs leading-relaxed font-sans ${isLightMode ? 'text-zinc-700' : 'text-zinc-400'}`}>
              <p>
                <strong>ProjectMap PH</strong> is an interactive geographic information system designed to promote civic oversight, accountability, and transparency in public spending.
              </p>
              <p>
                Citizens can explore infrastructure, health, educational, livelihood, and environmental development budgets authorized across Cebu, Metro Manila, Davao City, and Iloilo City.
              </p>
              
              <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? 'bg-zinc-50 border-zinc-300' : 'bg-zinc-950 border-zinc-800'}`}>
                <p className="font-bold text-[10px] uppercase tracking-wider text-emerald-600 font-mono">Quick Instructions</p>
                <div className={`space-y-1 font-medium ${isLightMode ? 'text-zinc-800' : 'text-zinc-300'}`}>
                  <p>1. Hover and click areas on the map to explore local scopes.</p>
                  <p>2. Search barangays or specific project names directly from the search bar.</p>
                  <p>3. Expand project catalog cards to audit budgets and scheduling timelines.</p>
                </div>
              </div>
 
              <p className="text-[10px] text-zinc-500 text-center pt-2 font-mono">
                Built with accuracy and zero-latency GIS principles · June 2026
              </p>
            </div>
 
            <button
              onClick={() => setShowInfoModal(false)}
              className="mt-5 w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 text-xs font-bold rounded-xl tracking-wider transition-colors shadow-lg shadow-emerald-500/10 uppercase"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
