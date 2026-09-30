import React from 'react';
import { LibritoProvider, useLibrito } from './context/LibritoContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeFeed } from './components/HomeFeed';
import { ExploreScreen } from './components/ExploreScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { RegisterStep1 } from './components/RegisterStep1';
import { RegisterStep2 } from './components/RegisterStep2';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { ManualBookModal } from './components/ManualBookModal';
import { BookDetailModal } from './components/BookDetailModal';
import { GoalSettingModal } from './components/GoalSettingModal';

const AppContent: React.FC = () => {
  const { activeTab, isRegisterFlowOpen, registerStep, toastMessage } = useLibrito();

  return (
    <div className="min-h-screen bg-[#fdf9f4] text-[#1c1c19] flex flex-col antialiased selection:bg-[#ffdad3]">
      {/* Header (hidden during registration flow) */}
      {!isRegisterFlowOpen && <Header />}

      {/* Main Tab Content */}
      <main className="flex-1 w-full">
        {activeTab === 'feed' && <HomeFeed />}
        {activeTab === 'explore' && <ExploreScreen />}
        {activeTab === 'library' && <LibraryScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </main>

      {/* Floating Bottom Nav (hidden during registration flow) */}
      {!isRegisterFlowOpen && <BottomNav />}

      {/* 2-Step Registration Flow Modal Stack */}
      {isRegisterFlowOpen && (
        <>
          {registerStep === 1 && <RegisterStep1 />}
          {registerStep === 2 && <RegisterStep2 />}
        </>
      )}

      {/* Supplementary Interactive Modals */}
      <BarcodeScannerModal />
      <ManualBookModal />
      <BookDetailModal />
      <GoalSettingModal />

      {/* Toast Notification for ritual celebrations and confirmations */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#17191c] text-[#fdf9f4] px-4 py-2.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-2 max-w-[90vw] text-center border border-[#ffdbcc]/20 animate-fade-in pointer-events-none">
          <span className="material-symbols-outlined text-[16px] text-[#ff866c]" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_stories
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <LibritoProvider>
      <AppContent />
    </LibritoProvider>
  );
}
