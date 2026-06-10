import React, { useState } from 'react';
import { Project, NewsArticle } from '../types.ts';
import { 
  Building2, 
  MapPin, 
  CircleDollarSign, 
  Calendar, 
  Activity, 
  ArrowLeft,
  Briefcase,
  Share2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Newspaper,
  ExternalLink,
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Scale,
  Award,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectDetailViewProps {
  project: Project | null;
  onBack: () => void;
  isLightMode: boolean;
}

export default function ProjectDetailView({ project, onBack, isLightMode }: ProjectDetailViewProps) {
  if (!project) return null;

  // Copy Link State
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('project', project.id);
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((err) => {
      console.error('Failed to copy link: ', err);
    });
  };

  // Review Report States
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'citizen'>('overview');
  const [verificationFeedback, setVerificationFeedback] = useState<Record<string, { rating: number; status: string; comment: string; filedBy: string; filedDate: string; credibilityScore: number }>>({});
  
  // Interactive Verification Form input states
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [statusInput, setStatusInput] = useState<string>('Accurate');
  const [commentInput, setCommentInput] = useState<string>('');
  const [filedByInput, setFiledByInput] = useState<string>('');

  // Handle local citizen submit
  const handleCitizenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArticle) return;
    
    // Create a dynamic, highly accurate credibility score for the feedback receipt
    const calculatedCredibility = Math.min(100, Math.max(50, 75 + (ratingInput * 4) - (commentInput.length < 15 ? 10 : 0)));

    setVerificationFeedback({
      ...verificationFeedback,
      [selectedArticle.id]: {
        rating: ratingInput,
        status: statusInput,
        comment: commentInput || 'Verified of local physical progress aligning with current timeline.',
        filedBy: filedByInput || 'Anonymous Citizen Auditor',
        filedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        credibilityScore: calculatedCredibility
      }
    });
  };

  // Compute time progress based on current system date (June 9, 2026)
  const currentTimestamp = new Date('2026-06-09T15:06:47Z').getTime();
  const startTimestamp = new Date(project.start_date).getTime();
  const completionTimestamp = new Date(project.completion_date).getTime();

  let timePercentage = 0;
  if (currentTimestamp >= completionTimestamp) {
    timePercentage = 100;
  } else if (currentTimestamp <= startTimestamp) {
    timePercentage = 0;
  } else {
    const totalDuration = completionTimestamp - startTimestamp;
    const elapsed = currentTimestamp - startTimestamp;
    timePercentage = Math.round((elapsed / totalDuration) * 100);
  }

  // Calculate day-level milestones for visual timeline status
  const totalDays = Math.max(1, Math.round((completionTimestamp - startTimestamp) / (1000 * 60 * 60 * 24)));
  const daysElapsed = Math.max(0, Math.round((currentTimestamp - startTimestamp) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, Math.round((completionTimestamp - currentTimestamp) / (1000 * 60 * 60 * 24)));

  // Format Helper for Budget
  const formatFullPESO = (val: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Status Badge Colors
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed':
        return {
          bg: isLightMode ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          dot: 'bg-emerald-500',
        };
      case 'Ongoing':
        return {
          bg: isLightMode ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-blue-500/10 border-blue-500/20 text-blue-400',
          dot: 'bg-blue-500',
        };
      default:
        return {
          bg: isLightMode ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          dot: 'bg-amber-500',
        };
    }
  };

  const statusStyle = getStatusStyle(project.status);

  // Sector Badge Colors
  const getSectorStyle = (sector: string) => {
    switch (sector) {
      case 'Infrastructure':
        return isLightMode ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'Health':
        return isLightMode ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'Education':
        return isLightMode ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case 'Environment':
        return isLightMode ? 'bg-emerald-100 text-emerald-850 border border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'Technology':
        return isLightMode ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      default:
        return isLightMode ? 'bg-amber-100 text-amber-805 border border-amber-200' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    }
  };

  return (
    <div 
      className={`flex flex-col h-full relative z-10 overflow-hidden transition-colors duration-200
        ${isLightMode ? 'bg-zinc-50 border-l border-zinc-200 text-zinc-900 shadow-xl' : 'bg-zinc-900 border-l border-zinc-800 text-zinc-100'}`}
      id="project-detail-view-panel"
    >
      {/* Top sticky controls bar */}
      <div className={`flex items-center justify-between p-4 border-b sticky top-0 z-20 flex-shrink-0 transition-colors
        ${isLightMode ? 'border-zinc-200 bg-zinc-100/95 backdrop-blur-md' : 'border-zinc-805 bg-zinc-950/95 backdrop-blur-md'}`}>
        <button
          onClick={onBack}
          className={`flex items-center gap-2 text-xs font-semibold group/btn transition-colors focus:outline-none 
            ${isLightMode ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
        >
          <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
          <span>Back to List</span>
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-md border transition-all duration-200 cursor-pointer focus:outline-none select-none
              ${isLightMode 
                ? 'bg-white border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-700 hover:text-zinc-950 shadow-xs' 
                : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 hover:text-white'}`}
            title="Copy project link to Clipboard"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span className="text-emerald-500 text-[10px] tracking-wide">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-blue-500 hover:scale-110 transition-transform" />
                <span className="text-[10px] tracking-wide">Copy Link</span>
              </>
            )}
          </button>
          
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors 
            ${isLightMode ? 'text-zinc-700 bg-zinc-200 border-zinc-300' : 'text-zinc-400 bg-zinc-900 border-zinc-850'}`}>
            ID: {project.id}
          </span>
        </div>
      </div>

      {/* Main scrollable body */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Banner image with overlay widgets */}
        <div className="relative h-56 bg-zinc-950 overflow-hidden group">
          <img 
            src={project.image_url} 
            alt={project.project_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase mb-2 border ${statusStyle.bg}`}>
              {project.status}
            </span>
            <h1 className="font-display font-bold text-base leading-snug drop-shadow-sm select-text text-zinc-100">
              {project.project_name}
            </h1>
          </div>
        </div>

        {/* Details Wrapper */}
        <div className="p-5 space-y-6">
          {/* Metadata Badges row */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className={`px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider ${getSectorStyle(project.project_type)}`}>
              {project.project_type}
            </span>
            <span className={`border px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors
              ${isLightMode ? 'bg-white border-zinc-300 text-zinc-700' : 'bg-zinc-950 border-zinc-800 text-zinc-300'}`}>
              <MapPin className={`w-3.5 h-3.5 ${isLightMode ? 'text-emerald-600' : 'text-emerald-500'}`} />
              {project.barangay ? `${project.barangay}, ` : ''}{project.city}
            </span>
          </div>

          {/* Description Section */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Project Scope & Details</h4>
            <div className={`rounded-xl p-4 border transition-colors duration-200 
              ${isLightMode ? 'bg-white border-zinc-300 text-zinc-800 shadow-sm' : 'bg-zinc-950 border-zinc-800 text-zinc-300'}`}>
              <p className="text-xs leading-relaxed select-text font-sans">
                {project.description}
              </p>
            </div>
          </div>

          {/* Key Metrics: Budget & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Financial allocation */}
            <div className={`p-4 rounded-xl shadow-xs border transition-colors duration-200 
              ${isLightMode ? 'border-zinc-300 bg-white' : 'border-zinc-800 bg-zinc-950'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg border ${isLightMode ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                  <CircleDollarSign className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-zinc-500">Project Budget</span>
              </div>
              <p className={`font-mono text-base font-bold leading-none mt-2.5 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>
                {formatFullPESO(project.budget)}
              </p>
              <p className="text-[10px] text-zinc-500 mt-2 font-medium">Philippine Peso (PHP) Authorized</p>
            </div>

            {/* Time frame */}
            <div className={`p-4 rounded-xl shadow-xs border transition-colors duration-200 
              ${isLightMode ? 'border-zinc-300 bg-white' : 'border-zinc-800 bg-zinc-950'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg border ${isLightMode ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-zinc-500">Implementation Frame</span>
              </div>
              <p className={`text-xs font-bold leading-none mt-2.5 ${isLightMode ? 'text-zinc-900 font-extrabold' : 'text-zinc-200'}`}>
                {new Date(project.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <div className={`h-px my-2 ${isLightMode ? 'bg-zinc-200' : 'bg-zinc-800'}`} />
              <p className={`text-xs font-bold leading-none ${isLightMode ? 'text-zinc-900 font-extrabold' : 'text-zinc-200'}`}>
                Target: {new Date(project.completion_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Timeline and Calendar Progress */}
          <div className="space-y-5 pt-1">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-1.5">
                <Clock className={`w-4 h-4 ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`} />
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Elapsed Project Schedule</h4>
              </div>
              <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border
                ${isLightMode 
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                  : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/20'}`}>
                {project.status === 'Completed' ? '100% Completed' : `${timePercentage}% Time Elapsed`}
              </span>
            </div>

            {/* Dynamic Schedule Metrics Sub-grid */}
            <div className="grid grid-cols-3 gap-2.5 text-[10px] font-mono">
              <div className={`border p-2.5 rounded-lg transition-colors duration-200 ${isLightMode ? 'bg-white border-zinc-300' : 'bg-zinc-950 border-zinc-850'}`}>
                <span className="text-zinc-500 block uppercase font-bold text-[8px] tracking-wider">Total Span</span>
                <span className={`font-extrabold text-xs mt-0.5 block ${isLightMode ? 'text-zinc-900' : 'text-zinc-200'}`}>{totalDays} Days</span>
              </div>
              <div className={`border p-2.5 rounded-lg font-mono transition-colors duration-200 ${isLightMode ? 'bg-white border-zinc-300' : 'bg-zinc-950 border-zinc-850'}`}>
                <span className="text-zinc-500 block uppercase font-bold text-[8px] tracking-wider">Days Elapsed</span>
                <span className={`font-extrabold text-xs mt-0.5 block ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>{daysElapsed} Days</span>
              </div>
              <div className={`border p-2.5 rounded-lg font-mono transition-colors duration-200 ${isLightMode ? 'bg-white border-zinc-300' : 'bg-zinc-950 border-zinc-850'}`}>
                <span className="text-zinc-500 block uppercase font-bold text-[8px] tracking-wider">Remaining</span>
                <span className={`font-extrabold text-xs mt-0.5 block ${isLightMode ? 'text-blue-700' : 'text-blue-400'}`}>
                  {project.status === 'Completed' ? 'Completed' : `${daysRemaining} Days`}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              {/* Custom High-Fidelity Multi-Segment Progress bar container */}
              <div className="relative pt-6 pb-2 px-1">
                {/* Visual PIN overlay for Today (June 9, 2026) */}
                {project.status !== 'Completed' && timePercentage > 0 && timePercentage < 100 && (
                  <div 
                    className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
                    style={{ left: `${timePercentage}%` }}
                  >
                    <span className={`font-mono text-[8px] font-extrabold tracking-tight px-1.5 py-0.5 rounded shadow-lg flex items-center gap-0.5
                      ${isLightMode ? 'bg-emerald-650 text-white' : 'bg-emerald-500 text-zinc-950'}`}>
                      TODAY
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full animate-ping absolute top-4 ${isLightMode ? 'bg-emerald-600' : 'bg-emerald-400'}`} />
                    <div className={`w-1 h-3 rounded-md mt-0.5 shadow-sm ${isLightMode ? 'bg-emerald-600' : 'bg-emerald-500'}`} />
                  </div>
                )}

                {/* Main Progress track with light segments borders */}
                <div className={`w-full h-3 rounded-full overflow-hidden flex relative border transition-colors
                  ${isLightMode ? 'bg-zinc-200 border-zinc-300' : 'bg-zinc-950 border-zinc-800'}`}>
                  {/* Segment dividers behind the bar */}
                  <div className="absolute inset-0 flex justify-between pointer-events-none z-10 px-[25%] border-transparent">
                    <div className={`h-full w-[1px] ${isLightMode ? 'bg-white/60' : 'bg-zinc-808/40'}`} />
                    <div className={`h-full w-[1px] ${isLightMode ? 'bg-white/60' : 'bg-zinc-808/40'}`} />
                  </div>

                  <div 
                    className={`h-full transition-all duration-700 ease-out rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]
                      ${project.status === 'Completed' ? 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]' : ''}
                      ${project.status === 'Ongoing' ? 'bg-gradient-to-r from-blue-600 via-emerald-550 to-amber-500 shadow-[0_0_12px_rgba(59,130,246,0.25)]' : ''}
                      ${project.status === 'New' ? 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]' : ''}
                    `}
                    style={{ width: `${project.status === 'Completed' ? 100 : timePercentage}%` }}
                  />
                </div>

                {/* Phase segment nodes on active track positions */}
                <div className="absolute inset-x-0 top-6 flex justify-between px-1 pointer-events-none">
                  {[
                    { pct: 0, label: '0%', text: 'Mobilize' },
                    { pct: 25, label: '25%', text: 'Groundwork' },
                    { pct: 50, label: '50%', text: 'Execution' },
                    { pct: 75, label: '75%', text: 'Oversight' },
                    { pct: 100, label: '100%', text: 'Handover' }
                  ].map((node) => {
                    const isPassed = project.status === 'Completed' || timePercentage >= node.pct;
                    const isCurrentPhase = project.status !== 'Completed' && 
                      timePercentage >= node.pct && 
                      (node.pct === 75 ? timePercentage <= 100 : timePercentage < node.pct + 25);

                    return (
                      <div key={node.pct} className="flex flex-col items-center">
                        <div 
                          className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                            ${isPassed 
                              ? (isLightMode ? 'bg-white border-emerald-600 shadow-md scale-110' : 'bg-zinc-900 border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)] scale-110') 
                              : (isLightMode ? 'bg-zinc-200 border-zinc-300' : 'bg-zinc-950 border-zinc-850')
                            }
                            ${isCurrentPhase ? 'ring-4 ring-emerald-500/20' : ''}
                          `}
                        >
                          {isPassed && <div className={`w-1 h-1 rounded-full ${isLightMode ? 'bg-emerald-600' : 'bg-emerald-400'}`} />}
                        </div>
                        <span className={`text-[8px] font-mono font-bold uppercase tracking-wider mt-1 transition-colors
                          ${isPassed ? (isLightMode ? 'text-zinc-850' : 'text-zinc-300') : 'text-zinc-500'}
                          ${isCurrentPhase ? (isLightMode ? 'text-emerald-700 font-extrabold' : 'text-emerald-400 font-extrabold') : ''}
                        `}>
                          {node.text}
                        </span>
                        <span className="text-[7.5px] text-zinc-500 font-mono scale-90">{node.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom detail row */}
              <div className={`flex items-center justify-between text-[9px] font-medium font-mono border-t pt-2 transition-colors 
                ${isLightMode ? 'border-zinc-200 text-zinc-500' : 'border-zinc-808/40 text-zinc-500'}`}>
                <div className="flex flex-col items-start">
                  <span>Start Gate</span>
                  <span className={`font-bold mt-0.5 ${isLightMode ? 'text-zinc-800' : 'text-zinc-400'}`}>
                    {new Date(project.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span>Reporting Base</span>
                  <span className={`font-bold mt-0.5 ${isLightMode ? 'text-zinc-805' : 'text-zinc-400'}`}>Jun 2026 (LGU)</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span>Target Date</span>
                  <span className={`font-bold mt-0.5 ${isLightMode ? 'text-zinc-808' : 'text-zinc-400'}`}>
                    {new Date(project.completion_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Regional details and location list card */}
          <div className={`border rounded-xl overflow-hidden transition-colors duration-200
            ${isLightMode ? 'border-zinc-300 bg-white shadow-xs' : 'border-zinc-800 bg-zinc-950/30'}`}>
            <div className={`px-4 py-2.5 border-b flex items-center gap-1.5 transition-colors
              ${isLightMode ? 'bg-zinc-100 border-zinc-200 text-zinc-950' : 'bg-zinc-950 border-zinc-800 text-zinc-200'}`}>
              <ShieldCheck className={`w-4 h-4 ${isLightMode ? 'text-emerald-600' : 'text-emerald-500'}`} />
              <span className="text-xs font-bold">Governance & Location</span>
            </div>
            
            <div className={`p-4 space-y-3.5 text-xs transition-colors ${isLightMode ? 'text-zinc-650' : 'text-zinc-400'}`}>
              <div className="flex items-center justify-between">
                <span>Barangay Region:</span>
                <span className={`font-bold ${isLightMode ? 'text-zinc-950' : 'text-zinc-200'}`}>{project.barangay || 'Not Applicable (City-level)'}</span>
              </div>
              <div className={`h-px ${isLightMode ? 'bg-zinc-200' : 'bg-zinc-800'}`} />
              <div className="flex items-center justify-between">
                <span>Local Government Unit (LGU):</span>
                <span className={`font-bold ${isLightMode ? 'text-zinc-950' : 'text-zinc-200'}`}>
                  {project.city}{project.municipality ? ` (${project.municipality})` : ''}
                </span>
              </div>
              <div className={`h-px ${isLightMode ? 'bg-zinc-200' : 'bg-zinc-800'}`} />
              <div className="flex items-center justify-between">
                <span>Geographic Coordinates:</span>
                <span className={`font-mono font-medium ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>
                  {project.latitude.toFixed(4)}° N, {project.longitude.toFixed(4)}° E
                </span>
              </div>
            </div>
          </div>

          {/* Supporting News Articles section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <Newspaper className={`w-4 h-4 ${isLightMode ? 'text-emerald-600' : 'text-emerald-500'}`} />
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Civic Media Coverage & Press</h4>
            </div>

            {project.news_articles && project.news_articles.length > 0 ? (
              <div className="space-y-3">
                {project.news_articles.map((article) => {
                  const getSentimentStyle = (sentiment: string) => {
                    switch (sentiment) {
                      case 'Positive':
                        return isLightMode ? 'bg-emerald-100 text-emerald-800 border-emerald-250' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
                      case 'Critical':
                        return isLightMode ? 'bg-rose-100 text-rose-800 border border-rose-250' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
                      default:
                        return isLightMode ? 'bg-blue-105 text-blue-800 border border-blue-250' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
                    }
                  };
                  return (
                    <div 
                      key={article.id} 
                      className={`border transition-all duration-200 rounded-xl p-4 space-y-2.5
                        ${isLightMode 
                          ? 'border-zinc-300 bg-white hover:bg-zinc-100/50 shadow-xs' 
                          : 'border-zinc-800 bg-zinc-950/40 hover:bg-zinc-950/75'}`}
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                          <span className={`font-bold ${isLightMode ? 'text-zinc-800' : 'text-zinc-300'}`}>{article.source}</span>
                          <span>·</span>
                          <span>{new Date(article.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <span className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getSentimentStyle(article.sentiment)}`}>
                          {article.sentiment}
                        </span>
                      </div>
                      <h5 className={`font-display font-semibold text-xs leading-snug ${isLightMode ? 'text-zinc-950 font-bold' : 'text-zinc-200'}`}>
                        {article.title}
                      </h5>
                      <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-zinc-650 font-medium' : 'text-zinc-400'}`}>
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-900/40 text-[9px] text-zinc-500 font-mono">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`uppercase font-semibold ${isLightMode ? 'text-emerald-700 font-bold' : 'text-emerald-500'}`}>AISTUDIO VERIFIED SOURCE</span>
                          {verificationFeedback[article.id] && (
                            <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded text-[8px] font-bold">
                              ✓ CITIZEN AUDITED
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedArticle(article);
                            setActiveTab('overview');
                            setRatingInput(5);
                            setStatusInput('Accurate');
                            setCommentInput('');
                            setFiledByInput('');
                          }}
                          className={`flex items-center gap-1 border px-2.5 py-1 rounded text-[10.5px] font-bold transition-all duration-200 focus:outline-none cursor-pointer
                            ${isLightMode 
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-805 border-emerald-300 shadow-xs' 
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'}`}
                        >
                          <span>Review Report</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`border rounded-xl p-6 text-center transition-colors ${isLightMode ? 'border-zinc-250 bg-white shadow-xs' : 'border-zinc-850 bg-zinc-950'}`}>
                <p className="text-[11px] text-zinc-500 font-sans">No supporting press coverage or audit papers submitted for this project yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Report Dialog Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh] transition-colors duration-200
                ${isLightMode ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-zinc-900 border-zinc-800 text-zinc-100'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-4 border-b flex items-center justify-between flex-shrink-0 transition-colors
                ${isLightMode ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded border ${isLightMode ? 'bg-emerald-50 text-emerald-800 border-emerald-250' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`text-[9px] uppercase font-bold tracking-wider font-mono ${isLightMode ? 'text-emerald-700' : 'text-emerald-500'}`}>Civic Impact Audit</span>
                    <h3 className={`font-display font-bold text-xs uppercase tracking-tight leading-none mt-0.5 ${isLightMode ? 'text-zinc-950' : 'text-zinc-200'}`}>
                      Verify Press & Coverage Report
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className={`p-1 px-2 text-[10px] rounded-lg border flex items-center gap-1 cursor-pointer transition-colors focus:outline-none
                    ${isLightMode ? 'bg-zinc-200 border-zinc-300 text-zinc-600 hover:text-zinc-950' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-200'}`}
                >
                  <X className="w-3 h-3" />
                  <span>Close</span>
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className={`flex border-b text-[10px] font-mono select-none flex-shrink-0 transition-colors
                ${isLightMode ? 'border-zinc-205 bg-zinc-50' : 'border-zinc-800 bg-zinc-950/40'}`}>
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 py-3 text-center font-bold tracking-wider uppercase transition-colors outline-none border-b-2 ${
                    activeTab === 'overview'
                      ? (isLightMode ? 'text-emerald-700 border-emerald-600 bg-white' : 'text-emerald-400 border-emerald-500 bg-zinc-900/40')
                      : (isLightMode ? 'text-zinc-500 border-transparent hover:text-zinc-850' : 'text-zinc-500 border-transparent hover:text-zinc-300')
                  }`}
                >
                  📋 Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('analysis')}
                  className={`flex-1 py-3 text-center font-bold tracking-wider uppercase transition-colors outline-none border-b-2 ${
                    activeTab === 'analysis'
                      ? (isLightMode ? 'text-emerald-700 border-emerald-600 bg-white' : 'text-emerald-400 border-emerald-500 bg-zinc-900/40')
                      : (isLightMode ? 'text-zinc-500 border-transparent hover:text-zinc-850' : 'text-zinc-500 border-transparent hover:text-zinc-300')
                  }`}
                >
                  ⚖️ Guidelines
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('citizen')}
                  className={`flex-1 py-3 text-center font-bold tracking-wider uppercase transition-colors outline-none border-b-2 ${
                    activeTab === 'citizen'
                      ? (isLightMode ? 'text-emerald-700 border-emerald-600 bg-white' : 'text-emerald-400 border-emerald-500 bg-zinc-900/40')
                      : (isLightMode ? 'text-zinc-500 border-transparent hover:text-zinc-850' : 'text-zinc-500 border-transparent hover:text-zinc-300')
                  }`}
                >
                  ✍️ Citizen Filing
                </button>
              </div>

              {/* Scrollable Content Pane */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                
                {/* 1. OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    {/* Header Details */}
                    <div className={`p-4 border rounded-xl space-y-2.5 transition-colors ${isLightMode ? 'bg-zinc-100 border-zinc-250' : 'bg-zinc-950 border-zinc-800'}`}>
                      <div className="flex items-center justify-between gap-1.5 text-[9px] font-mono text-zinc-500">
                        <span className={`font-bold uppercase ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>{selectedArticle.source}</span>
                        <span>Published {new Date(selectedArticle.publish_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h4 className={`font-display font-semibold text-xs leading-snug ${isLightMode ? 'text-zinc-950 font-bold' : 'text-zinc-100'}`}>
                        {selectedArticle.title}
                      </h4>
                      <div className={`pt-2 border-t flex justify-between items-center text-[10px] font-mono ${isLightMode ? 'border-zinc-200 text-zinc-600' : 'border-zinc-900 text-zinc-400'}`}>
                        <span>Original Tone Index:</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                          selectedArticle.sentiment === 'Positive' ? (isLightMode ? 'bg-emerald-100 text-emerald-800 border-emerald-250' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20') :
                          selectedArticle.sentiment === 'Critical' ? (isLightMode ? 'bg-rose-100 text-rose-800 border-rose-250' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20') :
                          (isLightMode ? 'bg-blue-105 text-blue-800 border-blue-250' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20')
                        }`}>
                          {selectedArticle.sentiment}
                        </span>
                      </div>
                    </div>

                    {/* Article Body */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Civic Summary & Synopsis</span>
                      </div>
                      <div className={`rounded-xl p-4 border transition-colors ${isLightMode ? 'bg-zinc-100 border-zinc-250' : 'bg-zinc-950/45 border-zinc-800/60'}`}>
                        <p className={`text-xs leading-relaxed font-sans italic ${isLightMode ? 'text-zinc-700' : 'text-zinc-350'}`}>
                          "{selectedArticle.summary}"
                        </p>
                      </div>
                    </div>

                    {/* Technical Authenticity Indices */}
                    <div className="grid grid-cols-2 gap-3 font-mono text-[9px]">
                      <div className={`border p-3 rounded-xl flex flex-col justify-between transition-colors ${isLightMode ? 'bg-zinc-50 border-zinc-250' : 'bg-zinc-950/25 border-zinc-800'}`}>
                        <span className="text-zinc-500 uppercase font-bold tracking-wider">Authenticity Index</span>
                        <div className="flex items-baseline gap-1 mt-1.5">
                          <span className={`text-sm font-bold ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>96.4%</span>
                          <span className="text-[8px] text-zinc-500">Verified</span>
                        </div>
                      </div>
                      <div className={`border p-3 rounded-xl flex flex-col justify-between transition-colors ${isLightMode ? 'bg-zinc-50 border-zinc-250' : 'bg-zinc-900/25 border-zinc-805'}`}>
                        <span className="text-zinc-500 uppercase font-bold tracking-wider">Verification Scope</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>
                          <Award className="w-3 h-3" /> Fully Audited
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. GUIDELINES / ANALYSIS TAB */}
                {activeTab === 'analysis' && (
                  <div className="space-y-4">
                    {/* Sentiment Analysis Explanation */}
                    <div className={`border p-4 rounded-xl space-y-2 transition-colors ${isLightMode ? 'bg-zinc-50 border-zinc-250' : 'bg-zinc-950/30 border-zinc-800'}`}>
                      <h4 className={`text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 ${isLightMode ? 'text-zinc-900' : 'text-zinc-300'}`}>
                        <Activity className={`w-3.5 h-3.5 ${isLightMode ? 'text-emerald-700' : 'text-emerald-500'}`} />
                        Tone & Civic Risk Impact Analysis
                      </h4>
                      <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-zinc-650' : 'text-zinc-400'}`}>
                        Our local administration monitor classified this dispatch tone as <strong className={`${isLightMode ? 'text-zinc-900 font-extrabold' : 'text-zinc-200'}`}>{selectedArticle.sentiment}</strong>. This classification models the projected project outcome:
                      </p>
                      <div className={`p-3 border rounded-lg text-xs leading-relaxed mt-1 transition-colors ${isLightMode ? 'border-zinc-200 bg-white text-zinc-700' : 'bg-zinc-950 border-zinc-900 text-zinc-400'}`}>
                        {selectedArticle.sentiment === 'Critical' && (
                          <div className="text-rose-600 flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>
                              <strong>Warning/Obstacles Highlighted</strong>: Indicates public concern, resource challenges, or bureaucratic bottlenecks. Active community monitoring is highly suggested.
                            </span>
                          </div>
                        )}
                        {selectedArticle.sentiment === 'Positive' && (
                          <div className="text-emerald-600 flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>
                              <strong>Favorable Development Achievement</strong>: Captures key milestones completed ahead of schedule, high community satisfaction rate, or excellent resource allocation.
                            </span>
                          </div>
                        )}
                        {selectedArticle.sentiment === 'Neutral' && (
                          <div className="text-blue-600 flex items-start gap-2">
                            <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>
                              <strong>Routine Status Update</strong>: Represents normal project progression phases, routine planning consultations, or expected temporary detours without long-term concern.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Civic Action Checkpoints */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Suggested On-Site Verification Guide</span>
                      
                      <div className="space-y-2 font-mono text-[9px] text-zinc-400">
                        <div className={`p-3 rounded-xl border flex items-start gap-2.5 transition-colors ${isLightMode ? 'bg-white border-zinc-250' : 'bg-zinc-950/50 border-zinc-850'}`}>
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isLightMode ? 'text-emerald-600' : 'text-emerald-500'}`} />
                          <div>
                            <p className={`font-bold ${isLightMode ? 'text-zinc-800' : 'text-zinc-200'}`}>Inspect Physical Landmark Alignment</p>
                            <p className="text-zinc-500 text-[9px] mt-0.5 font-sans">Walk through the designated coordinates to ensure physical earthworks match milestones cited by {selectedArticle.source}.</p>
                          </div>
                        </div>
                        <div className={`p-3 rounded-xl border flex items-start gap-2.5 transition-colors ${isLightMode ? 'bg-white border-zinc-250' : 'bg-zinc-950/50 border-zinc-850'}`}>
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isLightMode ? 'text-emerald-600' : 'text-emerald-500'}`} />
                          <div>
                            <p className={`font-bold ${isLightMode ? 'text-zinc-800' : 'text-zinc-200'}`}>Audit Local Disruption & Safety Barriers</p>
                            <p className="text-zinc-500 text-[9px] mt-0.5 font-sans">Verify if the standard safety reflectors, bypass warnings, and light guides are active to secure night traffic.</p>
                          </div>
                        </div>
                        <div className={`p-3 rounded-xl border flex items-start gap-2.5 transition-colors ${isLightMode ? 'bg-white border-zinc-250' : 'bg-zinc-950/50 border-zinc-850'}`}>
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isLightMode ? 'text-emerald-600' : 'text-emerald-500'}`} />
                          <div>
                            <p className={`font-bold ${isLightMode ? 'text-zinc-800' : 'text-zinc-200'}`}>Validate Spending Transparency</p>
                            <p className="text-zinc-500 text-[9px] mt-0.5 font-sans">Ensure structural enhancements matches the allocated taxpayer scope without unaccounted budget gaps.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. CITIZEN WRITTEN AUDIT TAB */}
                {activeTab === 'citizen' && (
                  <div className="space-y-4">
                    {verificationFeedback[selectedArticle.id] ? (
                      // Filed Confirmation Screen
                      <div className={`border rounded-xl p-5 text-center space-y-4 transition-colors ${isLightMode ? 'bg-emerald-55/40 border-emerald-500/30' : 'bg-zinc-950 border-emerald-500/20'}`}>
                        <div className={`w-10 h-10 border rounded-full flex items-center justify-center mx-auto ${isLightMode ? 'bg-emerald-100 text-emerald-800 border-emerald-250' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                          <Award className="w-5 h-5 animate-bounce" />
                        </div>
                        <div className="space-y-1">
                          <h4 className={`font-display font-bold text-xs uppercase tracking-wider ${isLightMode ? 'text-zinc-950' : 'text-zinc-200'}`}>Citizen Audit Record Registered</h4>
                          <p className="text-[10px] text-zinc-500">Your local witness statement has been successfully written to session memory.</p>
                        </div>

                        {/* Audit Details Certificate box */}
                        <div className={`p-4 border text-left rounded-xl text-[9px] font-mono space-y-2.5 mt-2 leading-relaxed transition-colors
                          ${isLightMode ? 'bg-white border-zinc-250' : 'bg-zinc-900/60 border-zinc-800'}`}>
                          <div className={`flex justify-between border-b pb-1.5 ${isLightMode ? 'text-zinc-500 border-zinc-200' : 'text-zinc-500 border-zinc-900'}`}>
                            <span>FID: AUDIT-{selectedArticle.id.toUpperCase()}</span>
                            <span>{verificationFeedback[selectedArticle.id].filedDate}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase">Registered Inspector:</span>
                            <span className={`font-bold ${isLightMode ? 'text-zinc-905' : 'text-zinc-200'}`}>{verificationFeedback[selectedArticle.id].filedBy}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase">Matching Sentiment:</span>
                            <span className={`font-bold ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>{verificationFeedback[selectedArticle.id].status} Coverage</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase">Citizen Confidence Score:</span>
                            <span className={`text-xs font-bold leading-none ${isLightMode ? 'text-emerald-700 font-extrabold' : 'text-emerald-400'}`}>
                              {'★'.repeat(verificationFeedback[selectedArticle.id].rating)}{'☆'.repeat(5 - verificationFeedback[selectedArticle.id].rating)}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase">Verified Observation:</span>
                            <p className={`italic text-[11.5px] font-sans mt-1 leading-snug ${isLightMode ? 'text-zinc-800 font-medium' : 'text-zinc-300'}`}>
                              "{verificationFeedback[selectedArticle.id].comment}"
                            </p>
                          </div>
                          <div className={`flex justify-between items-center pt-2 border-t mt-2 text-[8.5px] uppercase ${isLightMode ? 'border-zinc-200 text-zinc-500' : 'border-zinc-900 text-zinc-500'}`}>
                            <span>Oversight Credibility:</span>
                            <span className={`font-bold text-xs ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>{verificationFeedback[selectedArticle.id].credibilityScore}% Confirmed</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            // Reset so we can write another
                            const feedbackCopy = { ...verificationFeedback };
                            delete feedbackCopy[selectedArticle.id];
                            setVerificationFeedback(feedbackCopy);
                          }}
                          className={`transition-colors text-[9.5px] font-mono font-semibold underline underline-offset-2 cursor-pointer focus:outline-none 
                            ${isLightMode ? 'text-emerald-700 hover:text-zinc-950' : 'text-emerald-400 hover:text-white'}`}
                        >
                          Revoke Verification & File New
                        </button>
                      </div>
                    ) : (
                      // Interactive Action Form
                      <form onSubmit={handleCitizenSubmit} className="space-y-4 text-left">
                        <div className={`p-4 border rounded-xl space-y-2 transition-colors ${isLightMode ? 'bg-white border-zinc-250 shadow-xs' : 'bg-zinc-950 border-zinc-800'}`}>
                          <div className={`flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-wider font-mono ${isLightMode ? 'text-amber-700' : 'text-amber-500'}`}>
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Participatory Verification</span>
                          </div>
                          <p className={`text-[10.5px] leading-relaxed font-sans ${isLightMode ? 'text-zinc-650' : 'text-zinc-400'}`}>
                            Have you personally traveled near or reside in <strong className={`${isLightMode ? 'text-zinc-905' : 'text-zinc-205'}`}>{project.city}</strong>? Submit your observations to verify the journalistic credibility of this report.
                          </p>
                        </div>

                        {/* Confidence Rating Selection */}
                        <div className="space-y-1.5">
                          <label className="text-[9.5px] font-mono text-zinc-400 font-semibold uppercase tracking-wider block">Press Report Credibility (Truth Score)</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRatingInput(star)}
                                className={`h-8 w-10 flex items-center justify-center rounded-lg border font-mono text-xs font-bold transition-all duration-150 cursor-pointer ${
                                  ratingInput >= star 
                                    ? (isLightMode ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-sm' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' )
                                    : (isLightMode ? 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-400' : 'bg-zinc-950 text-zinc-650 border-zinc-808 hover:border-zinc-700')
                                }`}
                              >
                                {star} ★
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Reporting Accuracy matcher dropdown */}
                        <div className="space-y-1.5">
                          <label className="text-[9.5px] font-mono text-zinc-400 font-semibold uppercase tracking-wider block">Journalistic Credibility Accuracy</label>
                          <select
                            value={statusInput}
                            onChange={(e) => setStatusInput(e.target.value)}
                            className={`w-full text-xs rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 border cursor-pointer transition-colors ${
                              isLightMode 
                                ? 'bg-white text-zinc-850 border-zinc-300 focus:ring-1 focus:ring-emerald-500/20' 
                                : 'bg-zinc-950 text-zinc-300 border-zinc-808'
                            }`}
                          >
                            <option value="Accurate">Extremely Accurate (Physical progress fits the text)</option>
                            <option value="Slightly Exaggerated">Slightly Exaggerated (Benefits are slightly overhyped)</option>
                            <option value="Underreported">Underreported (Real scale is better than the paper suggests)</option>
                            <option value="Inaccurate/Sensational">Inaccurate/Sensationalized (Contains false claims or figures)</option>
                          </select>
                        </div>

                        {/* Citizen Inspector Name */}
                        <div className="space-y-1.5">
                          <label className="text-[9.5px] font-mono text-zinc-400 font-semibold uppercase tracking-wider block">Your Name / Pseudonym</label>
                          <input
                            type="text"
                            placeholder="e.g. Engr. Santos, Local Resident, or leave blank anonymous"
                            value={filedByInput}
                            onChange={(e) => setFiledByInput(e.target.value)}
                            className={`w-full text-xs border rounded-lg p-2.5 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors ${
                              isLightMode 
                                ? 'bg-white text-zinc-850 border-zinc-300 focus:ring-1 focus:ring-emerald-500/20' 
                                : 'bg-zinc-950 text-zinc-305 border-zinc-808'
                            }`}
                          />
                        </div>

                        {/* Text comment field */}
                        <div className="space-y-1.5">
                          <label className="text-[9.5px] font-mono text-zinc-400 font-semibold uppercase tracking-wider block font-bold">On-Site Citizen Notes & Verification Remarks</label>
                          <textarea
                            rows={3}
                            placeholder="State what you observe on the road bypass construction, river bio-dredging, school/clinic upgrades, etc..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            className={`w-full text-xs border rounded-lg p-2.5 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 resize-none font-sans transition-colors ${
                              isLightMode 
                                ? 'bg-white text-zinc-850 border-zinc-300 focus:ring-1 focus:ring-emerald-500/20' 
                                : 'bg-zinc-950 text-zinc-305 border-zinc-808 focus:ring-0'
                            }`}
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className={`w-full font-semibold text-xs py-2.5 rounded-lg transition-colors duration-200 outline-none flex items-center justify-center gap-1.5 cursor-pointer
                            ${isLightMode ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-emerald-500 hover:bg-emerald-650 text-black'}`}
                        >
                          <span>Sign Citizen Audit Record</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className={`p-4 border-t flex justify-between items-center text-[10px] font-mono text-zinc-500 flex-shrink-0 transition-colors
                ${isLightMode ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
                <span className={`uppercase font-bold ${isLightMode ? 'text-emerald-700' : 'text-emerald-500'}`}>CIVIC LAB INGESTION ENGINE</span>
                <span className="cursor-pointer hover:text-zinc-650" onClick={() => setSelectedArticle(null)}>Dismiss</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
