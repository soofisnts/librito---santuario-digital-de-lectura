import React from 'react';
import { useLibrito } from '../context/LibritoContext';
import { PendingToggleButton } from './PendingToggleButton';

export const BookDetailModal: React.FC = () => {
  const { selectedDetailBook, closeBookDetail, startRegistration, toggleWantToRead, isSavedInPending } = useLibrito();

  if (!selectedDetailBook) return null;

  const book = selectedDetailBook;
  const isSaved = isSavedInPending(book.id || book.title);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fdf9f4] w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-3xl p-5 shadow-2xl border border-[#e6e2dd] flex flex-col">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={closeBookDetail}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#82746e] hover:bg-[#f1ede8] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Cover & Basic Info */}
        <div className="flex flex-col items-center text-center -mt-2">
          <div className="relative w-28 h-40 rounded-xl overflow-hidden shadow-lg bg-[#ddd9d5] mb-3 book-spine-effect">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <h3 className="font-serif text-[20px] font-medium text-[#43271a] leading-snug">
            {book.title}
          </h3>
          <p className="text-sm text-[#50443f] mt-0.5">{book.author}</p>
          {book.edition && (
            <span className="text-[11px] text-[#82746e] mt-1">{book.edition}</span>
          )}

          {/* Rating & Vibe */}
          {book.rating && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#ff866c] text-sm">
                {'★'.repeat(book.rating)}
              </span>
              {book.vibe && (
                <span className="text-xs font-semibold text-[#5c3d2e] bg-[#ffdad3] px-2.5 py-0.5 rounded-full">
                  {book.vibe}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Quote if any */}
        {book.quote && (
          <div className="mt-4 p-3 bg-white rounded-xl border border-[#e6e2dd] text-left">
            <span className="text-[10px] uppercase font-bold text-[#a13f2a] tracking-wider block mb-1">
              Pasaje Memorable
            </span>
            <p className="font-serif italic text-xs text-[#43271a] leading-relaxed">
              «{book.quote}»
            </p>
          </div>
        )}

        {/* Review if any */}
        {book.review && (
          <div className="mt-3 p-3 bg-white rounded-xl border border-[#e6e2dd] text-left">
            <span className="text-[10px] uppercase font-bold text-[#82746e] tracking-wider block mb-1">
              Nota del Lector
            </span>
            <p className="text-xs text-[#50443f] leading-relaxed">
              {book.review}
            </p>
          </div>
        )}

        {/* Tags */}
        {book.tags && book.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
            {book.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 bg-[#f1ede8] text-[#50443f] text-[11px] rounded-md"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-5 flex flex-col gap-2">
          {book.status !== 'completed' && (
            <>
              <button
                onClick={() => {
                  closeBookDetail();
                  startRegistration(book);
                }}
                className="w-full min-h-[44px] rounded-full bg-[#a13f2a] hover:bg-[#741f0d] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Registrar como terminado</span>
              </button>

              <PendingToggleButton
                isSaved={isSaved}
                onToggle={() => toggleWantToRead(book)}
                iconSize="text-[16px]"
                className="w-full min-h-[40px] text-xs"
              />
            </>
          )}

          {book.status === 'completed' && (
            <button
              onClick={() => {
                closeBookDetail();
                startRegistration(book);
              }}
              className="w-full min-h-[44px] rounded-full bg-[#5c3d2e] hover:bg-[#43271a] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              <span>Editar bitácora</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
