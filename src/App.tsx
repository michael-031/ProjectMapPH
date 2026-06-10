/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import InteractiveMap from './components/InteractiveMap.tsx';
import ProjectListPanel from './components/ProjectListPanel.tsx';
import ProjectDetailView from './components/ProjectDetailView.tsx';
import { LOCATIONS, PROJECTS } from './data.ts';
import { Project } from './types.ts';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Parse project from URL on initial load for direct link access
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      const proj = PROJECTS.find(p => p.id === projectId || String(p.id) === projectId);
      if (proj) {
        setSelectedProject(proj);
      }
    }
  }, []);
  
  // Theme toggle state for accessibility (default is dark elegant, toggleable to high-contrast light mode)
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    return localStorage.getItem('theme-toggle-ph') === 'light';
  });

  const handleToggleTheme = () => {
    setIsLightMode((prev) => {
      const next = !prev;
      localStorage.setItem('theme-toggle-ph', next ? 'light' : 'dark');
      return next;
    });
  };

  // Filter settings states passed across elements
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSelectRegion = (id: string | null) => {
    setSelectedRegionId(id);
  };

  const handleSelectProject = (project: Project | null) => {
    setSelectedProject(project);
    const params = new URLSearchParams(window.location.search);
    if (project) {
      params.set('project', project.id);
    } else {
      params.delete('project');
    }
    const search = params.toString();
    const newUrl = search ? `${window.location.pathname}?${search}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  };

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden font-sans transition-colors duration-200 ${isLightMode ? 'light-mode bg-zinc-50 text-zinc-950' : 'dark-mode bg-slate-900 text-zinc-100'}`} id="projectmap-ph-app-root">
      {/* 1. Header Navigation Bar */}
      <Navbar 
        locations={LOCATIONS}
        projects={PROJECTS}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSelectRegion={handleSelectRegion}
        onSelectProject={handleSelectProject}
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* 2. Main Content Split Stage */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
        
        {/* Map View takes maximum available footprint */}
        <div className="flex-1 min-h-[40vh] h-full lg:h-full relative z-0">
          <InteractiveMap 
            locations={LOCATIONS}
            projects={PROJECTS}
            selectedRegionId={selectedRegionId}
            onSelectRegion={handleSelectRegion}
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
            filterStatus={filterStatus}
            filterType={filterType}
            isLightMode={isLightMode}
          />
        </div>

        {/* Project Lists & Detail Drawer container (max-w width constraints on desktop, viewport scroll on mobile) */}
        <div className={`w-full lg:w-[420px] h-[50vh] lg:h-full flex-shrink-0 relative z-10 flex flex-col border-t lg:border-t-0 border-zinc-800 transition-colors duration-200 shadow-2xl
          ${isLightMode ? 'bg-white border-zinc-300' : 'bg-zinc-900 border-zinc-800'}`}
        >
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <motion.div
                key="detail"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full"
              >
                <ProjectDetailView 
                  project={selectedProject}
                  onBack={() => handleSelectProject(null)}
                  isLightMode={isLightMode}
                />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="h-full w-full flex flex-col"
              >
                <ProjectListPanel 
                  locations={LOCATIONS}
                  projects={PROJECTS}
                  selectedRegionId={selectedRegionId}
                  onSelectRegion={handleSelectRegion}
                  selectedProject={selectedProject}
                  onSelectProject={handleSelectProject}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  filterType={filterType}
                  setFilterType={setFilterType}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  isLightMode={isLightMode}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

