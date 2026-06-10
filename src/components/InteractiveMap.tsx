import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Project, RegionLocation } from '../types.ts';
import { FileCode2 } from 'lucide-react';

interface InteractiveMapProps {
  locations: RegionLocation[];
  projects: Project[];
  selectedRegionId: string | null;
  onSelectRegion: (id: string | null) => void;
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  filterStatus: string;
  filterType: string;
  isLightMode: boolean;
}

export default function InteractiveMap({
  locations,
  projects,
  selectedRegionId,
  onSelectRegion,
  selectedProject,
  onSelectProject,
  filterStatus,
  filterType,
  isLightMode,
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const polygonsRef = useRef<{ [key: string]: L.Polygon }>({});
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Center coords for zoom resets (Cebu Region: 10.292, 123.850 approx)
  const defaultCenter: [number, number] = [10.292, 123.850];
  const defaultZoom = 12;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create Leaflet Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false, // We customize position later
    }).setView(defaultCenter, defaultZoom);

    mapRef.current = map;

    // Add standard Zoom control in bottom-right so it doesn't collide with searchable overlay
    L.control.zoom({
      position: 'bottomright',
    }).addTo(map);

    // Initial tile layer selection based on theme
    const initialTileUrl = isLightMode
      ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(initialTileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Sync Map theme layer dynamically on toggle
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    const tileUrl = isLightMode
      ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);
  }, [isLightMode]);

  // Sync Locations (Polygons) on the Map
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing polygons
    (Object.values(polygonsRef.current) as L.Polygon[]).forEach((p) => p.remove());
    polygonsRef.current = {};

    locations.forEach((loc) => {
      const isSelected = selectedRegionId === loc.id;
      
      const polygon = L.polygon(loc.boundaryCoordinates, {
        color: isSelected ? '#10b981' : (isLightMode ? '#71717a' : '#3f3f46'), // Crisp visibility in light mode
        weight: isSelected ? 2.5 : 1.5,
        fillColor: isSelected ? '#10b981' : (isLightMode ? '#e4e4e7' : '#27272a'),
        fillOpacity: isSelected ? 0.12 : 0.05,
        className: 'cursor-pointer transition-all duration-200',
      }).addTo(map);

      // Tooltip for quick identification
      polygon.bindTooltip(`
        <div class="px-2.5 py-1">
          <p class="font-display font-semibold text-xs ${isLightMode ? 'text-zinc-950 font-bold' : 'text-zinc-100'}">${loc.name}</p>
          <p class="text-[10px] ${isLightMode ? 'text-zinc-650' : 'text-zinc-400'} font-medium">${loc.type}${loc.parentName ? ` (${loc.parentName})` : ''}</p>
        </div>
      `, {
        sticky: true,
        direction: 'top',
        opacity: 0.95,
      });

      // Interactive operations
      polygon.on('mouseover', () => {
        if (selectedRegionId !== loc.id) {
          polygon.setStyle({
            color: '#10b981',
            weight: 2,
            fillColor: '#10b981',
            fillOpacity: 0.1,
          });
        }
      });

      polygon.on('mouseout', () => {
        if (selectedRegionId !== loc.id) {
          polygon.setStyle({
            color: isLightMode ? '#71717a' : '#3f3f46',
            weight: 1.5,
            fillColor: isLightMode ? '#e4e4e7' : '#27272a',
            fillOpacity: 0.05,
          });
        }
      });

      polygon.on('click', () => {
        onSelectRegion(loc.id);
        onSelectProject(null); // Clear selected project
      });

      polygonsRef.current[loc.id] = polygon;
    });
  }, [locations, selectedRegionId, onSelectRegion, onSelectProject, isLightMode]);

  // Sync Markers (Projects) on the Map with dynamic filters
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    (Object.values(markersRef.current) as L.Marker[]).forEach((m) => m.remove());
    markersRef.current = {};

    // Filter projects according to status and type
    const fileteredProjects = projects.filter((p) => {
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      const matchesType = filterType === 'all' || p.project_type === filterType;
      
      // If a region is selected, must match region
      if (selectedRegionId) {
        const activeLoc = locations.find((l) => l.id === selectedRegionId);
        if (activeLoc) {
          if (activeLoc.type === 'Barangay') {
            return matchesStatus && matchesType && p.barangay.toLowerCase() === activeLoc.name.replace('Barangay ', '').toLowerCase();
          } else {
            // E.g., matching "Cebu City" or "Talisay City" or "Minglanilla"
            return matchesStatus && matchesType && p.city.toLowerCase() === activeLoc.name.toLowerCase();
          }
        }
      }
      return matchesStatus && matchesType;
    });

    fileteredProjects.forEach((proj) => {
      // Colors correspond to project states: Completed (Emerald), Ongoing (Blue), New (Amber)
      let statusColor = 'bg-amber-500';
      if (proj.status === 'Completed') statusColor = 'bg-emerald-500';
      if (proj.status === 'Ongoing') statusColor = 'bg-blue-500';

      const isProjSelected = selectedProject?.id === proj.id;

      const markerIcon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center w-8 h-8 rounded-full ${statusColor} text-zinc-950 shadow-md border-2 ${isProjSelected ? 'border-emerald-400 scale-125 ring-4 ring-emerald-500/40 z-[999]' : 'border-zinc-950'} hover:scale-115 transition-transform duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.74a1.8 1.8 0 0 1-2.4 0C8.339 20.193 3 14.99 3 10a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="2.5"/>
            </svg>
            ${isProjSelected ? `
              <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            ` : ''}
          </div>
        `,
        className: 'custom-map-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([proj.latitude, proj.longitude], {
        icon: markerIcon,
      }).addTo(map);

      // Custom popup styled for Elegant Dark / High-Contrast Light
      marker.bindPopup(`
        <div class="p-1.5 max-w-[220px] font-sans">
          <span class="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase mb-1.5 border
            ${proj.status === 'Completed' ? (isLightMode ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20') : ''}
            ${proj.status === 'Ongoing' ? (isLightMode ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-blue-500/10 text-blue-400 border-blue-500/20') : ''}
            ${proj.status === 'New' ? (isLightMode ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-amber-500/10 text-amber-400 border-amber-500/20') : ''}
          ">
            ${proj.status}
          </span>
          <h4 class="font-bold text-sm leading-tight mb-1 line-clamp-2 ${isLightMode ? 'text-zinc-950 font-extrabold' : 'text-zinc-100'}">${proj.project_name}</h4>
          <p class="text-[10px] mb-2.5 font-medium ${isLightMode ? 'text-zinc-600' : 'text-zinc-400'}">${proj.barangay ? `${proj.barangay}, ` : ''}${proj.city}</p>
          <div class="flex items-center justify-between border-t pt-2 mt-2 ${isLightMode ? 'border-zinc-200' : 'border-zinc-800'}">
            <span class="text-[10px] font-bold uppercase tracking-wide ${isLightMode ? 'text-zinc-600' : 'text-zinc-500'}">Budget</span>
            <span class="text-xs font-bold font-mono ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}">₱${(proj.budget / 1000000).toFixed(1)}M</span>
          </div>
        </div>
      `, {
        closeButton: false,
        offset: [0, -5],
      });

      marker.on('click', () => {
        onSelectProject(proj);
        // Find corresponding location and auto-select
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
      });

      markersRef.current[proj.id] = marker;
    });
  }, [projects, selectedRegionId, selectedProject, onSelectRegion, onSelectProject, filterStatus, filterType, locations, isLightMode]);

  // Handle focus syncing (Fly to selected Region or selected Project)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (selectedProject) {
      // Fly to focused project marker
      map.flyTo([selectedProject.latitude, selectedProject.longitude], 15, {
        duration: 1.2,
      });
      
      // Auto trigger popup open
      const marker = markersRef.current[selectedProject.id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 300);
      }
    } else if (selectedRegionId) {
      // Fly to selected region polygon center
      const activeLoc = locations.find((l) => l.id === selectedRegionId);
      if (activeLoc) {
        map.flyTo([activeLoc.latitude, activeLoc.longitude], activeLoc.zoomLevel, {
          duration: 1.2,
        });
      }
    } else {
      // Zoom out to Cebu default overview
      map.flyTo(defaultCenter, defaultZoom, {
        duration: 1,
      });
    }
  }, [selectedRegionId, selectedProject, locations]);

  return (
    <div className={`relative w-full h-full group transition-colors duration-200 ${isLightMode ? 'bg-zinc-100' : 'bg-zinc-950'}`}>
      {/* Absolute UI overlay: Legend */}
      <div id="map-legend" className={`absolute bottom-6 left-6 z-[1000] px-4 py-3.5 rounded-xl shadow-2xl border transition-colors duration-200 max-w-[200px] pointer-events-auto
        ${isLightMode 
          ? 'bg-white/95 border-zinc-350 backdrop-blur-md text-zinc-950' 
          : 'bg-zinc-900/95 border-zinc-805 backdrop-blur-md text-zinc-200'
        }`}>
        
        <h5 className="font-display font-semibold text-xs mb-2 tracking-wide uppercase">Project Status</h5>
        <div className={`space-y-1.5 text-xs ${isLightMode ? 'text-zinc-800' : 'text-zinc-400'}`}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-zinc-950 shadow-sm flex-shrink-0" />
            <span className="font-medium">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-zinc-950 shadow-sm flex-shrink-0" />
            <span className="font-medium">Ongoing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-zinc-950 shadow-sm flex-shrink-0" />
            <span className="font-medium">New / Proposed</span>
          </div>
        </div>
      </div>

      {/* Actual Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" id="root-leaflet-map-element" />

      {/* Guide lines for zoom/pan overlay */}
      <div className={`absolute top-6 right-6 z-[1000] px-3.5 py-2.5 rounded-lg shadow-2xl text-[10px] border flex items-center gap-1.5 select-none pointer-events-none transition-colors duration-200
        ${isLightMode 
          ? 'bg-white/95 border-zinc-300 text-zinc-800' 
          : 'bg-zinc-900/95 border-zinc-800 text-zinc-400'
        }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono tracking-wider text-xs uppercase">{isLightMode ? 'Light Canvas Active' : 'Dark Canvas Active'}</span>
      </div>
    </div>
  );
}
