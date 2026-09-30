import React, { useState, useEffect } from 'react';
import { useLibrito } from '../context/LibritoContext';

export const BarcodeScannerModal: React.FC = () => {
  const { isBarcodeModalOpen, closeBarcodeModal, books, selectBookForStep2, startRegistration } = useLibrito();
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [manualIsbn, setManualIsbn] = useState('');
  const [scanningStatus, setScanningStatus] = useState<'searching' | 'detected'>('searching');

  useEffect(() => {
    if (!isBarcodeModalOpen) {
      setScanningStatus('searching');
      setManualIsbn('');
    }
  }, [isBarcodeModalOpen]);

  if (!isBarcodeModalOpen) return null;

  const handleScanBook = (bookId: string) => {
    setScanningStatus('detected');
    setTimeout(() => {
      const found = books.find((b) => b.id === bookId);
      if (found) {
        closeBarcodeModal();
        selectBookForStep2(found);
        startRegistration(found);
      }
    }, 700);
  };

  const handleManualIsbnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualIsbn.trim()) return;

    setScanningStatus('detected');
    setTimeout(() => {
      const match = books.find((b) => b.isbn && b.isbn.replace(/-/g, '').includes(manualIsbn.replace(/-/g, '')));
      if (match) {
        closeBarcodeModal();
        selectBookForStep2(match);
        startRegistration(match);
      } else {
        // Create matching candidate
        const newBook = {
          id: `scanned-${Date.now()}`,
          title: `Libro ISBN ${manualIsbn}`,
          author: 'Autor Reconocido',
          isbn: manualIsbn,
          edition: 'Edición detectada por escáner',
          coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
          status: 'reading' as const,
          tags: ['Escaneado'],
        };
        closeBarcodeModal();
        selectBookForStep2(newBook);
        startRegistration(newBook);
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-4">
      {/* Top Controls */}
      <div className="flex items-center justify-between text-white pt-safe">
        <button
          onClick={closeBarcodeModal}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="font-serif text-lg font-medium text-white">Escáner de Libro</span>
          <span className="text-[11px] text-[#ffdad3]">Apunta al código de barras posterior</span>
        </div>
        <button
          onClick={() => setIsTorchOn(!isTorchOn)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isTorchOn ? 'bg-amber-400 text-black' : 'bg-white/20 text-white'
          }`}
          title="Linterna"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isTorchOn ? 'flashlight_on' : 'flashlight_off'}
          </span>
        </button>
      </div>

      {/* Central Viewfinder */}
      <div className="flex-1 flex flex-col items-center justify-center my-6">
        <div className="relative w-72 h-72 border-2 border-white/40 rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden bg-black/30 shadow-2xl">
          {/* Target Corners */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#ff866c] rounded-tl-lg"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#ff866c] rounded-tr-lg"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#ff866c] rounded-bl-lg"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#ff866c] rounded-br-lg"></div>

          {/* Animated Red Laser Scan Line */}
          <div className="absolute inset-x-4 h-0.5 bg-[#ff866c] shadow-[0_0_12px_#ff866c] animate-bounce"></div>

          {/* Barcode graphic placeholder */}
          <div className="opacity-40 flex flex-col items-center pointer-events-none">
            <span className="material-symbols-outlined text-[64px] text-white">
              barcode_scanner
            </span>
            <span className="text-xs text-white/80 font-mono tracking-widest mt-2">
              978-8420471839
            </span>
          </div>

          {scanningStatus === 'detected' && (
            <div className="absolute inset-0 bg-[#1b4d2e]/90 flex flex-col items-center justify-center text-white p-4 text-center animate-fade-in">
              <span className="material-symbols-outlined text-[48px] text-[#b9efc5] mb-2">
                check_circle
              </span>
              <p className="font-serif text-lg font-medium">¡Código detectado!</p>
              <p className="text-xs text-[#b9efc5]">Cargando ritual de lectura...</p>
            </div>
          )}
        </div>

        <p className="text-white/80 text-xs mt-4 text-center max-w-xs">
          Centra el código ISBN de la contraportada para registrar tu lectura en un segundo.
        </p>
      </div>

      {/* Quick Interactive Test Barcodes */}
      <div className="bg-[#1c1c19]/90 border border-white/10 rounded-2xl p-4 text-white pb-safe">
        <p className="text-xs font-semibold text-white/70 mb-2">
          O prueba escaneando uno de tus libros:
        </p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => handleScanBook('cien-anos-de-soledad')}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-left text-xs transition-colors flex items-center gap-2 border border-white/5"
          >
            <span className="material-symbols-outlined text-[#ff866c] text-[18px]">menu_book</span>
            <div className="truncate">
              <div className="font-medium truncate">Cien años de soledad</div>
              <div className="text-[10px] text-white/60">García Márquez</div>
            </div>
          </button>
          <button
            onClick={() => handleScanBook('la-sombra-del-viento')}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-left text-xs transition-colors flex items-center gap-2 border border-white/5"
          >
            <span className="material-symbols-outlined text-[#ff866c] text-[18px]">menu_book</span>
            <div className="truncate">
              <div className="font-medium truncate">La sombra del viento</div>
              <div className="text-[10px] text-white/60">Ruiz Zafón</div>
            </div>
          </button>
        </div>

        {/* Manual ISBN input form */}
        <form onSubmit={handleManualIsbnSubmit} className="flex gap-2">
          <input
            type="text"
            value={manualIsbn}
            onChange={(e) => setManualIsbn(e.target.value)}
            placeholder="O escribe el ISBN (ej: 9788417860790)..."
            className="flex-1 h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff866c]"
          />
          <button
            type="submit"
            className="px-4 h-10 rounded-lg bg-[#a13f2a] hover:bg-[#741f0d] text-white text-xs font-semibold shrink-0 transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
};
