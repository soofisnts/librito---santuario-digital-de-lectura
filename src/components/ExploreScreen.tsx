import React, { useState } from 'react';
import { useLibrito } from '../context/LibritoContext';
import { EXPLORE_CATALOG_BOOKS } from '../data/mockData';
import { PendingToggleButton } from './PendingToggleButton';
import { Book } from '../types';

export const ExploreScreen: React.FC = () => {
  const { books, toggleWantToRead, isSavedInPending, startRegistration, openBookDetail } = useLibrito();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'clasicos', label: 'Clásicos eternos' },
    { id: 'realismo', label: 'Realismo Mágico' },
    { id: 'ensayos', label: 'Ensayos y Pensamiento' },
    { id: 'acogedores', label: 'Café & Lluvia' },
  ];

  const filteredBooks = EXPLORE_CATALOG_BOOKS.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.tags && b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    if (selectedCategory === 'todos') return true;
    if (selectedCategory === 'clasicos') return b.tags?.includes('Clásico');
    if (selectedCategory === 'realismo') return b.tags?.includes('RealismoMágico');
    if (selectedCategory === 'ensayos') return b.tags?.includes('Ensayo') || b.tags?.includes('Filosofía');
    if (selectedCategory === 'acogedores') return b.vibe === 'Reconfortante' || b.tags?.includes('Poesía');
    return true;
  });

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-24 pt-3 flex flex-col space-y-5">
      {/* Search Header */}
      <div className="flex flex-col space-y-2">
        <h2 className="font-serif text-[24px] font-medium text-[#43271a]">
          Explorar descubrimientos
        </h2>
        <p className="text-xs text-[#50443f]">
          Encuentra tu próxima lectura pausada recomendada por otros lectores apasionados.
        </p>

        {/* Search Input */}
        <div className="relative mt-1">
          <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#82746e] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar títulos, autores o temáticas..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-[#e6e2dd] text-sm text-[#1c1c19] placeholder:text-[#82746e] shadow-xs focus:outline-none focus:border-[#a13f2a]"
          />
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-[#5c3d2e] text-white border-[#5c3d2e] shadow-xs'
                : 'bg-white text-[#50443f] border-[#e6e2dd] hover:bg-[#f1ede8]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Curated Reading Shelf Banner */}
      <div className="p-4 rounded-2xl bg-[#ffdbcc]/40 border border-[#ffdbcc] flex items-center justify-between gap-3">
        <div className="flex-1">
          <span className="text-[10px] uppercase font-bold text-[#a13f2a] tracking-wider">
            Colección del mes
          </span>
          <h3 className="font-serif text-[17px] font-medium text-[#43271a] mt-0.5">
            Páginas para días lentos
          </h3>
          <p className="text-xs text-[#50443f] mt-1 leading-relaxed">
            Libros que invitan a bajar el ritmo, acompañar con café y subrayar con lápiz suave.
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#a13f2a] text-white flex items-center justify-center shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[24px]">coffee</span>
        </div>
      </div>

      {/* Books Grid */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-[18px] font-medium text-[#43271a]">
            Catálogo selecto ({filteredBooks.length})
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {filteredBooks.map((book) => {
            const userBook = books.find(
              (b) => (b.id && book.id && b.id === book.id) ||
                     b.title.toLowerCase().trim() === book.title.toLowerCase().trim()
            );
            const isPending = userBook ? userBook.status === 'want_to_read' : isSavedInPending(book.id || book.title);
            const isCompleted = userBook ? userBook.status === 'completed' : false;

            return (
              <div
                key={book.id}
                className="bg-white rounded-xl p-3 border border-[#e6e2dd]/80 shadow-xs flex flex-col justify-between group hover:border-[#a13f2a]/40 transition-all"
              >
                <div>
                  <div 
                    onClick={() => openBookDetail(userBook || book)}
                    className="relative w-full h-44 rounded-lg overflow-hidden shadow-xs bg-[#ddd9d5] mb-2.5 cursor-pointer book-spine-effect"
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {book.rating && (
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {book.rating} ★
                      </div>
                    )}
                  </div>

                  <h4 
                    onClick={() => openBookDetail(userBook || book)}
                    className="font-serif text-[14px] font-medium leading-[18px] text-[#43271a] line-clamp-1 cursor-pointer hover:text-[#a13f2a]"
                  >
                    {book.title}
                  </h4>
                  <p className="text-xs text-[#50443f] truncate mt-0.5">{book.author}</p>
                </div>

                <div className="pt-2 flex flex-col gap-1.5">
                  {isPending ? (
                    <div className="flex gap-1.5">
                      <PendingToggleButton
                        isSaved={true}
                        onToggle={() => toggleWantToRead(book)}
                        savedText="Guardado"
                        hoverText="Quitar"
                        iconSize="text-[14px]"
                        className="flex-1 py-1.5 rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => startRegistration(userBook || book)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#a13f2a] hover:bg-[#741f0d] text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                        title="Registrar lectura"
                      >
                        <span>Leer</span>
                      </button>
                    </div>
                  ) : isCompleted ? (
                    <button
                      type="button"
                      onClick={() => startRegistration(userBook || book)}
                      className="w-full py-1.5 rounded-lg bg-[#f1ede8] text-[#5c3d2e] text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <span className="material-symbols-outlined text-[14px]">check</span>
                      <span>Leído</span>
                    </button>
                  ) : (
                    <PendingToggleButton
                      isSaved={false}
                      onToggle={() => toggleWantToRead(book)}
                      iconSize="text-[14px]"
                      className="w-full py-1.5 rounded-lg text-xs"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
