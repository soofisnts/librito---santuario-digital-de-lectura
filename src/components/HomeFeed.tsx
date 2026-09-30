import React, { useState } from 'react';
import { useLibrito } from '../context/LibritoContext';
import { RECOMMENDATIONS, TRENDING_TOP_BOOKS } from '../data/mockData';
import { MonthlyBenefitCard } from './MonthlyBenefitCard';
import { PendingToggleButton } from './PendingToggleButton';
import { Book } from '../types';

export const HomeFeed: React.FC = () => {
  const { 
    currentReadingBook, 
    startRegistration, 
    openBarcodeModal, 
    user, 
    posts, 
    toggleCongratulate, 
    toggleInterested, 
    toggleWantToRead, 
    isSavedInPending, 
    openBookDetail,
    setActiveTab,
    openGoalModal,
  } = useLibrito();

  const [feedFilter, setFeedFilter] = useState<'friends' | 'trending'>('friends');
  const [selectedTrendingTag, setSelectedTrendingTag] = useState<string | null>(null);

  const filteredPosts = feedFilter === 'friends' 
    ? posts.filter(p => p.author.isFriend) 
    : [...posts].sort((a, b) => (b.congratulationsCount + b.interestedCount) - (a.congratulationsCount + a.interestedCount));

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-24 pt-3 flex flex-col space-y-6">
      {/* Hero CTA de Lectura Actual */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5c3d2e] to-[#43271a] text-white p-5 shadow-sm border border-[#43271a]/30">
        <div className="relative z-10 flex flex-col">
          {currentReadingBook ? (
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ff866c] animate-pulse"></span>
              <span className="text-[12px] font-semibold text-[#ffdad3] tracking-wide">
                Lectura actual: {currentReadingBook.title}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[12px] font-semibold text-[#ffdad3]">
                Tu santuario de lectura
              </span>
            </div>
          )}

          <h2 className="font-serif text-[26px] leading-[32px] font-medium text-[#fdf9f4] mb-1.5">
            Tu siguiente página te espera
          </h2>
          <p className="text-[13px] text-[#ffdad3]/90 leading-relaxed mb-5 max-w-xs">
            {user.monthlyBenefitUnlocked || user.monthlyCompleted >= user.monthlyGoal
              ? '¡Meta mensual alcanzada! Tu beneficio del 15% en librerías asociadas está disponible para usar.'
              : `Registra ${user.monthlyGoal - user.monthlyCompleted} ${user.monthlyGoal - user.monthlyCompleted === 1 ? 'lectura más' : 'lecturas más'} para acceder al 15% de beneficio en librerías y cafés asociados.`}
          </p>

          {/* Botones de acción en una sola línea (Opción 1 fijada) */}
          <div className="flex flex-row items-center gap-2 w-full">
            <button
              type="button"
              onClick={() => startRegistration(currentReadingBook)}
              className="flex-1 min-h-[44px] px-3.5 rounded-full bg-[#a13f2a] hover:bg-[#b84830] text-white font-semibold text-[13px] shadow-sm active:scale-98 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_stories
              </span>
              <span>Registrar lectura</span>
            </button>

            <button
              type="button"
              onClick={openBarcodeModal}
              className="min-h-[44px] px-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#ffdbcc] text-[12.5px] font-medium flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap border border-white/10 shrink-0"
            >
              <span className="material-symbols-outlined text-[17px]">document_scanner</span>
              <span>Escanear código</span>
            </button>
          </div>
        </div>

        {/* Decorative corner paper flourish */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#a13f2a]/20 pointer-events-none blur-xl"></div>
      </section>

      {/* Módulo «Tus logros» (Gamificación ligera) */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#e6e2dd]/80 flex flex-col space-y-3">
        {/* Cabecera del módulo «Tus logros» */}
        <div className="flex items-center justify-between pb-2 border-b border-[#e6e2dd]/70">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1b4d2e] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
            <h3 className="font-serif text-[17px] font-medium text-[#43271a]">
              Tus logros
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className="text-[12px] font-medium text-[#5d2a1a] hover:underline flex items-center gap-0.5"
          >
            <span>Ver historial</span>
            <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-0.5">
          {/* Días seguidos */}
          <div className="bg-[#f7f3ee] p-3 rounded-xl flex flex-col items-center text-center border border-[#e6e2dd]/60">
            <div className="flex items-center gap-1 text-[#a13f2a] mb-1">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              <span className="text-lg font-bold tabular-nums">
                {user.activeStreakDays}
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#50443f] leading-tight">
              Días seguidos (Racha activa)
            </span>
          </div>

          {/* Libros leídos / Meta mensual interactiva */}
          <button
            type="button"
            onClick={openGoalModal}
            className="bg-[#f7f3ee] hover:bg-[#f1ede8] active:scale-95 transition-all p-3 rounded-xl flex flex-col items-center text-center border border-[#e6e2dd]/60 group cursor-pointer"
            title="Toca para ajustar tu objetivo mensual"
          >
            <div className="flex items-center gap-1 text-[#1b4d2e] mb-1">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                menu_book
              </span>
              <span className="text-lg font-bold tabular-nums">
                {user.monthlyCompleted}/{user.monthlyGoal}
              </span>
            </div>
            <div className="flex items-center gap-0.5 text-[11px] font-medium text-[#50443f] group-hover:text-[#17191c] leading-tight">
              <span>Meta mensual</span>
              <span className="material-symbols-outlined text-[12px] text-[#82746e] opacity-70 group-hover:opacity-100">
                edit
              </span>
            </div>
          </button>

          {/* Puntos acumulados */}
          <div className="bg-[#f7f3ee] p-3 rounded-xl flex flex-col items-center text-center border border-[#e6e2dd]/60">
            <div className="flex items-center gap-1 text-[#5c3d2e] mb-1">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                military_tech
              </span>
              <span className="text-lg font-bold tabular-nums">
                {user.points}
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#50443f] leading-tight">
              Puntos de santuario
            </span>
          </div>
        </div>

        {/* Beneficio Mensual Tangible (Tope ético) */}
        <MonthlyBenefitCard />
      </section>

      {/* Carrusel «Recomendaciones para ti» */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a13f2a] text-[20px]">
              auto_awesome
            </span>
            <h3 className="font-serif text-[18px] font-medium text-[#43271a]">
              Recomendaciones para ti
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-[12px] font-semibold text-[#82746e] hover:text-[#a13f2a]"
          >
            Explorar más
          </button>
        </div>

        {/* Carrusel con px-4 adaptado para respiración limpia */}
        <div className="flex space-x-3.5 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory no-scrollbar">
          {RECOMMENDATIONS.map((rec) => {
            const isSaved = isSavedInPending(rec.title);
            return (
              <div
                key={rec.id}
                className="snap-start shrink-0 w-48 p-3 rounded-xl bg-white border border-[#e6e2dd]/80 shadow-xs flex flex-col justify-between group hover:border-[#a13f2a]/40 transition-all"
              >
                <div>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-xs bg-[#ddd9d5] mb-2.5 book-spine-effect">
                    <img
                      src={rec.coverUrl}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      {rec.rating}
                    </div>
                  </div>

                  <span className="inline-block text-[10px] uppercase font-bold text-[#a13f2a] bg-[#ffdad3]/60 px-2 py-0.5 rounded mb-1">
                    {rec.tag}
                  </span>
                  <h4 className="font-serif text-[15px] font-medium leading-[20px] text-[#43271a] line-clamp-1">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-[#50443f] truncate mt-0.5">{rec.author}</p>
                  <p className="text-[11px] text-[#82746e] line-clamp-2 mt-1.5 leading-snug">
                    {rec.reason}
                  </p>
                </div>

                <PendingToggleButton
                  isSaved={isSaved}
                  onToggle={() => toggleWantToRead(rec)}
                  className="mt-3 w-full h-8 text-xs"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Feed «Comunidad lectora» */}
      <section className="flex flex-col space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5c3d2e] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              group
            </span>
            <h3 className="font-serif text-[18px] font-medium text-[#43271a]">
              Comunidad lectora
            </h3>
          </div>

          {/* Filter Tabs: Amigos / Tendencias */}
          <div className="flex bg-[#e6e2dd] p-0.5 rounded-full text-xs">
            <button
              onClick={() => setFeedFilter('friends')}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                feedFilter === 'friends'
                  ? 'bg-white text-[#43271a] shadow-xs'
                  : 'text-[#50443f] hover:text-[#1c1c19]'
              }`}
            >
              Amigos
            </button>
            <button
              onClick={() => setFeedFilter('trending')}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                feedFilter === 'trending'
                  ? 'bg-white text-[#43271a] shadow-xs'
                  : 'text-[#50443f] hover:text-[#1c1c19]'
              }`}
            >
              Tendencias
            </button>
          </div>
        </div>

        {/* Contenido condicional según tab seleccionada */}
        {feedFilter === 'trending' ? (
          <div className="flex flex-col space-y-3.5">
            {/* Píldoras temáticas en auge */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11.5px]">
              <span className="text-[#82746e] text-[10.5px] uppercase font-bold tracking-wider shrink-0 mr-1">
                En auge:
              </span>
              {[
                { tag: 'OtoñoLector', count: '420' },
                { tag: 'FilosofíaCotidiana', count: '285' },
                { tag: 'ClásicosBreves', count: '190' },
                { tag: 'RealismoMágico', count: '165' },
              ].map((item) => (
                <button
                  key={item.tag}
                  type="button"
                  onClick={() => setSelectedTrendingTag(selectedTrendingTag === item.tag ? null : item.tag)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all flex items-center gap-1 ${
                    selectedTrendingTag === item.tag
                      ? 'bg-[#a13f2a] text-white font-semibold shadow-xs'
                      : 'bg-[#f1ede8] text-[#50443f] hover:bg-[#e6e2dd]'
                  }`}
                >
                  <span>#{item.tag}</span>
                  <span className="text-[10px] opacity-75">({item.count})</span>
                </button>
              ))}
            </div>

            {/* Módulo Top 3 Lecturas del Mes en la Comunidad */}
            <div className="bg-[#f7f3ee] border border-[#e6e2dd] rounded-2xl p-3.5 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#43271a]">
                  <span className="material-symbols-outlined text-[17px] text-[#a13f2a]">trending_up</span>
                  <span>Más leídos este mes en Librito</span>
                </div>
                <span className="text-[11px] text-[#82746e]">Comunidad abierta</span>
              </div>

              <div className="flex flex-col space-y-2">
                {TRENDING_TOP_BOOKS.map((tb) => {
                  const isSaved = isSavedInPending(tb.title);
                  return (
                    <div
                      key={tb.title}
                      className="bg-white rounded-xl p-2.5 border border-[#e6e2dd]/80 flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-5 text-center font-serif text-[15px] font-bold shrink-0 ${
                            tb.rank === 1
                              ? 'text-[#a13f2a]'
                              : tb.rank === 2
                              ? 'text-[#5c3d2e]'
                              : 'text-[#82746e]'
                          }`}
                        >
                          #{tb.rank}
                        </span>
                        <div className="w-9 h-13 rounded-md overflow-hidden bg-[#e6e2dd] shrink-0 book-spine-effect shadow-xs">
                          <img
                            src={tb.coverUrl}
                            alt={tb.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-serif text-[13.5px] font-medium text-[#1c1c19] truncate">
                            {tb.title}
                          </h4>
                          <p className="text-[11px] text-[#82746e] truncate">{tb.author}</p>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#5c3d2e] mt-0.5">
                            <span className="font-medium text-[#a13f2a]">{tb.readersCount} lecturas</span>
                            <span>·</span>
                            <span className="text-[#2e7d32] font-semibold">{tb.recommendationRate} recomiendan</span>
                          </div>
                        </div>
                      </div>

                      <PendingToggleButton
                        isSaved={isSaved}
                        onToggle={() => toggleWantToRead(tb)}
                        savedText="Guardado"
                        hoverText="Quitar"
                        unsavedText="Pendiente"
                        iconSize="text-[14px]"
                        className="px-2.5 py-1.5 text-[11px] shrink-0"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cita más guardada de la semana */}
            <div className="bg-gradient-to-r from-[#fdfbf7] to-[#f7f2ea] border-l-4 border-[#a13f2a] rounded-r-2xl p-3.5 shadow-2xs border border-[#e6e2dd]/70">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a13f2a]">
                  Cita más guardada de la semana
                </span>
                <span className="text-[10.5px] text-[#82746e] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#a13f2a]">favorite</span>
                  87 lectores
                </span>
              </div>
              <p className="font-serif italic text-[13.5px] text-[#43271a] leading-relaxed">
                «El libro ha superado la prueba del tiempo; cada vez que abrimos un libro, rescatamos una voz del pasado.»
              </p>
              <p className="text-[11px] font-semibold text-[#5c3d2e] mt-1.5">
                — Irene Vallejo, <span className="italic font-normal">El infinito en un junco</span>
              </p>
            </div>

            {/* Título de reseñas destacadas de la comunidad */}
            <div className="flex items-center justify-between pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#82746e]">
                Reseñas con mayor impacto
              </h4>
              <span className="text-[11px] text-[#82746e]">Comunidad Librito</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#82746e]">
              Lecturas y logros de tus amigos
            </span>
            <span className="text-[11px] text-[#82746e]">{filteredPosts.length} publicaciones</span>
          </div>
        )}

        {/* Post List */}
        <div className="flex flex-col space-y-4">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl p-4 shadow-xs border border-[#e6e2dd]/80 flex flex-col space-y-3"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#e6e2dd]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-bold text-[#1c1c19]">
                        {post.author.name}
                      </span>
                      {post.author.badge && (
                        <span className="text-[10px] bg-[#f1ede8] text-[#5c3d2e] px-1.5 py-0.2 rounded font-medium">
                          {post.author.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#82746e]">{post.timestamp}</span>
                  </div>
                </div>

                {post.vibe && (
                  <span className="text-[11px] font-bold text-[#5c3d2e] bg-[#ffdbcc]/50 px-2 py-0.5 rounded-full">
                    {post.vibe}
                  </span>
                )}
              </div>

              {/* Milestone Celebration or Book Activity */}
              {post.actionType === 'milestone' ? (
                <div className="p-3.5 rounded-xl bg-[#b9efc5]/30 border border-[#b9efc5]/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1b4d2e] text-[#b9efc5] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      emoji_events
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#00361a]">
                      {post.milestoneTitle}
                    </p>
                    <p className="text-xs text-[#1e5031]">
                      Celebrando el hábito lector pausado y sin exigencias.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 bg-[#f7f3ee] p-3 rounded-xl border border-[#e6e2dd]/60">
                  <div className="relative w-12 h-18 rounded-md overflow-hidden shrink-0 shadow-xs bg-[#ddd9d5] book-spine-effect">
                    <img
                      src={post.book.coverUrl}
                      alt={post.book.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-[#a13f2a] uppercase tracking-wider">
                      {post.actionType === 'quote' ? 'Cita destacada' : 'Lectura terminada'}
                    </span>
                    <h5 className="font-serif text-[15px] font-medium text-[#43271a] truncate">
                      {post.book.title}
                    </h5>
                    <p className="text-xs text-[#50443f] truncate">{post.book.author}</p>
                    {post.rating && (
                      <div className="flex items-center text-[#ff866c] text-[13px] mt-0.5">
                        {'★'.repeat(post.rating)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Highlighted Quote in Editorial Serif */}
              {post.quote && (
                <div className="pl-3 border-l-2 border-[#a13f2a] py-0.5">
                  <p className="font-serif italic text-[14px] text-[#43271a] leading-relaxed">
                    «{post.quote}»
                  </p>
                </div>
              )}

              {/* Review Text */}
              {post.review && (
                <p className="text-[13px] text-[#50443f] leading-relaxed">
                  {post.review}
                </p>
              )}

              {/* Interactive Actions: Felicitar & Me interesa */}
              <div className="flex items-center justify-between pt-2 border-t border-[#f1ede8] text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleCongratulate(post.id)}
                    className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all active:scale-95 ${
                      post.userCongratulated
                        ? 'bg-[#ffdad3] text-[#a13f2a] font-bold'
                        : 'bg-[#f1ede8] text-[#50443f] hover:bg-[#e6e2dd]'
                    }`}
                  >
                    <span>👏</span>
                    <span>¡Felicitar!</span>
                    <span className="tabular-nums font-semibold">
                      ({post.congratulationsCount})
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleInterested(post.id)}
                    className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all active:scale-95 ${
                      post.userInterested
                        ? 'bg-[#b9efc5]/60 text-[#00361a] font-bold'
                        : 'bg-[#f1ede8] text-[#50443f] hover:bg-[#e6e2dd]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">bookmark</span>
                    <span>Me interesa</span>
                    <span className="tabular-nums font-semibold">
                      ({post.interestedCount})
                    </span>
                  </button>
                </div>

                <div className="text-[#82746e] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                  <span>{post.commentsCount}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
