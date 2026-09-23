import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, NavTab } from './components/Navbar';
import { AccountModal } from './components/AccountModal';
import { GoogleSignInModal } from './components/GoogleSignInModal';
import { CadetOnboardingModal } from './components/CadetOnboardingModal';
import { ScenariosView } from './components/ScenariosView';
import { DashboardView } from './components/DashboardView';
import { DrillSimulatorView } from './components/DrillSimulatorView';
import { UniformInspectorView } from './components/UniformInspectorView';
import { SuperChartRanksView } from './components/SuperChartRanksView';
import { CadetOathView } from './components/CadetOathView';
import { CapEmblem } from './components/CapEmblem';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('scenarios');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);
  const { isGoogleModalOpen, setIsGoogleModalOpen, isOnboardingModalOpen } = useAuth();

  return (
    <div className="min-h-screen bg-[#030914] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,40,85,0.3),rgba(3,9,20,1))] text-slate-100 flex flex-col font-sans selection:bg-[#c8102e] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'scenarios' && (
          <ScenariosView onNavigateToDashboard={() => setCurrentTab('dashboard')} />
        )}
        {currentTab === 'dashboard' && <DashboardView />}
        {currentTab === 'drill' && <DrillSimulatorView />}
        {currentTab === 'uniform' && <UniformInspectorView />}
        {currentTab === 'superchart' && <SuperChartRanksView />}
        {currentTab === 'oath' && <CadetOathView />}
      </main>

      {/* Account Profile Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />

      {/* Google Sign In Modal */}
      <GoogleSignInModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
      />

      {/* First-Time Cadet Onboarding Registration Modal */}
      <CadetOnboardingModal isOpen={isOnboardingModalOpen} />

      {/* Civil Air Patrol Footer */}
      <footer className="mt-16 bg-[#06142a] border-t border-[#163a70] text-slate-300">
        {/* Tricolor Heritage Stripe */}
        <div className="cap-tricolor-stripe h-1 w-full" />

        <div className="max-w-7xl mx-auto py-10 px-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <CapEmblem size={36} />
                <div>
                  <div className="text-white font-bold text-sm tracking-wide">
                    Civil Air Patrol • U.S. Air Force Auxiliary
                  </div>
                  <div className="text-[11px] text-[#ffc72c] font-semibold">
                    Headquarters Civil Air Patrol • Maxwell AFB, Alabama
                  </div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-md">
                Dedicated to developing America's youth into aerospace leaders of character through dynamic leadership education, hands-on aerospace exploration, physical fitness, and community volunteer service.
              </p>
              <div className="text-[11px] text-slate-400 font-mono pt-1">
                Official Curriculum References: CAPP 60-20 (New Cadet Guide), CAPP 60-34 (Drill Practical Tests), CAPP 60-100 (Cadet Super Chart), & Learn to Lead Vol 1.
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[#ffc72c] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e]" />
                The Four Core Values
              </div>
              <div className="text-slate-300 space-y-1.5">
                <div className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#c8102e] font-bold">1.</span> Integrity First
                </div>
                <div className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#c8102e] font-bold">2.</span> Volunteer Service
                </div>
                <div className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#c8102e] font-bold">3.</span> Excellence in All We Do
                </div>
                <div className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#c8102e] font-bold">4.</span> Respect
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[#ffc72c] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e]" />
                Three Core Missions
              </div>
              <div className="text-slate-300 space-y-1.5">
                <div className="hover:text-white transition">• Aerospace Education (AE)</div>
                <div className="hover:text-white transition">• Cadet Programs (CP)</div>
                <div className="hover:text-white transition">• Emergency Services (ES)</div>
                <div className="text-slate-400 text-[11px] pt-1">Air Force Powered & Glider O-Flights</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#0d274e] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">Semper Vigilans</span>
              <span>— Always Vigilant. Founded December 1, 1941.</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300 font-medium">
              <span className="text-[#ffc72c]">★</span>
              <span>Today's Cadets, Tomorrow's Aerospace Leaders</span>
              <span className="text-[#c8102e]">★</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
