import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CADET_RANKS } from '../data/cadetData';
import { CapEmblem } from './CapEmblem';
import { 
  Award, 
  CheckSquare, 
  Compass, 
  Shirt, 
  BookOpen, 
  User as UserIcon, 
  Sparkles,
  Layers
} from 'lucide-react';

export type NavTab = 'scenarios' | 'dashboard' | 'drill' | 'uniform' | 'superchart' | 'oath';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenAccountModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAccountModal,
}) => {
  const { user, isAuthenticated, setIsGoogleModalOpen } = useAuth();
  const rank = CADET_RANKS.find((r) => r.id === user?.currentRankId) || CADET_RANKS[0];

  return (
    <header className="sticky top-0 z-40 bg-[#06142a]/95 backdrop-blur border-b border-[#163a70] text-white shadow-lg">
      {/* Civil Air Patrol Tricolor Heritage Stripe (Red, White, CAP Blue) */}
      <div className="cap-tricolor-stripe h-1 w-full" />

      {/* Top Banner with Motto and Quick Stats */}
      <div className="bg-[#030914] border-b border-[#0d274e] px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-[#c8102e] text-white font-bold text-[10px] tracking-wider uppercase">
              USAF AUXILIARY
            </span>
            <span className="font-bold text-white tracking-wide">CIVIL AIR PATROL</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ffc72c]" />
              <span className="text-slate-300 font-medium">Honor Points:</span>
              <span className="font-bold text-[#ffc72c] font-tech text-sm">{user?.honorPoints || 0}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <span className="text-slate-400">Unit:</span>
              <span className="text-slate-100 font-semibold">{user?.squadron || 'Squadron 101'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Emblem */}
        <div 
          onClick={() => onSelectTab('scenarios')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative group-hover:scale-105 transition-transform">
            <CapEmblem size={44} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-wider text-base sm:text-lg text-white font-display">
                CADET ACADEMY
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">Interactive Leadership & Scenarios Training</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 max-w-full">
          <button
            id="nav-tab-scenarios"
            onClick={() => onSelectTab('scenarios')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              currentTab === 'scenarios'
                ? 'bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/30 font-bold border border-[#e2304d]'
                : 'text-slate-200 hover:text-white hover:bg-[#0a1e3d] border border-transparent'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Scenarios</span>
          </button>

          <button
            id="nav-tab-dashboard"
            onClick={() => onSelectTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              currentTab === 'dashboard'
                ? 'bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/30 font-bold border border-[#e2304d]'
                : 'text-slate-200 hover:text-white hover:bg-[#0a1e3d] border border-transparent'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Dashboard</span>
            {user && Object.keys(user.scenarioResults).length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-[#ffc72c] text-[#002855] font-black">
                {Object.keys(user.scenarioResults).length}
              </span>
            )}
          </button>

          <button
            id="nav-tab-drill"
            onClick={() => onSelectTab('drill')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              currentTab === 'drill'
                ? 'bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/30 font-bold border border-[#e2304d]'
                : 'text-slate-200 hover:text-white hover:bg-[#0a1e3d] border border-transparent'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Drill Simulator</span>
          </button>

          <button
            id="nav-tab-uniform"
            onClick={() => onSelectTab('uniform')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              currentTab === 'uniform'
                ? 'bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/30 font-bold border border-[#e2304d]'
                : 'text-slate-200 hover:text-white hover:bg-[#0a1e3d] border border-transparent'
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>Uniforms</span>
          </button>

          <button
            id="nav-tab-superchart"
            onClick={() => onSelectTab('superchart')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              currentTab === 'superchart'
                ? 'bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/30 font-bold border border-[#e2304d]'
                : 'text-slate-200 hover:text-white hover:bg-[#0a1e3d] border border-transparent'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden lg:inline">Super Chart</span>
            <span className="lg:hidden">Ranks</span>
          </button>

          <button
            id="nav-tab-oath"
            onClick={() => onSelectTab('oath')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              currentTab === 'oath'
                ? 'bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/30 font-bold border border-[#e2304d]'
                : 'text-slate-200 hover:text-white hover:bg-[#0a1e3d] border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cadet Oath</span>
          </button>
        </nav>

        {/* User Account / Google Sign-In Action */}
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <button
              id="navbar-google-signin-btn"
              onClick={() => setIsGoogleModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-md transition cursor-pointer border border-slate-200 active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span className="hidden sm:inline">Sign In with Google</span>
              <span className="sm:hidden">Sign In</span>
            </button>
          ) : (
            <button
              id="user-account-btn"
              onClick={onOpenAccountModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0a1e3d] hover:bg-[#11315f] border border-[#163a70] text-left transition group shadow-sm cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#002855] border border-[#ffc72c] flex items-center justify-center text-[#ffc72c] text-xs font-bold shadow-inner">
                {rank.abbreviation.replace('C/', '')}
              </div>
              <div className="text-xs">
                <div className="font-bold text-white group-hover:text-[#ffc72c] transition flex items-center gap-1">
                  <span>{user?.fullName || user?.callsign || 'Cadet'}</span>
                </div>
                <div className="text-[10px] text-slate-300 leading-tight">
                  {rank.name}
                </div>
              </div>
              <UserIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white ml-1" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

