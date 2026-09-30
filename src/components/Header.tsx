import React from 'react';
import { useLibrito } from '../context/LibritoContext';

export const Header: React.FC = () => {
  const { user, setActiveTab } = useLibrito();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdf9f4]/90 backdrop-blur-md border-b border-[#e6e2dd]/60">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Zone */}
        <div 
          onClick={() => setActiveTab('feed')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-[#5c3d2e] text-[#fdf9f4] flex items-center justify-center shadow-xs group-hover:bg-[#a13f2a] transition-colors">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              menu_book
            </span>
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#43271a]">
            Librito
          </span>
        </div>

        {/* Action & Profile Zone */}
        <div className="flex items-center gap-3">
          {/* Puntos acumulados */}
          <button 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1ede8] hover:bg-[#e6e2dd] transition-all text-[#5c3d2e] border border-[#d4c3bc]/40 shadow-xs"
            title="Tus puntos de santuario lector"
          >
            <span className="material-symbols-outlined text-[16px] text-[#a13f2a]" style={{ fontVariationSettings: "'FILL' 1" }}>
              military_tech
            </span>
            <span className="text-xs font-semibold tabular-nums tracking-tight">
              {user.points} pts
            </span>
          </button>

          {/* User Avatar */}
          <button
            onClick={() => setActiveTab('profile')}
            className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#a13f2a]/30 hover:ring-[#a13f2a] transition-all focus:outline-none"
            title="Ver tu perfil"
          >
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
