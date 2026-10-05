import React, { useState } from 'react';
import { useLibrito } from '../context/LibritoContext';
import { BookVibe } from '../types';

export const RegisterStep2: React.FC = () => {
  const { 
    selectedBookForRegister, 
    goToStep1, 
    closeRegisterFlow, 
    saveRegisteredBook, 
    saveDraft,
    activeDraft,
    user 
  } = useLibrito();

  // If no book was chosen, fallback or return to step 1
  if (!selectedBookForRegister) {
    goToStep1();
    return null;
  }

  const book = selectedBookForRegister;

  // Form State initialized from activeDraft if resuming
  const [rating, setRating] = useState<number>(activeDraft?.formData.rating ?? 5);
  const [vibe, setVibe] = useState<BookVibe>(activeDraft?.formData.vibe ?? 'Reflexivo');
  const [review, setReview] = useState<string>(activeDraft?.formData.review ?? '');
  const [quote, setQuote] = useState<string>(activeDraft?.formData.quote ?? '');
  const [isFavorite, setIsFavorite] = useState<boolean>(activeDraft?.formData.isFavorite ?? true);
  const [isRecommended, setIsRecommended] = useState<boolean>(activeDraft?.formData.isRecommended ?? false);
  const [isCommunityShared, setIsCommunityShared] = useState<boolean>(activeDraft?.formData.isPublic ?? true);
  const [visibility, setVisibility] = useState<'public' | 'private'>(
    activeDraft?.formData.isPublic ? 'public' : 'private'
  );
  const [tags, setTags] = useState<string[]>(
    activeDraft?.formData.tags && activeDraft.formData.tags.length > 0
      ? [...activeDraft.formData.tags]
      : book.tags && book.tags.length > 0 
        ? [...book.tags] 
        : ['RealismoMágico', 'Clásico', 'Latinoamérica']
  );
  const [newTagInput, setNewTagInput] = useState<string>('');
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);

  // Date formatting
  const today = new Date();
  const formattedDateDefault = `Hoy, ${today.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`;
  const [finishDate, setFinishDate] = useState<string>(
    activeDraft?.formData.completedDate || formattedDateDefault
  );
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);

  const labels: Record<number, string> = {
    1: 'No conecté con la lectura (1/5)',
    2: 'Entretenido (2/5)',
    3: 'Buena compañía (3/5)',
    4: 'Resonó profundamente (4/5)',
    5: 'Inolvidable y transformador (5/5)',
  };

  const vibes: { label: BookVibe; emoji: string }[] = [
    { label: 'Inolvidable', emoji: '✨' },
    { label: 'Reflexivo', emoji: '🌀' },
    { label: 'Reconfortante', emoji: '☕' },
    { label: 'Desafiante', emoji: '⚡' },
  ];

  const handleAddQuotePrompt = () => {
    const quoteText = prompt('Añade una cita textual memorable de este libro:');
    if (quoteText && quoteText.trim()) {
      setQuote(quoteText.trim());
      setReview((prev) =>
        prev
          ? `«${quoteText.trim()}»\n\n${prev}`
          : `«${quoteText.trim()}»\n\n`
      );
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleAddTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagInput.trim()) {
      const clean = newTagInput.trim().replace(/^#/, '');
      if (!tags.includes(clean)) {
        setTags((prev) => [...prev, clean]);
      }
      setNewTagInput('');
      setIsAddingTag(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveRegisteredBook({
      rating,
      vibe,
      review,
      quote,
      isFavorite,
      isRecommended,
      completedDate: finishDate,
      tags,
      isPublic: isCommunityShared && visibility === 'public',
    });
  };

  const handleDraft = () => {
    saveDraft({
      rating,
      vibe,
      review,
      quote,
      isFavorite,
      isRecommended,
      completedDate: finishDate,
      tags,
      isPublic: isCommunityShared && visibility === 'public',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#fdf9f4] text-[#1c1c19] flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-50 pt-safe bg-[#fdf9f4]/90 backdrop-blur-xl border-b border-[#e6e2dd]/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
          <button
            aria-label="Volver al paso 1"
            onClick={goToStep1}
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

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pb-12 pt-3">
        <div className="flex flex-col w-full pb-8">
          {/* Progress Bar & Indicator */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad3] text-[#3e0500] text-[11px] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_stories
                </span>
                Paso 2 de 2
              </span>
              <span className="text-[13px] text-[#50443f] font-semibold">
                Tu balance lector
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#ebe8e3] rounded-full overflow-hidden">
              <div className="h-full bg-[#a13f2a] rounded-full w-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Active Draft Banner */}
          {activeDraft && (
            <div className="mb-4 bg-[#fbe1d1]/50 border border-[#5d2a1a]/20 rounded-xl p-3 flex items-center justify-between text-[#5d2a1a]">
              <div className="flex items-center gap-2 text-xs">
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span>
                  Retomando borrador guardado <strong className="font-semibold">({activeDraft.savedAt})</strong>
                </span>
              </div>
            </div>
          )}

          {/* Book Recap Card */}
          <section className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e2dd]/80 mb-5 flex items-center justify-between gap-3 relative overflow-hidden">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Book Thumbnail with paper-crease styling */}
              <div className="relative w-14 h-20 rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-[#ddd9d5] book-spine-effect">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Metadata */}
              <div className="flex flex-col min-w-0">
                <div className="inline-flex items-center gap-1 text-[#00361a] text-[11px] font-bold mb-0.5">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span>Completado hoy</span>
                </div>
                <h2 className="font-serif text-[17px] font-medium text-[#43271a] truncate leading-tight">
                  {book.title}
                </h2>
                <p className="text-xs text-[#50443f] truncate mt-0.5">
                  {book.author} {book.edition ? `• ${book.edition}` : ''}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={goToStep1}
              className="flex-shrink-0 text-[#a13f2a] text-[13px] font-semibold hover:underline px-2 py-1 rounded-lg hover:bg-[#ffdad3]/40 transition-colors"
            >
              Cambiar
            </button>
          </section>

          {/* Star Rating Block */}
          <section className="bg-[#f7f3ee] rounded-xl p-4 mb-5 shadow-xs border border-[#e6e2dd]/80 flex flex-col items-center text-center">
            <h3 className="font-serif text-lg font-medium text-[#5c3d2e] mb-1">
              ¿Qué te pareció esta lectura?
            </h3>
            <p className="text-xs text-[#50443f] mb-4">
              Toca una estrella para calificar este viaje literario
            </p>

            {/* Star interactive bar */}
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((val) => {
                const isFilled = val <= rating;
                return (
                  <button
                    key={val}
                    type="button"
                    aria-label={`${val} estrella${val > 1 ? 's' : ''}`}
                    onClick={() => setRating(val)}
                    className="transition-transform hover:scale-110 active:scale-95 p-1 cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-[36px] transition-colors ${
                        isFilled ? 'text-[#ff866c]' : 'text-[#e6e2dd]'
                      }`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic feedback label */}
            <div className="h-6 flex items-center justify-center">
              <span className="text-[14px] text-[#a13f2a] font-bold transition-all">
                {labels[rating]}
              </span>
            </div>

            {/* Emotion Mood Chips */}
            <div className="w-full pt-4 mt-1 flex flex-col items-center border-t border-[#e6e2dd]/60">
              <span className="text-[11px] text-[#82746e] uppercase font-bold tracking-wider mb-2.5">
                Vibra principal del libro
              </span>
              <div className="flex flex-wrap justify-center gap-2 w-full">
                {vibes.map((item) => {
                  const isActive = vibe === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setVibe(item.label)}
                      className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all border ${
                        isActive
                          ? 'bg-[#5c3d2e] text-white border-[#5c3d2e]'
                          : 'bg-white text-[#50443f] border-[#e6e2dd] hover:bg-[#f1ede8]'
                      }`}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Review / Personal Notes */}
          <section className="bg-white rounded-xl p-4 mb-5 shadow-xs border border-[#e6e2dd]/80 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-serif text-lg font-medium text-[#43271a]">
                Tu nota o reseña
              </h3>
              <span className="text-xs text-[#82746e] font-medium">Opcional</span>
            </div>
            <p className="text-xs text-[#50443f] mb-3">
              Escribe unas líneas para tu yo del futuro o para inspirar a otros lectores en Librito.
            </p>

            {/* Parchment textured writing field */}
            <div className="relative w-full rounded-xl bg-[#f7f3ee] p-3 shadow-inner border border-[#e6e2dd]/60 mb-3">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value.slice(0, 1200))}
                rows={4}
                placeholder="«Muchos años después, frente al pelotón de fusilamiento...» Escribe aquí tus reflexiones, pasajes memorables o qué despertó en ti esta lectura..."
                className="w-full bg-transparent border-0 outline-none resize-none font-serif text-[15px] leading-relaxed text-[#1c1c19] placeholder:text-[#82746e]/70 focus:ring-0"
              />
              <div className="flex justify-between items-center pt-2 border-t border-[#e6e2dd]/40">
                <button
                  type="button"
                  onClick={handleAddQuotePrompt}
                  className="inline-flex items-center gap-1 text-[#50443f] hover:text-[#a13f2a] text-xs font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">format_quote</span>
                  Añadir cita textual
                </button>
                <span className="text-[11px] text-[#82746e] tabular-nums">
                  {review.length} / 1200
                </span>
              </div>
            </div>

            {/* Sharing & Privacy Controls */}
            <div className="flex flex-col gap-2.5 bg-[#f1ede8] rounded-xl p-3 border border-[#e6e2dd]/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#a13f2a] text-[20px]">
                    forum
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#1c1c19]">
                      Compartir con la comunidad
                    </span>
                    <span className="text-[11px] text-[#50443f]">
                      Aparecerá en el feed de tus amigos lectores
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCommunityShared}
                    onChange={(e) => setIsCommunityShared(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#e6e2dd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#a13f2a]"></div>
                </label>
              </div>

              {isCommunityShared && (
                <div className="flex items-center justify-between pt-1 border-t border-[#e6e2dd]/60">
                  <span className="text-xs text-[#50443f] font-medium">Visibilidad del registro:</span>
                  <div className="flex gap-1 bg-[#e6e2dd] p-0.5 rounded-full">
                    <button
                      type="button"
                      onClick={() => setVisibility('public')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        visibility === 'public'
                          ? 'bg-white text-[#1c1c19] shadow-xs'
                          : 'text-[#50443f] hover:text-[#1c1c19]'
                      }`}
                    >
                      Pública
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisibility('private')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        visibility === 'private'
                          ? 'bg-white text-[#1c1c19] shadow-xs'
                          : 'text-[#50443f] hover:text-[#1c1c19]'
                      }`}
                    >
                      Solo para mí
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Tags, Favorites & Date */}
          <section className="bg-[#f7f3ee] rounded-xl p-4 mb-5 shadow-xs border border-[#e6e2dd]/80 flex flex-col gap-4">
            {/* Favorite and Recommend Chips */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-[13px] font-semibold shadow-xs active:scale-98 transition-all border ${
                  isFavorite
                    ? 'bg-[#ffdad3] text-[#a13f2a] border-[#ffdad3]'
                    : 'bg-white text-[#50443f] border-[#e6e2dd] hover:bg-[#f1ede8]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
                <span>Favorito del año</span>
              </button>

              <button
                type="button"
                onClick={() => setIsRecommended(!isRecommended)}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-[13px] font-semibold shadow-xs active:scale-98 transition-all border ${
                  isRecommended
                    ? 'bg-[#ffdad3] text-[#a13f2a] border-[#ffdad3]'
                    : 'bg-white text-[#50443f] border-[#e6e2dd] hover:bg-[#f1ede8]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: isRecommended ? "'FILL' 1" : "'FILL' 0" }}
                >
                  recommend
                </span>
                <span>Recomendar</span>
              </button>
            </div>

            {/* Finish Date Selector */}
            <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-xs border border-[#e6e2dd]/80">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#5c3d2e] text-[20px]">
                  event_available
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#82746e] uppercase font-bold tracking-wider">
                    Fecha de término
                  </span>
                  <span className="text-[13px] font-semibold text-[#1c1c19]">
                    {finishDate}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newDate = prompt('Ingresa la fecha de término:', finishDate);
                  if (newDate) setFinishDate(newDate);
                }}
                className="text-[#a13f2a] text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-[#ffdad3]/40 transition-colors"
              >
                Modificar
              </button>
            </div>

            {/* Thematic Tags */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-[#82746e] uppercase font-bold tracking-wider">
                Etiquetas literarias
              </span>
              <div className="flex flex-wrap gap-1.5 items-center">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-[#ffdad3] text-[#3e0500] text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:opacity-75 text-[11px] font-bold p-0.5"
                    >
                      ✕
                    </button>
                  </span>
                ))}

                {isAddingTag ? (
                  <form onSubmit={handleAddTagSubmit} className="inline-flex items-center">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      placeholder="Nueva etiqueta..."
                      autoFocus
                      onBlur={() => setIsAddingTag(false)}
                      className="h-7 px-2 text-xs rounded-lg border border-[#a13f2a] bg-white outline-none w-28"
                    />
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingTag(true)}
                    className="px-2.5 py-1 rounded-lg bg-[#e6e2dd] text-[#50443f] text-xs font-semibold flex items-center gap-1 hover:bg-[#ebe8e3] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    Etiqueta
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Tarjeta editorial en Blush Peach con el estado de recompensa mensual */}
          <section className="bg-[#fbe1d1] text-[#5d2a1a] rounded-[24px] p-5 mb-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-full border border-[#5d2a1a]/30 flex items-center justify-center shrink-0 mt-0.5">
              <span
                className="material-symbols-outlined text-[22px] text-[#5d2a1a]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_activity
              </span>
            </div>
            <div className="flex-1 flex flex-col space-y-1 min-w-0">
              {(!user.monthlyBenefitUnlocked && (user.monthlyCompleted + 1) >= user.monthlyGoal) ? (
                <>
                  <h3 className="font-serif text-[18px] leading-[24px] font-normal text-[#5d2a1a]">
                    ¡Completarás tu meta mensual!
                  </h3>
                  <p className="text-[13.5px] leading-[20px] text-[#5d2a1a]/90 font-normal">
                    Con esta lectura alcanzas tu objetivo de {user.monthlyGoal} {user.monthlyGoal === 1 ? 'libro' : 'libros'} y activas tu beneficio del 15% en librerías asociadas.
                  </p>
                </>
              ) : (user.monthlyBenefitUnlocked || (user.monthlyCompleted + 1) >= user.monthlyGoal) ? (
                <>
                  <h3 className="font-serif text-[18px] leading-[24px] font-normal text-[#5d2a1a]">
                    Libro guardado en tu santuario
                  </h3>
                  <p className="text-[13.5px] leading-[20px] text-[#5d2a1a]/90 font-normal">
                    Cada página enriquece tu historial; tu beneficio de octubre ya está listo para usar en librerías asociadas.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-serif text-[18px] leading-[24px] font-normal text-[#5d2a1a]">
                    Lectura sumada a tu meta
                  </h3>
                  <p className="text-[13.5px] leading-[20px] text-[#5d2a1a]/90 font-normal">
                    Alcanzarás {user.monthlyCompleted + 1} de {user.monthlyGoal} libros. Te {Math.max(0, user.monthlyGoal - (user.monthlyCompleted + 1)) === 1 ? 'falta 1 lectura' : `faltan ${Math.max(0, user.monthlyGoal - (user.monthlyCompleted + 1))} lecturas`} para activar tu 15% en librerías.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* Primary Action Container */}
          <div className="flex flex-col gap-2.5 w-full">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="w-full min-h-[52px] px-6 rounded-full bg-[#17191c] hover:bg-[#2c2f34] text-white font-medium text-[15px] shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bookmark_added
              </span>
              <span>Confirmar lectura</span>
            </button>

            <button
              type="button"
              onClick={handleDraft}
              className="w-full py-3 rounded-full text-[#17191c] border border-[#17191c] text-[14px] font-medium hover:bg-[#f2f2f3] transition-colors text-center"
            >
              Guardar borrador
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
