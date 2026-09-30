import React, { useState } from 'react';
import { useLibrito } from '../context/LibritoContext';

export const ManualBookModal: React.FC = () => {
  const { isManualModalOpen, closeManualModal, addBookManually } = useLibrito();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [status, setStatus] = useState<'completed' | 'want_to_read'>('completed');

  if (!isManualModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    addBookManually({
      title: title.trim(),
      author: author.trim(),
      edition: edition.trim() || 'Edición personal',
      status,
    });

    setTitle('');
    setAuthor('');
    setEdition('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fdf9f4] w-full max-w-sm rounded-2xl p-5 shadow-2xl border border-[#e6e2dd] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-[#e6e2dd]/60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a13f2a] text-[22px]">
              edit_note
            </span>
            <h3 className="font-serif text-lg font-medium text-[#43271a]">
              Registrar manualmente
            </h3>
          </div>
          <button
            onClick={closeManualModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#82746e] hover:text-[#1c1c19] hover:bg-[#f1ede8] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 pt-4">
          <div>
            <label className="block text-[11px] font-bold text-[#82746e] uppercase tracking-wider mb-1">
              Título del libro *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Rayuela, Ficciones..."
              className="w-full h-11 px-3 rounded-xl bg-white border border-[#e6e2dd] text-sm text-[#1c1c19] focus:outline-none focus:border-[#a13f2a]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#82746e] uppercase tracking-wider mb-1">
              Autor o Autora *
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ej: Julio Cortázar"
              className="w-full h-11 px-3 rounded-xl bg-white border border-[#e6e2dd] text-sm text-[#1c1c19] focus:outline-none focus:border-[#a13f2a]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#82746e] uppercase tracking-wider mb-1">
              Editorial o Edición
            </label>
            <input
              type="text"
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
              placeholder="Ej: Alfaguara, Cátedra, Anagrama..."
              className="w-full h-11 px-3 rounded-xl bg-white border border-[#e6e2dd] text-sm text-[#1c1c19] focus:outline-none focus:border-[#a13f2a]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#82746e] uppercase tracking-wider mb-1">
              Estado de lectura
            </label>
            <div className="grid grid-cols-2 gap-1.5 bg-[#f1ede8] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setStatus('completed')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                  status === 'completed'
                    ? 'bg-white text-[#a13f2a] shadow-xs'
                    : 'text-[#50443f]'
                }`}
              >
                Leído (Terminado)
              </button>
              <button
                type="button"
                onClick={() => setStatus('want_to_read')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                  status === 'want_to_read'
                    ? 'bg-white text-[#a13f2a] shadow-xs'
                    : 'text-[#50443f]'
                }`}
              >
                Pendiente por leer
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={closeManualModal}
              className="flex-1 h-11 rounded-full border border-[#d4c3bc] text-[#50443f] text-xs font-semibold hover:bg-[#f1ede8] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-full bg-[#a13f2a] hover:bg-[#741f0d] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
