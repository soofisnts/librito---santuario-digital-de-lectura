import React, { useState } from 'react';

interface PendingToggleButtonProps {
  isSaved: boolean;
  onToggle: () => void;
  savedText?: string;
  hoverText?: string;
  unsavedText?: string;
  iconSize?: string;
  className?: string;
}

export const PendingToggleButton: React.FC<PendingToggleButtonProps> = ({
  isSaved,
  onToggle,
  savedText = 'Guardado',
  hoverText = 'Quitar de pendientes',
  unsavedText = 'Guardar en pendientes',
  iconSize = 'text-[15px]',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isSaved) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`rounded-full font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer select-none ${
          isHovered
            ? 'bg-[#ffdad3] text-[#a13f2a] border border-[#ffdad3]'
            : 'bg-[#b9efc5]/50 text-[#00361a] border border-[#b9efc5]'
        } ${className}`}
        title={isHovered ? hoverText : savedText}
      >
        <span className={`material-symbols-outlined ${iconSize} leading-none shrink-0`}>
          {isHovered ? 'remove' : 'check'}
        </span>
        <span className="truncate">{isHovered ? hoverText : savedText}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`rounded-full bg-[#f1ede8] hover:bg-[#ffdad3] hover:text-[#a13f2a] text-[#50443f] font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer select-none ${className}`}
      title={unsavedText}
    >
      <span className={`material-symbols-outlined ${iconSize} leading-none shrink-0`}>
        bookmark_add
      </span>
      <span className="truncate">{unsavedText}</span>
    </button>
  );
};
