import React from 'react';
import { useLibrito } from '../context/LibritoContext';
import { MonthlyBenefitCard } from './MonthlyBenefitCard';

export const ProfileScreen: React.FC = () => {
  const { user, books, startRegistration, openGoalModal } = useLibrito();

  const booksWithQuotes = books.filter((b) => b.quote && b.quote.trim().length > 0);

  const stamps = [
    { title: 'Sello Realismo Mágico', icon: 'auto_awesome', color: '#ff866c', desc: 'Por registrar obras cumbre de la literatura latinoamericana' },
    { title: 'Café & Tinta', icon: 'coffee', color: '#5c3d2e', desc: '6 días seguidos sumando al ritual sin interrupción' },
    { title: 'Guardián de Citas', icon: 'format_quote', color: '#1b4d2e', desc: 'Atesorando pasajes inolvidables para el futuro' },
    { title: 'Lectura Pausada', icon: 'hourglass_bottom', color: '#a13f2a', desc: 'Disfrutar cada página sin la presión del reloj' },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-24 pt-3 flex flex-col space-y-5">
      {/* Profile Header Card */}
      <section className="bg-white rounded-2xl p-5 border border-[#e6e2dd]/80 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
        <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#ffdad3] shadow-md mb-3">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <h2 className="font-serif text-[22px] font-medium text-[#43271a]">
          {user.name}
        </h2>
        <span className="text-xs text-[#82746e] font-mono mt-0.5">{user.handle}</span>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1ede8] text-[#5c3d2e] text-xs font-semibold mt-2.5 border border-[#d4c3bc]/40">
          <span className="material-symbols-outlined text-[15px] text-[#a13f2a]" style={{ fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
          <span>{user.sanctuaryLevel}</span>
        </div>

        <p className="text-xs text-[#50443f] mt-3 max-w-xs leading-relaxed">
          {user.bio}
        </p>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-2 w-full pt-4 mt-3 border-t border-[#f1ede8]">
          <div>
            <span className="block text-lg font-bold text-[#a13f2a] tabular-nums">
              {user.points}
            </span>
            <span className="text-[10px] text-[#82746e] uppercase tracking-wider font-semibold">
              Puntos Ritual
            </span>
          </div>

          <div>
            <span className="block text-lg font-bold text-[#1b4d2e] tabular-nums">
              {user.activeStreakDays} días
            </span>
            <span className="text-[10px] text-[#82746e] uppercase tracking-wider font-semibold">
              Racha Activa
            </span>
          </div>

          <div>
            <span className="block text-lg font-bold text-[#5c3d2e] tabular-nums">
              {user.totalBooksRead}
            </span>
            <span className="text-[10px] text-[#82746e] uppercase tracking-wider font-semibold">
              Leídos en total
            </span>
          </div>
        </div>
      </section>

      {/* Objetivo Mensual Personalizado */}
      <section className="bg-white rounded-2xl p-4 border border-[#e6e2dd]/80 shadow-xs flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5d2a1a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              flag
            </span>
            <h3 className="font-serif text-[17px] font-medium text-[#43271a]">
              Objetivo mensual
            </h3>
          </div>
          <button
            type="button"
            onClick={openGoalModal}
            className="text-[12px] font-medium text-[#5d2a1a] hover:underline flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fbe1d1]/50 border border-[#5d2a1a]/15 hover:bg-[#fbe1d1] transition-colors"
          >
            <span className="material-symbols-outlined text-[13px]">edit</span>
            <span>Ajustar meta</span>
          </button>
        </div>

        <div className="flex items-baseline justify-between pt-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-[26px] font-normal text-[#17191c] tabular-nums">
              {user.monthlyCompleted}
            </span>
            <span className="text-sm text-[#777b86]">/ {user.monthlyGoal} libros leídos</span>
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            (user.monthlyBenefitUnlocked || user.monthlyCompleted >= user.monthlyGoal)
              ? 'bg-[#e8f5e9] text-[#1b4d2e]'
              : 'bg-[#f7f3ee] text-[#50443f]'
          }`}>
            {(user.monthlyBenefitUnlocked || user.monthlyCompleted >= user.monthlyGoal) ? 'Meta cumplida ✓' : 'En progreso'}
          </span>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-[#f2f2f3] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#5d2a1a] h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${Math.min(100, Math.round((user.monthlyCompleted / user.monthlyGoal) * 100))}%`,
            }}
          />
        </div>

        <p className="text-[11.5px] text-[#777b86] leading-tight">
          {(user.monthlyBenefitUnlocked || user.monthlyCompleted >= user.monthlyGoal)
            ? '¡Felicitaciones! Has asegurado tu beneficio de octubre. Puedes elevar tu meta si deseas seguir desafiándote.'
            : `Registra ${user.monthlyGoal - user.monthlyCompleted} ${user.monthlyGoal - user.monthlyCompleted === 1 ? 'libro más' : 'libros más'} para acceder a tu 15% en librerías asociadas.`}
        </p>
      </section>

      {/* Beneficio Tangible Mensual Reutilizado */}
      <MonthlyBenefitCard />

      {/* Sellos & Medallas Artesanales */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-[18px] font-medium text-[#43271a]">
            Sellos de tu santuario
          </h3>
          <span className="text-xs text-[#82746e]">4 sellos en tu historial</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {stamps.map((stamp, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 rounded-xl border border-[#e6e2dd]/80 shadow-xs flex flex-col items-center text-center"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 shadow-xs"
                style={{ backgroundColor: stamp.color }}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {stamp.icon}
                </span>
              </div>
              <h4 className="font-serif text-[13px] font-medium text-[#43271a]">
                {stamp.title}
              </h4>
              <p className="text-[10px] text-[#82746e] mt-1 leading-snug">
                {stamp.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Citas Destacadas Guardadas */}
      <section className="flex flex-col space-y-3">
        <h3 className="font-serif text-[18px] font-medium text-[#43271a]">
          Tus pasajes memorables
        </h3>

        {booksWithQuotes.length > 0 ? (
          <div className="flex flex-col space-y-2.5">
            {booksWithQuotes.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-white border border-[#e6e2dd]/80 shadow-xs flex flex-col gap-1.5"
              >
                <p className="font-serif italic text-sm text-[#43271a] leading-relaxed">
                  «{b.quote}»
                </p>
                <span className="text-[11px] text-[#a13f2a] font-semibold mt-1">
                  — {b.title}, {b.author}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#82746e]">
            Aún no has registrado citas textuales en tus notas.
          </p>
        )}
      </section>
    </div>
  );
};
