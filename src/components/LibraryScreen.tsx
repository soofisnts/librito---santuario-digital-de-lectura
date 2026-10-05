import React, { useState } from 'react';
import { useLibrito } from '../context/LibritoContext';
import { Book } from '../types';

export const LibraryScreen: React.FC = () => {
  const { books, drafts, resumeDraft, deleteDraft, removePendingBook, startRegistration, openManualModal, openBookDetail } = useLibrito();
  const [shelf, setShelf] = useState<'completed' | 'want_to_read' | 'favorites'>('completed');

  const getFilteredBooks = () => {
    switch (shelf) {
      case 'completed':
        return books.filter((b) => b.status === 'completed');
      case 'want_to_read':
        return books.filter((b) => b.status === 'want_to_read');
      case 'favorites':
        return books.filter((b) => b.isFavorite);
    }
  };

  const filteredBooks = getFilteredBooks();

  const completedCount = books.filter((b) => b.status === 'completed').length;
  const wantCount = books.filter((b) => b.status === 'want_to_read').length;
  const favCount = books.filter((b) => b.isFavorite).length;

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-24 pt-3 flex flex-col space-y-5">
      {/* Header with Title and Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-[24px] font-medium text-[#43271a]">
            Mi biblioteca personal
          </h2>
          <p className="text-xs text-[#50443f]">
            Tu refugio de lecturas registradas con tacto y memoria.
          </p>
        </div>
        <button
          onClick={openManualModal}
          className="w-10 h-10 rounded-full bg-[#f1ede8] text-[#5c3d2e] hover:bg-[#ffdad3] hover:text-[#a13f2a] flex items-center justify-center transition-colors shadow-xs"
          title="Añadir libro manualmente"
        >
          <span className="material-symbols-outlined text-[22px]">add</span>
        </button>
      </div>

      {/* Sección de Borradores en curso */}
      {drafts && drafts.length > 0 && (
        <section className="bg-[#f7f3ee] border border-[#e6e2dd] rounded-2xl p-3.5 flex flex-col space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5c3d2e]">
              <span className="material-symbols-outlined text-[17px] text-[#a13f2a]">edit_note</span>
              <span>Borradores en curso ({drafts.length})</span>
            </div>
            <span className="text-[11px] text-[#82746e]">Guardados localmente</span>
          </div>

          <div className="flex flex-col space-y-2">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="bg-white rounded-xl p-3 border border-[#e6e2dd]/80 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-14 rounded-md overflow-hidden bg-[#e6e2dd] shrink-0 book-spine-effect shadow-xs">
                    <img
                      src={draft.book.coverUrl}
                      alt={draft.book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-[14px] font-medium text-[#1c1c19] truncate">
                      {draft.book.title}
                    </h4>
                    <p className="text-[11.5px] text-[#82746e] truncate">
                      {draft.book.author}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10.5px] text-[#a13f2a] mt-0.5 font-medium">
                      <span>★ {draft.formData.rating}/5</span>
                      <span>·</span>
                      <span className="text-[#82746e]">{draft.savedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => resumeDraft(draft)}
                    className="px-3 py-1.5 rounded-full bg-[#17191c] hover:bg-[#2c2f34] text-white text-[11.5px] font-medium transition-all shadow-xs flex items-center gap-1"
                  >
                    <span>Retomar</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteDraft(draft.id)}
                    className="w-7 h-7 rounded-full text-[#82746e] hover:bg-[#f1ede8] hover:text-[#a13f2a] flex items-center justify-center transition-colors"
                    title="Descartar borrador"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Shelves Selector Tabs */}
      <div className="flex bg-[#f1ede8] p-1 rounded-2xl border border-[#e6e2dd]/80 text-xs">
        <button
          onClick={() => setShelf('completed')}
          className={`flex-1 py-2 rounded-xl font-semibold transition-all flex flex-col items-center gap-0.5 ${
            shelf === 'completed'
              ? 'bg-white text-[#a13f2a] shadow-xs'
              : 'text-[#50443f] hover:text-[#1c1c19]'
          }`}
        >
          <span>Leídos</span>
          <span className="text-[10px] font-bold opacity-80">({completedCount})</span>
        </button>

        <button
          onClick={() => setShelf('want_to_read')}
          className={`flex-1 py-2 rounded-xl font-semibold transition-all flex flex-col items-center gap-0.5 ${
            shelf === 'want_to_read'
              ? 'bg-white text-[#a13f2a] shadow-xs'
              : 'text-[#50443f] hover:text-[#1c1c19]'
          }`}
        >
          <span>Pendientes</span>
          <span className="text-[10px] font-bold opacity-80">({wantCount})</span>
        </button>

        <button
          onClick={() => setShelf('favorites')}
          className={`flex-1 py-2 rounded-xl font-semibold transition-all flex flex-col items-center gap-0.5 ${
            shelf === 'favorites'
              ? 'bg-white text-[#a13f2a] shadow-xs'
              : 'text-[#50443f] hover:text-[#1c1c19]'
          }`}
        >
          <span>Favoritos</span>
          <span className="text-[10px] font-bold opacity-80">({favCount})</span>
        </button>
      </div>

      {/* Book Grid / List */}
      <div className="flex flex-col space-y-3">
        {filteredBooks.length > 0 ? (
          <div className="flex flex-col space-y-3">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => openBookDetail(book)}
                className="bg-white rounded-2xl p-3.5 border border-[#e6e2dd]/80 shadow-xs flex items-start gap-3.5 cursor-pointer hover:border-[#a13f2a]/40 transition-all"
              >
                {/* Book Thumbnail with tactile spine */}
                <div className="relative w-16 h-24 rounded-lg overflow-hidden shrink-0 shadow-sm bg-[#ddd9d5] book-spine-effect">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Book Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-24 py-0.5">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-serif text-[16px] font-medium text-[#43271a] truncate">
                        {book.title}
                      </h4>
                      {book.isFavorite && (
                        <span className="text-[#a13f2a] text-[15px]" title="Favorito">
                          ♥
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#50443f] truncate mt-0.5">{book.author}</p>
                    {book.edition && (
                      <p className="text-[10px] text-[#82746e] truncate">{book.edition}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {book.rating ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#ff866c] text-xs font-bold">
                          {'★'.repeat(book.rating)}
                        </span>
                        {book.vibe && (
                          <span className="text-[10px] font-bold text-[#5c3d2e] bg-[#ffdbcc]/50 px-2 py-0.5 rounded-full">
                            {book.vibe}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[11px] text-[#82746e]">
                          Pendiente de inicio
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePendingBook(book.id);
                          }}
                          className="w-7 h-7 rounded-full text-[#82746e] hover:bg-[#ffdad3] hover:text-[#a13f2a] flex items-center justify-center transition-colors"
                          title="Eliminar de pendientes"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    )}

                    {book.completedDate && (
                      <span className="text-[10px] text-[#82746e]">
                        {book.completedDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#e6e2dd]/80 flex flex-col items-center">
            <span className="material-symbols-outlined text-[48px] text-[#d4c3bc] mb-2">
              menu_book
            </span>
            <p className="font-serif text-[17px] font-normal text-[#43271a]">
              {shelf === 'completed' && 'Tu estante de leídos aguarda su primer recuerdo'}
              {shelf === 'want_to_read' && 'Tu estante de pendientes está despejado'}
              {shelf === 'favorites' && 'Aún no has guardado lecturas favoritas'}
            </p>
            <p className="text-xs text-[#50443f] mt-1 mb-4">
              Cada libro tiene su propio momento y espacio en tu ritual.
            </p>
            <button
              type="button"
              onClick={() => startRegistration()}
              className="px-4 py-2 rounded-full bg-[#a13f2a] hover:bg-[#b84830] text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
            >
              Registrar nuevo libro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
