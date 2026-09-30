import React from 'react';
import { useLibrito } from '../context/LibritoContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, startRegistration } = useLibrito();

  const navItems = [
    { id: 'feed' as const, label: 'Inicio', icon: 'auto_stories' },
    { id: 'explore' as const, label: 'Explorar', icon: 'explore' },
    { id: 'library' as const, label: 'Biblioteca', icon: 'local_library' },
    { id: 'profile' as const, label: 'Perfil', icon: 'account_circle' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#fdf9f4]/95 backdrop-blur-md border-t border-[#e6e2dd]/80 pb-safe">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between relative">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all group ${
                isActive ? 'text-[#a13f2a]' : 'text-[#82746e] hover:text-[#43271a]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span 
                  className={`material-symbols-outlined text-[24px] transition-transform ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#a13f2a]"></span>
                )}
              </div>
              <span className={`text-[11px] font-medium tracking-tight mt-1 ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
