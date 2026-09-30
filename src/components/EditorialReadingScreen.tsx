import React, { useState } from 'react';
import { Book } from '../types';
import { INITIAL_BOOKS } from '../data/mockData';

interface EditorialReadingScreenProps {
  initialViewMode?: 'wireframe' | 'high_fidelity';
}

export const EditorialReadingScreen: React.FC<EditorialReadingScreenProps> = ({
  initialViewMode = 'wireframe',
}) => {
  // View mode switcher: Low-fidelity wireframe vs. High-fidelity prototype
  const [viewMode, setViewMode] = useState<'wireframe' | 'high_fidelity'>(initialViewMode);

  // Monthly reward reading state: 1st reading (unlocks benefit) vs. 2nd+ reading (benefit already active)
  const [readingOccurrence, setReadingOccurrence] = useState<'first_reading' | 'second_reading'>('first_reading');

  // Book Selection state
  const [selectedBook, setSelectedBook] = useState<Book>(INITIAL_BOOKS[0]); // Cien años de soledad
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Rating & Review State
  const [rating, setRating] = useState<number>(5);
  const [notes, setNotes] = useState<string>('Una estructura narrativa hipnótica que desafía la cronología convencional.');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Filtered search results
  const searchResults = INITIAL_BOOKS.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setIsSearching(false);
    setSearchQuery('');
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    setIsDraftSaved(false);
  };

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    setIsConfirmed(false);
  };

  const isWireframe = viewMode === 'wireframe';

  return (
    <div className={`min-h-screen w-full bg-white text-[#17191c] flex flex-col items-center ${isWireframe ? 'font-mono' : ''}`}>
      {/* Top Utility Controller: Allows validating the Wireframe Skeleton vs High-Fidelity directly */}
      <aside className="w-full bg-[#f2f2f3] border-b border-[#ececec] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-[#777b86]">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#17191c]">Wave Foxtrot Design System:</span>
          <span className="hidden sm:inline">Steep "serif analytics on warm paper"</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center bg-white rounded-full p-0.5 border border-[#ececec]">
            <button
              type="button"
              onClick={() => setViewMode('wireframe')}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                viewMode === 'wireframe'
                  ? 'bg-[#17191c] text-white'
                  : 'text-[#777b86] hover:text-[#17191c]'
              }`}
            >
              Wireframe (Baja fidelidad)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('high_fidelity')}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                viewMode === 'high_fidelity'
                  ? 'bg-[#17191c] text-white'
                  : 'text-[#777b86] hover:text-[#17191c]'
              }`}
            >
              Alta fidelidad
            </button>
          </div>

          {/* Reward State Toggle */}
          <div className="flex items-center bg-white rounded-full p-0.5 border border-[#ececec]">
            <button
              type="button"
              onClick={() => setReadingOccurrence('first_reading')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                readingOccurrence === 'first_reading'
                  ? 'bg-[#17191c] text-white'
                  : 'text-[#777b86] hover:text-[#17191c]'
              }`}
              title="1ª lectura de octubre"
            >
              1ª lectura
            </button>
            <button
              type="button"
              onClick={() => setReadingOccurrence('second_reading')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                readingOccurrence === 'second_reading'
                  ? 'bg-[#17191c] text-white'
                  : 'text-[#777b86] hover:text-[#17191c]'
              }`}
              title="2ª lectura de octubre (tope ético mensual alcanzado)"
            >
              2ª lectura
            </button>
          </div>
        </div>
      </aside>

      {/* Screen Container */}
      <div className="w-full max-w-[640px] px-6 sm:px-8 py-8 flex flex-col space-y-8">
        {/* SECCIÓN 1: Barra de navegación superior transparente con marca Librito a la izquierda, enlaces discretos en Söhne 16px al centro y estado de perfil a la derecha */}
        <nav className={`w-full flex items-center justify-between pb-4 border-b ${isWireframe ? 'border-dashed border-[#777b86]' : 'border-[#ececec]'}`}>
          {/* Marca Librito */}
          <div className="flex items-center gap-2">
            {isWireframe ? (
              <div className="border border-[#17191c] px-2.5 py-1 text-xs uppercase tracking-wider font-semibold">
                [MARCA: LIBRITO]
              </div>
            ) : (
              <span className="font-serif text-[22px] tracking-tight font-normal text-[#17191c]">
                Librito
              </span>
            )}
          </div>

          {/* Enlaces discretos en Söhne 16px al centro (sin subrayado en reposo) */}
          <div className="hidden sm:flex items-center space-x-6 text-[16px] text-[#777b86]">
            {isWireframe ? (
              <span className="text-xs text-[#979799]">[NAV: Biblioteca · Beneficios · Historial]</span>
            ) : (
              <>
                <button type="button" className="text-[#17191c] font-medium transition-colors">
                  Registro
                </button>
                <button type="button" className="text-[#777b86] hover:text-[#17191c] transition-colors">
                  Biblioteca
                </button>
                <button type="button" className="text-[#777b86] hover:text-[#17191c] transition-colors">
                  Beneficios
                </button>
              </>
            )}
          </div>

          {/* Estado de perfil a la derecha */}
          <div className="flex items-center gap-3">
            {isWireframe ? (
              <div className="border border-dashed border-[#777b86] px-2 py-1 text-[11px] text-[#777b86]">
                [PERFIL: S. SANTORO]
              </div>
            ) : (
              <div className="flex items-center gap-2 text-right">
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-[#17191c] leading-tight">Sofía S.</span>
                  <span className="text-[11px] text-[#777b86] leading-tight">Octubre activo</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#f2f2f3] border border-[#ececec] flex items-center justify-center text-xs font-medium text-[#17191c]">
                  SS
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* SECCIÓN 2: Encabezado editorial con titular H1 en Signifier 400 ("Registra tu lectura") y subhead en Söhne 430 que invita a documentar el libro del mes */}
        <header className="flex flex-col space-y-2 pt-2">
          {isWireframe ? (
            <div className="p-3 border border-dashed border-[#777b86] bg-[#f2f2f3] flex flex-col space-y-1">
              <span className="text-xs text-[#777b86] uppercase">[H1: Signifier 400 Regular]</span>
              <p className="text-lg font-bold">Registra tu lectura</p>
              <span className="text-xs text-[#777b86] uppercase">[SUBHEAD: Söhne 430 Regular]</span>
              <p className="text-xs text-[#777b86]">
                Documenta el libro que acompañó tu mes. Un registro pausado para sostener tu hábito y acceder a los beneficios en librerías asociadas.
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-[32px] leading-[38px] font-normal text-[#17191c]">
                Registra tu lectura
              </h1>
              <p className="text-[15px] leading-[22px] font-normal text-[#777b86] max-w-lg">
                Documenta el libro que acompañó tu mes. Un registro pausado para sostener tu hábito y acceder a los beneficios en librerías asociadas.
              </p>
            </>
          )}
        </header>

        {/* SECCIÓN 3: Buscador de libros estilo composer (fondo blanco, borde hairline 1px #ececec, radio 16px, placeholder en Smoke Gray #a3a6af y botón circular de confirmación #17191c) */}
        <section className="flex flex-col space-y-2">
          {isWireframe && (
            <span className="text-[11px] text-[#777b86] uppercase tracking-wider">
              [SECCIÓN 3: Buscador composer — radio 16px, borde hairline #ececec, botón circular #17191c]
            </span>
          )}

          <div className="relative w-full">
            <div className="w-full bg-white border border-[#ececec] rounded-[16px] p-2 pl-4 flex items-center justify-between gap-3 focus-within:border-[#17191c] transition-colors">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearching(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(true);
                }}
                placeholder="Buscar por título o autor..."
                className="w-full bg-transparent text-[15px] text-[#17191c] placeholder-[#a3a6af] outline-none font-normal"
              />
              <button
                type="button"
                aria-label="Confirmar búsqueda"
                onClick={() => setIsSearching(!isSearching)}
                className="w-9 h-9 rounded-full bg-[#17191c] text-white flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isSearching ? 'close' : 'arrow_forward'}
                </span>
              </button>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#ececec] rounded-[16px] p-2 z-20 shadow-subtle-3 max-h-56 overflow-y-auto">
                <div className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#979799]">
                  Libros disponibles en catálogo
                </div>
                {searchResults.map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => handleSelectBook(book)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f2f2f3] flex items-center justify-between text-sm transition-colors"
                  >
                    <div>
                      <span className="font-serif font-normal text-[#17191c] block">{book.title}</span>
                      <span className="text-xs text-[#777b86]">{book.author}</span>
                    </div>
                    <span className="text-xs text-[#979799]">Seleccionar</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SECCIÓN 4: Tarjeta neutral en Mist Gray (#f2f2f3, radio 24px, sin sombra) con datos del libro seleccionado, selector de valoración sobrio y campo para notas breves */}
        <section className="bg-[#f2f2f3] rounded-[24px] p-6 flex flex-col space-y-6">
          {isWireframe && (
            <span className="text-[11px] text-[#777b86] uppercase tracking-wider">
              [SECCIÓN 4: Tarjeta neutral Mist Gray #f2f2f3 — radio 24px, sin sombra]
            </span>
          )}

          {/* Datos del libro seleccionado */}
          <div className="flex items-start gap-4">
            {isWireframe ? (
              <div className="w-16 h-24 border border-dashed border-[#777b86] bg-white flex items-center justify-center text-[10px] text-center text-[#777b86] shrink-0">
                [PORTADA]
              </div>
            ) : (
              <div className="w-16 h-24 rounded-lg overflow-hidden shrink-0 border border-[#ececec] bg-white">
                <img
                  src={selectedBook.coverUrl}
                  alt={selectedBook.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <span className="text-[11px] uppercase tracking-wider text-[#777b86] font-medium block">
                Libro en documentación
              </span>
              <h2 className="font-serif text-[20px] leading-[26px] font-normal text-[#17191c] truncate mt-0.5">
                {selectedBook.title}
              </h2>
              <p className="text-[14px] text-[#777b86] mt-0.5">{selectedBook.author}</p>
              {selectedBook.edition && (
                <span className="text-[12px] text-[#979799] block mt-1">{selectedBook.edition}</span>
              )}
            </div>
          </div>

          <div className="w-full h-px bg-[#ececec]"></div>

          {/* Selector de valoración sobrio */}
          <div className="flex flex-col space-y-2">
            <label className="text-[13px] font-medium text-[#17191c]">
              Valoración cualitativa
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((val) => {
                const isSelected = val <= rating;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    aria-label={`Calificar con ${val} puntos`}
                    className={`h-9 px-3.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#17191c] text-white'
                        : 'bg-white text-[#777b86] border border-[#ececec] hover:border-[#17191c]'
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
              <span className="text-xs text-[#777b86] ml-2">
                {rating === 5 && 'Lectura memorable'}
                {rating === 4 && 'Muy recomendada'}
                {rating === 3 && 'Apreciable'}
                {rating === 2 && 'Irregular'}
                {rating === 1 && 'No conectó'}
              </span>
            </div>
          </div>

          {/* Campo para notas breves */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-medium text-[#17191c]">
                Notas breves o pasaje destacado
              </label>
              <span className="text-[11px] text-[#979799]">{notes.length} / 280</span>
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 280))}
              placeholder="Anota una reflexión, cita breve o impresión general de esta lectura..."
              className="w-full bg-white border border-[#ececec] rounded-[16px] p-3 text-[14px] leading-relaxed text-[#17191c] placeholder-[#a3a6af] outline-none focus:border-[#17191c] transition-colors resize-none font-normal"
            />
          </div>
        </section>

        {/* SECCIÓN 5: Tarjeta editorial única en Blush Peach (#fbe1d1, radio 24px, texto e icono en Sienna Brown #5d2a1a, sin sombra) que muestra el estado de recompensa mensual con el copy exacto acordado */}
        <section className="bg-[#fbe1d1] rounded-[24px] p-6 text-[#5d2a1a] flex items-start gap-4">
          {/* Icono temático sobrio en Sienna Brown */}
          <div className="w-10 h-10 rounded-full border border-[#5d2a1a]/30 flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px] text-[#5d2a1a]">
              local_activity
            </span>
          </div>

          {/* Copy exacto acordado según ocurrencia de lectura en el mes */}
          <div className="flex-1 flex flex-col space-y-1">
            {isWireframe && (
              <span className="text-[10px] text-[#5d2a1a]/70 uppercase tracking-widest block font-bold mb-1">
                [SECCIÓN 5: Tarjeta Blush Peach #fbe1d1 — radio 24px, texto en Sienna Brown #5d2a1a, sin sombra]
              </span>
            )}

            {readingOccurrence === 'first_reading' ? (
              <>
                <h3 className="font-serif text-[18px] leading-[24px] font-normal text-[#5d2a1a]">
                  Lectura de octubre completada
                </h3>
                <p className="text-[14px] leading-[20px] text-[#5d2a1a]/90 font-normal">
                  Sumaste tu beneficio del mes: 15% en librerías asociadas.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-serif text-[18px] leading-[24px] font-normal text-[#5d2a1a]">
                  Libro guardado en tu biblioteca
                </h3>
                <p className="text-[14px] leading-[20px] text-[#5d2a1a]/90 font-normal">
                  Cada página suma a tu historial; tu recompensa de octubre ya está lista para usar.
                </p>
              </>
            )}
          </div>
        </section>

        {/* SECCIÓN 6: Fila de acciones con par de botones pill alineados en la base (9999px radio): botón primario filled en Ink Black (#17191c, "Confirmar lectura") emparejado con botón secundario ghost (borde 1px #17191c, fondo transparente, "Guardar borrador") */}
        <section className="flex flex-col space-y-3 pt-2">
          {isWireframe && (
            <span className="text-[11px] text-[#777b86] uppercase tracking-wider">
              [SECCIÓN 6: Botones pill 9999px radio — Filled #17191c + Ghost 1px #17191c]
            </span>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            {/* Botón primario filled en Ink Black (#17191c) */}
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full sm:flex-1 h-[48px] rounded-full bg-[#17191c] text-white text-[15px] font-medium hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Confirmar lectura</span>
            </button>

            {/* Botón secundario ghost (borde 1px #17191c, fondo transparente) */}
            <button
              type="button"
              onClick={handleSaveDraft}
              className="w-full sm:w-auto px-6 h-[48px] rounded-full bg-transparent border border-[#17191c] text-[#17191c] text-[15px] font-medium hover:bg-[#f2f2f3] active:scale-[0.99] transition-all flex items-center justify-center"
            >
              <span>Guardar borrador</span>
            </button>
          </div>

          {/* Feedback de acción para demo rápida (< 2 min) */}
          {isConfirmed && (
            <div className="p-3 bg-[#f2f2f3] rounded-[16px] text-center text-xs text-[#17191c] border border-[#ececec]">
              ✓ Lectura de «{selectedBook.title}» confirmada. Beneficio de octubre acreditado en tu cuenta.
            </div>
          )}

          {isDraftSaved && (
            <div className="p-3 bg-[#f2f2f3] rounded-[16px] text-center text-xs text-[#777b86] border border-[#ececec]">
              Borrador guardado localmente. Puedes continuar cuando lo desees.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
