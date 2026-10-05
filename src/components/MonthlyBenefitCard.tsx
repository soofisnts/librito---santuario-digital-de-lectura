import React, { useState } from 'react';
import { useLibrito } from '../context/LibritoContext';
import { ASSOCIATED_BOOKSTORES, AssociatedBookstore } from '../data/bookstores';

interface MonthlyBenefitCardProps {
  className?: string;
}

export const MonthlyBenefitCard: React.FC<MonthlyBenefitCardProps> = ({ className = '' }) => {
  const { user, showToast } = useLibrito();
  const [isBookstoresExpanded, setIsBookstoresExpanded] = useState(false);
  const [selectedBookstoreModal, setSelectedBookstoreModal] = useState<AssociatedBookstore | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Limitar estrictamente a un máximo de 5 sedes
  const visibleBookstores = ASSOCIATED_BOOKSTORES.slice(0, 5);

  const isBenefitUnlocked = !!user.monthlyBenefitUnlocked || user.monthlyCompleted >= user.monthlyGoal;
  const remainingBooks = Math.max(0, user.monthlyGoal - user.monthlyCompleted);

  const handleCopyCoupon = (code: string) => {
    if (!isBenefitUnlocked) {
      showToast(`A ${remainingBooks === 1 ? '1 lectura' : `${remainingBooks} lecturas`} de tu beneficio 📖`);
      return;
    }
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(true);
    showToast(`Código ${code} copiado al portapapeles 🎟️`);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  return (
    <>
      <section
        className={`bg-[#fbe1d1] rounded-[20px] p-4 text-[#5d2a1a] border border-[#5d2a1a]/20 shadow-xs flex flex-col space-y-3.5 ${className}`}
      >
        {/* Cabecera del beneficio */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-white/80 border border-[#5d2a1a]/20 flex items-center justify-center shrink-0 mt-0.5">
            <span
              className="material-symbols-outlined text-[20px] text-[#5d2a1a]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isBenefitUnlocked ? 'local_activity' : 'auto_awesome'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-serif text-[15.5px] font-normal text-[#5d2a1a] leading-tight block">
                {isBenefitUnlocked
                  ? (user.monthlyCompleted >= user.monthlyGoal ? 'Meta de octubre alcanzada' : 'Beneficio de octubre asegurado')
                  : 'Beneficio mensual de octubre'}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                isBenefitUnlocked ? 'bg-[#5d2a1a] text-white' : 'bg-white/60 text-[#5d2a1a]'
              }`}>
                {isBenefitUnlocked ? 'Activo' : `${user.monthlyCompleted}/${user.monthlyGoal}`}
              </span>
            </div>
            <p className="text-[12.5px] text-[#5d2a1a]/90 leading-snug mt-1">
              {isBenefitUnlocked
                ? (user.monthlyCompleted >= user.monthlyGoal
                    ? `Sumaste tu beneficio del mes: 15% en librerías asociadas (${user.monthlyCompleted}/${user.monthlyGoal} libros).`
                    : `Sumaste tu beneficio del mes: 15% en librerías asociadas. Vas ${user.monthlyCompleted}/${user.monthlyGoal} hacia tu nuevo desafío.`)
                : `Completa tu meta de ${user.monthlyGoal} ${user.monthlyGoal === 1 ? 'lectura' : 'lecturas'} (${user.monthlyCompleted}/${user.monthlyGoal}) para acceder a tu 15% en librerías y cafés.`}
            </p>
          </div>
        </div>

        {/* Componente del cupón 'librito-oct15' con opción de copiar integrada */}
        <div className="bg-white/80 rounded-xl p-3 border border-[#5d2a1a]/15 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className={`px-2.5 py-1 rounded-md font-mono font-medium tracking-wider text-[11.5px] shrink-0 ${
              isBenefitUnlocked ? 'bg-[#5d2a1a] text-white' : 'bg-[#e6e2dd] text-[#82746e]'
            }`}>
              {isBenefitUnlocked ? 'librito-oct15' : '••••••••••••'}
            </span>
            <span className="text-[12px] text-[#5d2a1a]/85 font-medium truncate">
              {isBenefitUnlocked
                ? '15% OFF en caja'
                : `15% OFF (A ${remainingBooks} ${remainingBooks === 1 ? 'lectura' : 'lecturas'} de tu beneficio)`}
            </span>
          </div>
          {isBenefitUnlocked ? (
            <button
              type="button"
              onClick={() => handleCopyCoupon('librito-oct15')}
              className="shrink-0 px-3 py-1.5 rounded-full bg-[#17191c] hover:bg-[#2c2f34] text-white text-[11px] font-medium transition-all flex items-center gap-1 active:scale-95 shadow-2xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">
                {copiedCoupon ? 'check' : 'content_copy'}
              </span>
              <span>{copiedCoupon ? 'Copiado' : 'Copiar'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleCopyCoupon('librito-oct15')}
              className="shrink-0 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-[#5d2a1a] border border-[#5d2a1a]/20 text-[11px] font-medium transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
              title="Beneficio pendiente de alcanzar meta"
            >
              <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
              <span>Pendiente</span>
            </button>
          )}
        </div>

        {/* Botón de acceso con el listado de librerías asociadas (texto en una sola línea) */}
        <div className="pt-0.5 flex flex-col space-y-2">
          <button
            type="button"
            onClick={() => setIsBookstoresExpanded(!isBookstoresExpanded)}
            className="w-full py-2.5 px-3 rounded-full bg-white/90 hover:bg-white text-[#5d2a1a] border border-[#5d2a1a]/25 text-[12px] font-medium transition-all flex items-center justify-between active:scale-[0.99] shadow-2xs whitespace-nowrap"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-[17px] text-[#5d2a1a] shrink-0">
                storefront
              </span>
              <span className="truncate">Librerías asociadas ({visibleBookstores.length} sedes)</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#5d2a1a]/85 shrink-0 ml-2">
              <span>{isBookstoresExpanded ? 'Ocultar sedes' : 'Ver sedes'}</span>
              <span className="material-symbols-outlined text-[15px]">
                {isBookstoresExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </div>
          </button>

          {/* Listado desplegable integrado con nombres y domicilios exactos (máximo 5 sedes) */}
          {isBookstoresExpanded && (
            <div className="mt-1 bg-white rounded-2xl p-3.5 border border-[#5d2a1a]/20 shadow-xs flex flex-col space-y-2.5 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-[#ececec]">
                <span className="text-[11px] font-semibold text-[#777b86] uppercase tracking-wider">
                  Sedes asociadas ({visibleBookstores.length})
                </span>
                <span className="text-[11px] text-[#5d2a1a] font-medium">Presenta el cupón en caja</span>
              </div>

              <div className="flex flex-col space-y-2 divide-y divide-[#ececec]/70">
                {visibleBookstores.map((bookstore) => (
                  <div
                    key={bookstore.id}
                    className="pt-2 first:pt-0 flex items-start justify-between gap-3 text-left group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-serif text-[14px] font-medium text-[#17191c] group-hover:text-[#5d2a1a] transition-colors leading-tight">
                          {bookstore.name}
                        </h4>
                        {bookstore.badge && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#fbe1d1] text-[9.5px] font-medium text-[#5d2a1a]">
                            {bookstore.badge}
                          </span>
                        )}
                      </div>

                      {/* Dirección / Domicilio destacado */}
                      <div className="flex items-center gap-1 text-[12px] text-[#50443f] mt-1">
                        <span className="material-symbols-outlined text-[14px] text-[#5d2a1a] shrink-0">
                          location_on
                        </span>
                        <span className="font-medium text-[#17191c]">{bookstore.address}</span>
                        <span className="text-[#777b86]">· {bookstore.neighborhood}</span>
                      </div>

                      <p className="text-[11px] text-[#777b86] mt-0.5 line-clamp-1">
                        {bookstore.benefit}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedBookstoreModal(bookstore)}
                      className="shrink-0 p-1.5 rounded-lg text-[#5d2a1a] hover:bg-[#fbe1d1]/50 transition-colors"
                      title="Ver detalle y cómo llegar"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        info
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 text-center border-t border-[#ececec]">
                <span className="text-[11px] text-[#82746e]">
                  Cupón válido: <span className="font-mono font-semibold text-[#5d2a1a]">librito-oct15</span> (15% descuento)
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Detalle de Librería Asociada */}
      {selectedBookstoreModal && (
        <div className="fixed inset-0 z-50 bg-[#17191c]/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-6 text-[#17191c] border border-[#ececec] shadow-xl flex flex-col space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#fbe1d1] text-[#5d2a1a] text-[11px] font-medium">
                  {selectedBookstoreModal.badge || 'Librería asociada'}
                </span>
                <h3 className="font-serif text-[20px] font-medium text-[#17191c] mt-1.5 leading-tight">
                  {selectedBookstoreModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBookstoreModal(null)}
                className="w-8 h-8 rounded-full bg-[#f2f2f3] hover:bg-[#ececec] flex items-center justify-center text-[#777b86]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col space-y-3 text-sm">
              <div className="flex items-start gap-2.5 bg-[#f7f3ee] p-3 rounded-xl border border-[#e6e2dd]">
                <span className="material-symbols-outlined text-[18px] text-[#5d2a1a] shrink-0 mt-0.5">
                  location_on
                </span>
                <div className="flex flex-col">
                  <span className="font-semibold text-[#17191c]">{selectedBookstoreModal.address}</span>
                  <span className="text-xs text-[#777b86]">
                    {selectedBookstoreModal.neighborhood}, {selectedBookstoreModal.city}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#50443f]">
                <span className="material-symbols-outlined text-[18px] text-[#777b86] shrink-0">
                  schedule
                </span>
                <span>{selectedBookstoreModal.hours}</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#50443f]">
                <span className="material-symbols-outlined text-[18px] text-[#1b4d2e] shrink-0">
                  verified
                </span>
                <span className="font-medium text-[#1b4d2e]">
                  Beneficio: {selectedBookstoreModal.benefit}
                </span>
              </div>

              <p className="text-xs text-[#777b86] leading-relaxed italic bg-white p-2.5 rounded-lg border border-[#ececec]">
                «{selectedBookstoreModal.note}»
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (isBenefitUnlocked) {
                    handleCopyCoupon('librito-oct15');
                    setSelectedBookstoreModal(null);
                  } else {
                    showToast(`Te ${remainingBooks === 1 ? 'falta 1 lectura' : `faltan ${remainingBooks} lecturas`} para activar este cupón 📖`);
                    setSelectedBookstoreModal(null);
                  }
                }}
                className={`flex-1 py-2.5 rounded-full text-xs font-medium transition-opacity text-center flex items-center justify-center gap-1.5 ${
                  isBenefitUnlocked
                    ? 'bg-[#17191c] text-white hover:opacity-90 cursor-pointer'
                    : 'bg-[#f2f2f3] text-[#777b86] hover:bg-[#ececec] cursor-pointer'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {isBenefitUnlocked ? 'content_copy' : 'lock'}
                </span>
                <span>{isBenefitUnlocked ? 'Copiar librito-oct15' : 'Cupón pendiente'}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedBookstoreModal(null)}
                className="px-4 py-2.5 rounded-full border border-[#ececec] text-xs font-medium text-[#777b86] hover:bg-[#f2f2f3]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
