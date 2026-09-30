import React, { useState } from 'react';
import { useLibrito } from '../context/LibritoContext';
import { Book } from '../types';

export const RegisterStep1: React.FC = () => {
  const { 
    closeRegisterFlow, 
    selectBookForStep2, 
    currentReadingBook, 
    books, 
    drafts,
    resumeDraft,
    openBarcodeModal, 
    openManualModal,
    user,
  } = useLibrito();

  const [searchTerm, setSearchTerm] = useState('');

  // Books to show in "En tu lista de pendientes"
  const pendingBooks = books.filter((b) => b.status === 'want_to_read');

  // Filtered books if user is searching
  const filteredBooks = searchTerm.trim().length > 0 
    ? books.filter(b => 
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.isbn && b.isbn.includes(searchTerm))
      )
    : [];

  const handleSelectBook = (book: Book) => {
    selectBookForStep2(book);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#fdf9f4] text-[#1c1c19] flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-50 pt-safe bg-[#fdf9f4]/90 backdrop-blur-xl border-b border-[#e6e2dd]/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
          <button
            aria-label="Volver o cerrar"
            onClick={closeRegisterFlow}
            className="w-11 h-11 -ml-1 flex items-center justify-center rounded-full text-[#5c3d2e] hover:bg-[#f1ede8] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="font-serif text-lg font-medium text-[#5c3d2e] text-center tracking-tight truncate">
            Registrar Lectura
          </h1>
          <button
            aria-label="Cerrar registro"
            onClick={closeRegisterFlow}
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#82746e] hover:text-[#43271a] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pb-12 pt-4">
        <div className="flex flex-col space-y-6">
          {/* Paso & Encabezado cálido */}
          <section className="flex flex-col space-y-2 mt-1">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffdad3] text-[#3e0500] text-[11px] font-bold tracking-wide">
                Paso 1 de 2
              </span>
              <span className="text-[13px] font-semibold text-[#50443f] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a13f2a]"></span>
                Selecciona tu lectura
              </span>
            </div>
            <h2 className="font-serif text-[26px] leading-[34px] font-medium text-[#43271a] tracking-tight pt-1">
              ¿Qué historia terminaste hoy?
            </h2>
            <p className="text-[14px] leading-[22px] text-[#50443f]">
              {user.monthlyBenefitUnlocked || user.monthlyCompleted >= user.monthlyGoal
                ? 'Documenta esta lectura para sumar a tu historial; tu beneficio de octubre ya se encuentra disponible.'
                : `Documenta el libro que acompañó tus días para avanzar en tu meta (${user.monthlyCompleted}/${user.monthlyGoal}) y acceder al 15% en librerías asociadas.`}
            </p>
          </section>

          {/* Prompt de borrador pendiente si existe */}
          {drafts && drafts.length > 0 && (
            <div className="bg-[#fbe1d1]/50 border border-[#5d2a1a]/20 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[20px] text-[#a13f2a] shrink-0">edit_note</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#5d2a1a] truncate">
                    Borrador pendiente: {drafts[0].book.title}
                  </p>
                  <p className="text-[11px] text-[#82746e] truncate">{drafts[0].savedAt}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => resumeDraft(drafts[0])}
                className="px-3.5 py-1.5 rounded-full bg-[#17191c] text-white text-[11.5px] font-medium hover:bg-[#2c2f34] transition-colors shrink-0 shadow-xs flex items-center gap-1"
              >
                <span>Continuar</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
            </div>
          )}

          {/* Barra de búsqueda editorial suave */}
          <section className="relative w-full">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-[#82746e] text-[22px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por título, autor o ISBN..."
                className="w-full h-14 pl-12 pr-12 rounded-xl bg-[#f7f3ee] text-[#1c1c19] placeholder:text-[#82746e] text-[15px] border border-[#e6e2dd]/60 shadow-xs transition-all focus:outline-none focus:bg-white focus:border-[#a13f2a] focus:shadow-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Limpiar búsqueda"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 w-8 h-8 rounded-full flex items-center justify-center text-[#82746e] hover:text-[#1c1c19] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Resultados de búsqueda flotantes */}
            {searchTerm.trim().length > 0 && (
              <div className="mt-2 p-3 rounded-xl bg-white shadow-md border border-[#e6e2dd] divide-y divide-[#f1ede8]">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => handleSelectBook(book)}
                      className="py-2.5 px-2 flex items-center gap-3 hover:bg-[#f7f3ee] rounded-lg cursor-pointer transition-colors"
                    >
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded shadow-xs shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-medium text-[15px] text-[#43271a] truncate">
                          {book.title}
                        </h4>
                        <p className="text-xs text-[#50443f] truncate">{book.author}</p>
                        {book.edition && (
                          <span className="text-[10px] text-[#82746e] truncate block">
                            {book.edition}
                          </span>
                        )}
                      </div>
                      <span className="material-symbols-outlined text-[20px] text-[#a13f2a]">
                        arrow_forward
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center">
                    <p className="text-sm text-[#50443f]">No se encontraron libros para «{searchTerm}»</p>
                    <button
                      onClick={openManualModal}
                      className="mt-2 text-xs font-semibold text-[#a13f2a] hover:underline"
                    >
                      + Registrar este libro manualmente
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Tarjeta interactiva: Escanear código de barras */}
          <section>
            <button
              type="button"
              onClick={openBarcodeModal}
              className="w-full text-left p-4 rounded-xl bg-[#f1ede8] hover:bg-[#ebe8e3] active:scale-[0.985] transition-all shadow-xs border border-[#e6e2dd]/80 flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-xl bg-[#ff866c] text-[#741f0d] flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[28px]">document_scanner</span>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-serif text-[16px] text-[#43271a] font-semibold leading-tight">
                    Escanear código de barras
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#b9efc5] text-[#1e5031] text-[11px] font-bold shrink-0">
                    Rápido y automático
                  </span>
                </div>
                <p className="text-xs text-[#50443f] truncate mt-1">
                  Apunta la cámara al código posterior del libro
                </p>
              </div>
              <span className="material-symbols-outlined text-[#82746e] group-hover:text-[#43271a] transition-colors text-[24px]">
                chevron_right
              </span>
            </button>
          </section>

          {/* Sección: Tu lectura en curso (Libro actual) */}
          {currentReadingBook && (
            <section className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span
                    className="material-symbols-outlined text-[#a13f2a] text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_stories
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#43271a]">
                    Tu lectura en curso
                  </h3>
                </div>
                <span className="text-[11px] text-[#a13f2a] bg-[#ffdad3] px-2.5 py-1 rounded-full font-bold">
                  En tu mesa de luz
                </span>
              </div>

              {/* Tarjeta Libro Actual */}
              <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e6e2dd]/80 flex flex-col sm:flex-row gap-4">
                <div className="flex gap-4 items-start w-full">
                  {/* Portada Libro con lomo táctil */}
                  <div className="relative w-24 h-36 rounded-lg overflow-hidden shrink-0 shadow-md bg-[#ddd9d5] book-spine-effect">
                    <img
                      src={currentReadingBook.coverUrl}
                      alt={currentReadingBook.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info Libro */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1 h-36">
                    <div>
                      <span className="text-[11px] font-bold text-[#1b4d2e] bg-[#b9efc5]/60 px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1b4d2e] animate-pulse"></span>
                        Lectura activa
                      </span>
                      <h4 className="font-serif text-[17px] font-medium text-[#43271a] truncate leading-tight">
                        {currentReadingBook.title}
                      </h4>
                      <p className="text-xs text-[#50443f] truncate mt-0.5">
                        {currentReadingBook.author}
                      </p>
                      {currentReadingBook.edition && (
                        <p className="text-[11px] text-[#82746e] mt-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">verified</span>
                          {currentReadingBook.edition}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleSelectBook(currentReadingBook)}
                        className="w-full h-11 px-3 rounded-full bg-[#a13f2a] hover:bg-[#741f0d] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all truncate"
                      >
                        <span className="material-symbols-outlined text-[18px] shrink-0">
                          check_circle
                        </span>
                        <span className="truncate">Marcar como terminado</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Sección: En tu lista de pendientes */}
          {pendingBooks.length > 0 && (
            <section className="flex flex-col space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[#82746e] text-[20px]">
                    bookmark_border
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#43271a]">
                    En tu lista de pendientes
                  </h3>
                </div>
                <span className="text-[13px] text-[#a13f2a] font-semibold">
                  {pendingBooks.length} guardados
                </span>
              </div>

              {/* Carrusel Horizontal Táctil */}
              <div className="flex space-x-4 overflow-x-auto pb-3 pt-1 -mx-4 px-4 snap-x snap-mandatory no-scrollbar">
                {pendingBooks.map((book) => (
                  <div
                    key={book.id}
                    className="snap-start shrink-0 w-44 p-3 rounded-xl bg-[#f7f3ee] border border-[#e6e2dd]/80 shadow-xs flex flex-col justify-between group hover:bg-[#f1ede8] transition-all"
                  >
                    <div>
                      <div className="relative w-full h-44 rounded-lg overflow-hidden shadow-sm bg-[#ddd9d5] mb-3 book-spine-effect">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h5 className="font-serif text-[15px] font-medium leading-[20px] text-[#43271a] line-clamp-1">
                        {book.title}
                      </h5>
                      <p className="text-xs text-[#50443f] truncate mt-0.5">
                        {book.author}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSelectBook(book)}
                      className="mt-3 w-full h-9 rounded-full bg-[#e6e2dd] hover:bg-[#ffdbcc] text-[#43271a] text-[13px] font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
                    >
                      <span>Seleccionar</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tarjeta de micro-deleite: Celebración comunitaria */}
          <section className="p-4 rounded-xl bg-[#ffdbcc]/40 border border-[#ffdbcc]/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#43271a] flex items-center justify-center text-white shrink-0 shadow-xs">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-[#2d1509] font-bold leading-snug">
                ¡Qué gran momento! Tu biblioteca sigue creciendo
              </p>
              <p className="text-xs text-[#5f3f30] mt-0.5 leading-relaxed">
                Al completar este registro sumarás un nuevo sello a tu bitácora de lecturas.
              </p>
            </div>
          </section>

          {/* Enlace inferior discreto: Registro manual */}
          <footer className="pt-1 text-center">
            <button
              type="button"
              onClick={openManualModal}
              className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full text-[#50443f] hover:text-[#43271a] hover:bg-[#f1ede8] transition-colors text-[13px] font-medium group"
            >
              <span>¿No encuentras tu edición?</span>
              <span className="text-[#a13f2a] font-semibold group-hover:underline flex items-center">
                Registrar manualmente
                <span className="material-symbols-outlined text-[16px] ml-0.5">arrow_forward</span>
              </span>
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
};
