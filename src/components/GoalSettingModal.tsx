import React, { useState, useEffect } from 'react';
import { useLibrito } from '../context/LibritoContext';

export const GoalSettingModal: React.FC = () => {
  const { isGoalModalOpen, closeGoalModal, user, updateMonthlyGoal } = useLibrito();
  const [goal, setGoal] = useState<number>(user.monthlyGoal || 1);

  // Synchronize internal state whenever the modal opens
  useEffect(() => {
    if (isGoalModalOpen) {
      setGoal(user.monthlyGoal || 1);
    }
  }, [isGoalModalOpen, user.monthlyGoal]);

  if (!isGoalModalOpen) return null;

  const presets = [1, 2, 3, 4, 5, 6];
  const isBenefitAlreadyUnlocked = !!user.monthlyBenefitUnlocked;
  const willUnlockInstantly = !isBenefitAlreadyUnlocked && user.monthlyCompleted >= goal;
  const remainingBooks = Math.max(0, goal - user.monthlyCompleted);

  const handleDecrement = () => {
    setGoal((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setGoal((prev) => Math.min(20, prev + 1));
  };

  const handleSave = () => {
    updateMonthlyGoal(goal);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#17191c]/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-[24px] max-w-sm w-full p-6 text-[#17191c] border border-[#ececec] shadow-xl flex flex-col space-y-4 relative">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="pr-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#fbe1d1] text-[#5d2a1a] text-[11px] font-medium inline-block mb-1.5">
              Ritual de lectura
            </span>
            <h3 className="font-serif text-[21px] font-normal text-[#17191c] leading-tight">
              Objetivo mensual
            </h3>
            <p className="text-xs text-[#777b86] leading-relaxed mt-1">
              Elige cuántos libros deseas registrar este mes para sostener tu hábito y acceder a tu beneficio en librerías asociadas.
            </p>
          </div>
          <button
            type="button"
            onClick={closeGoalModal}
            className="w-8 h-8 rounded-full bg-[#f2f2f3] hover:bg-[#ececec] flex items-center justify-center text-[#777b86] shrink-0 transition-colors"
            title="Cerrar"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Stepper Display */}
        <div className="bg-[#fafafb] rounded-2xl p-4 border border-[#ececec] flex items-center justify-between">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={goal <= 1}
            className="w-11 h-11 rounded-full bg-white border border-[#ececec] shadow-2xs hover:bg-[#f2f2f3] active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-[#17191c] transition-all"
            title="Disminuir meta"
          >
            <span className="material-symbols-outlined text-[20px]">remove</span>
          </button>

          <div className="flex flex-col items-center">
            <span className="font-serif text-[42px] leading-none tabular-nums font-normal text-[#17191c]">
              {goal}
            </span>
            <span className="text-[12px] text-[#777b86] font-medium mt-1">
              {goal === 1 ? 'libro en octubre' : 'libros en octubre'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={goal >= 20}
            className="w-11 h-11 rounded-full bg-white border border-[#ececec] shadow-2xs hover:bg-[#f2f2f3] active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-[#17191c] transition-all"
            title="Aumentar meta"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>

        {/* Quick Selection Chips */}
        <div>
          <span className="text-[11px] font-semibold text-[#979799] uppercase tracking-wider block mb-2">
            Accesos directos
          </span>
          <div className="grid grid-cols-6 gap-1.5">
            {presets.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setGoal(num)}
                className={`py-2 rounded-full text-xs font-medium transition-all active:scale-95 ${
                  goal === num
                    ? 'bg-[#fbe1d1] text-[#5d2a1a] border border-[#5d2a1a]/30 font-semibold shadow-2xs'
                    : 'bg-[#f2f2f3] text-[#50443f] hover:bg-[#ececec] border border-transparent'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Status Callout */}
        <div className="pt-1">
          {isBenefitAlreadyUnlocked ? (
            <div className="bg-[#fbe1d1]/60 border border-[#5d2a1a]/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#5d2a1a]">
              <span
                className="material-symbols-outlined text-[18px] text-[#5d2a1a] shrink-0 mt-0.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <div className="flex-1 leading-snug">
                <span className="font-semibold">¡Beneficio de octubre asegurado!</span>
                <p className="text-[11px] text-[#5d2a1a]/85 mt-0.5">
                  Llevas {user.monthlyCompleted} lecturas. Puedes ampliar tu meta sin perder tu 15% de descuento ya acreditado.
                </p>
              </div>
            </div>
          ) : willUnlockInstantly ? (
            <div className="bg-[#fbe1d1]/60 border border-[#5d2a1a]/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#5d2a1a]">
              <span
                className="material-symbols-outlined text-[18px] text-[#5d2a1a] shrink-0 mt-0.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                celebration
              </span>
              <div className="flex-1 leading-snug">
                <span className="font-semibold">¡Cumplirás tu meta al instante!</span>
                <p className="text-[11px] text-[#5d2a1a]/85 mt-0.5">
                  Ya has registrado {user.monthlyCompleted} lecturas este mes. Al guardar, activarás tu 15% en librerías asociadas.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#f7f3ee] border border-[#e6e2dd] rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#50443f]">
              <span className="material-symbols-outlined text-[18px] text-[#82746e] shrink-0 mt-0.5">
                auto_stories
              </span>
              <div className="flex-1 leading-snug">
                <span className="font-medium text-[#1c1c19]">
                  Llevas {user.monthlyCompleted} de {goal} {goal === 1 ? 'libro' : 'libros'}
                </span>
                <p className="text-[11px] text-[#777b86] mt-0.5">
                  Te {remainingBooks === 1 ? 'falta 1 lectura' : `faltan ${remainingBooks} lecturas`} para activar tu 15% en librerías asociadas.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col space-y-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full min-h-[48px] px-6 rounded-full bg-[#17191c] hover:bg-[#2c2f34] text-white font-medium text-[14px] shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>Guardar objetivo</span>
            <span className="material-symbols-outlined text-[17px]">check</span>
          </button>

          <button
            type="button"
            onClick={closeGoalModal}
            className="w-full py-2 text-center text-xs text-[#777b86] hover:text-[#17191c] font-medium transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
