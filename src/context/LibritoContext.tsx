import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, BookVibe, CommunityPost, UserProfile, RegisterFormData, ReadingDraft } from '../types';
import { INITIAL_BOOKS, INITIAL_POSTS, INITIAL_USER } from '../data/mockData';

interface LibritoContextType {
  books: Book[];
  user: UserProfile;
  posts: CommunityPost[];
  currentReadingBook: Book | undefined;
  activeTab: 'feed' | 'explore' | 'library' | 'profile';
  setActiveTab: (tab: 'feed' | 'explore' | 'library' | 'profile') => void;
  // Registration Flow
  isRegisterFlowOpen: boolean;
  registerStep: 1 | 2;
  selectedBookForRegister: Book | null;
  activeDraft: ReadingDraft | null;
  drafts: ReadingDraft[];
  startRegistration: (book?: Book) => void;
  selectBookForStep2: (book: Book) => void;
  goToStep1: () => void;
  closeRegisterFlow: () => void;
  saveRegisteredBook: (formData: RegisterFormData) => void;
  saveDraft: (formData: RegisterFormData) => void;
  resumeDraft: (draft: ReadingDraft) => void;
  deleteDraft: (draftId: string) => void;
  // Modals
  isBarcodeModalOpen: boolean;
  openBarcodeModal: () => void;
  closeBarcodeModal: () => void;
  isManualModalOpen: boolean;
  openManualModal: () => void;
  closeManualModal: () => void;
  addBookManually: (book: { title: string; author: string; edition?: string; status: 'reading' | 'completed' | 'want_to_read' }) => void;
  // Book details
  selectedDetailBook: Book | null;
  openBookDetail: (book: Book) => void;
  closeBookDetail: () => void;
  // Actions
  toggleCongratulate: (postId: string) => void;
  toggleInterested: (postId: string) => void;
  toggleWantToRead: (book: { title: string; author: string; coverUrl?: string; id?: string }) => void;
  removePendingBook: (bookId: string) => void;
  isSavedInPending: (titleOrId: string) => boolean;
  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Goal Modal & Management
  isGoalModalOpen: boolean;
  openGoalModal: () => void;
  closeGoalModal: () => void;
  updateMonthlyGoal: (newGoal: number) => void;
}

const LibritoContext = createContext<LibritoContextType | undefined>(undefined);

export const LibritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('librito_books');
    if (saved) {
      try {
        const parsed: Book[] = JSON.parse(saved);
        return parsed.map((b) => {
          const match = INITIAL_BOOKS.find((ib) => ib.id === b.id);
          if (match && match.coverUrl) {
            return { ...b, coverUrl: match.coverUrl };
          }
          return b;
        });
      } catch {
        return INITIAL_BOOKS;
      }
    }
    return INITIAL_BOOKS;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('librito_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_USER,
          ...parsed,
          monthlyBenefitUnlocked: parsed.monthlyBenefitUnlocked ?? (parsed.monthlyCompleted >= (parsed.monthlyGoal || INITIAL_USER.monthlyGoal)),
        };
      } catch {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER;
  });

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('librito_posts');
    if (saved) {
      try {
        const parsed: CommunityPost[] = JSON.parse(saved);
        return parsed.map((p) => {
          const match = INITIAL_POSTS.find((ip) => ip.id === p.id);
          if (match && match.book && match.book.coverUrl) {
            return { ...p, book: { ...p.book, coverUrl: match.book.coverUrl } };
          }
          return p;
        });
      } catch {
        return INITIAL_POSTS;
      }
    }
    return INITIAL_POSTS;
  });

  const [activeTab, setActiveTab] = useState<'feed' | 'explore' | 'library' | 'profile'>('feed');
  const [isRegisterFlowOpen, setIsRegisterFlowOpen] = useState(false);
  const [registerStep, setRegisterStep] = useState<1 | 2>(1);
  const [selectedBookForRegister, setSelectedBookForRegister] = useState<Book | null>(null);
  const [activeDraft, setActiveDraft] = useState<ReadingDraft | null>(null);
  const [drafts, setDrafts] = useState<ReadingDraft[]>(() => {
    const saved = localStorage.getItem('librito_drafts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'draft-ficciones',
        book: {
          id: 'ficciones-draft',
          title: 'Ficciones',
          author: 'Jorge Luis Borges',
          edition: 'Debolsillo Contemporánea',
          coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
          status: 'completed',
        },
        formData: {
          rating: 5,
          vibe: 'Desafiante',
          review: 'Laberintos, espejos y bibliotecas infinitas. La precisión geométrica de Borges nunca envejece.',
          quote: 'El universo (que otros llaman la Biblioteca) se compone de un número indefinido...',
          isFavorite: true,
          isRecommended: true,
          completedDate: '21 Oct 2026',
          tags: ['Filosofía', 'Clásico', 'Borges'],
          isPublic: true,
        },
        savedAt: 'Guardado el 21 de oct.',
      }
    ];
  });
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [selectedDetailBook, setSelectedDetailBook] = useState<Book | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openGoalModal = () => setIsGoalModalOpen(true);
  const closeGoalModal = () => setIsGoalModalOpen(false);

  const updateMonthlyGoal = (newGoal: number) => {
    const clampedGoal = Math.max(1, Math.min(20, Math.round(newGoal)));
    setUser((prev) => {
      // Opción A: si ya estaba desbloqueado o los libros completados alcanzan la nueva meta
      const isBenefitUnlocked = prev.monthlyBenefitUnlocked || prev.monthlyCompleted >= clampedGoal;
      return {
        ...prev,
        monthlyGoal: clampedGoal,
        monthlyBenefitUnlocked: isBenefitUnlocked,
      };
    });
    showToast(`Objetivo mensual fijado en ${clampedGoal} ${clampedGoal === 1 ? 'libro' : 'libros'} 🎯`);
    setIsGoalModalOpen(false);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('librito_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('librito_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('librito_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('librito_drafts', JSON.stringify(drafts));
  }, [drafts]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const currentReadingBook = books.find((b) => b.status === 'reading');

  const startRegistration = (book?: Book) => {
    if (book) {
      setSelectedBookForRegister(book);
      setRegisterStep(2);
    } else {
      // Default to current reading if exists
      setSelectedBookForRegister(currentReadingBook || books[0]);
      setRegisterStep(1);
    }
    setIsRegisterFlowOpen(true);
  };

  const selectBookForStep2 = (book: Book) => {
    setSelectedBookForRegister(book);
    setRegisterStep(2);
  };

  const goToStep1 = () => {
    setRegisterStep(1);
  };

  const closeRegisterFlow = () => {
    setIsRegisterFlowOpen(false);
    setRegisterStep(1);
  };

  const saveRegisteredBook = (formData: RegisterFormData) => {
    if (!selectedBookForRegister) return;

    const bookToSave = selectedBookForRegister;
    const updatedBook: Book = {
      ...bookToSave,
      status: 'completed',
      rating: formData.rating,
      vibe: formData.vibe,
      review: formData.review,
      quote: formData.quote,
      isFavorite: formData.isFavorite,
      isRecommended: formData.isRecommended,
      completedDate: formData.completedDate,
      tags: formData.tags,
      isPublic: formData.isPublic,
    };

    setBooks((prev) => {
      const exists = prev.some((b) => b.id === bookToSave.id);
      if (exists) {
        return prev.map((b) => (b.id === bookToSave.id ? updatedBook : b));
      }
      return [updatedBook, ...prev];
    });

    // Update user stats: +75 points, streak, +1 completed book
    const newMonthlyCompleted = user.monthlyCompleted + 1;
    const isBenefitNowUnlocked = user.monthlyBenefitUnlocked || newMonthlyCompleted >= user.monthlyGoal;
    setUser((prev) => ({
      ...prev,
      points: prev.points + 75,
      activeStreakDays: prev.activeStreakDays + 1,
      monthlyCompleted: newMonthlyCompleted,
      totalBooksRead: prev.totalBooksRead + 1,
      monthlyBenefitUnlocked: isBenefitNowUnlocked,
    }));

    // Add community post if public
    if (formData.isPublic) {
      const newPost: CommunityPost = {
        id: `post-${Date.now()}`,
        author: {
          name: user.name,
          avatarUrl: user.avatarUrl,
          badge: 'Templo Lector',
          isFriend: true,
        },
        book: {
          id: updatedBook.id,
          title: updatedBook.title,
          author: updatedBook.author,
          coverUrl: updatedBook.coverUrl,
          edition: updatedBook.edition,
        },
        actionType: 'completed',
        timestamp: 'Hace un instante',
        rating: updatedBook.rating,
        vibe: updatedBook.vibe,
        quote: updatedBook.quote,
        review: updatedBook.review,
        congratulationsCount: 1,
        userCongratulated: false,
        interestedCount: 0,
        userInterested: false,
        commentsCount: 0,
      };
      setPosts((prev) => [newPost, ...prev]);
    }

    // Remove from drafts if present
    setDrafts((prev) => prev.filter((d) => d.book.id !== updatedBook.id));
    setActiveDraft(null);

    closeRegisterFlow();
    if (!user.monthlyBenefitUnlocked && newMonthlyCompleted >= user.monthlyGoal) {
      showToast(`«¡Meta mensual alcanzada!» — Sumaste tu beneficio del mes: 15% en librerías asociadas 🎟️`);
    } else if (isBenefitNowUnlocked) {
      showToast(`«Libro guardado en tu biblioteca» — Sumaste a tu historial; tu recompensa de octubre está lista 🔖`);
    } else {
      const remaining = user.monthlyGoal - newMonthlyCompleted;
      showToast(`«Lectura registrada» — Llevas ${newMonthlyCompleted} de ${user.monthlyGoal}. ¡Falta ${remaining} para tu beneficio! 📖`);
    }
  };

  const saveDraft = (formData: RegisterFormData) => {
    if (!selectedBookForRegister) return;
    const now = new Date();
    const formattedDate = `Guardado ${now.getDate()} de ${now.toLocaleString('es-ES', { month: 'short' })}`;

    const newDraft: ReadingDraft = {
      id: activeDraft?.id || `draft-${Date.now()}`,
      book: selectedBookForRegister,
      formData,
      savedAt: formattedDate,
    };

    setDrafts((prev) => {
      const filtered = prev.filter((d) => d.book.id !== selectedBookForRegister.id && d.id !== newDraft.id);
      return [newDraft, ...filtered];
    });

    closeRegisterFlow();
    showToast(`Borrador guardado: «${selectedBookForRegister.title}» en tu biblioteca 📝`);
  };

  const resumeDraft = (draft: ReadingDraft) => {
    setSelectedBookForRegister(draft.book);
    setActiveDraft(draft);
    setRegisterStep(2);
    setIsRegisterFlowOpen(true);
  };

  const deleteDraft = (draftId: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== draftId));
    if (activeDraft?.id === draftId) {
      setActiveDraft(null);
    }
    showToast('Borrador eliminado 🗑️');
  };

  const openBarcodeModal = () => setIsBarcodeModalOpen(true);
  const closeBarcodeModal = () => setIsBarcodeModalOpen(false);

  const openManualModal = () => setIsManualModalOpen(true);
  const closeManualModal = () => setIsManualModalOpen(false);

  const addBookManually = (newBookData: {
    title: string;
    author: string;
    edition?: string;
    status: 'reading' | 'completed' | 'want_to_read';
  }) => {
    const newBook: Book = {
      id: `manual-${Date.now()}`,
      title: newBookData.title,
      author: newBookData.author,
      edition: newBookData.edition || 'Edición personalizada',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
      status: newBookData.status,
      tags: ['Personal'],
    };

    setBooks((prev) => [newBook, ...prev]);
    closeManualModal();

    if (newBookData.status === 'completed') {
      selectBookForStep2(newBook);
      setIsRegisterFlowOpen(true);
    } else {
      showToast(`«${newBook.title}» añadido a tu biblioteca.`);
    }
  };

  const openBookDetail = (book: Book) => setSelectedDetailBook(book);
  const closeBookDetail = () => setSelectedDetailBook(null);

  const toggleCongratulate = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const was = post.userCongratulated;
          return {
            ...post,
            userCongratulated: !was,
            congratulationsCount: was ? post.congratulationsCount - 1 : post.congratulationsCount + 1,
          };
        }
        return post;
      })
    );
  };

  const toggleInterested = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const was = post.userInterested;
          return {
            ...post,
            userInterested: !was,
            interestedCount: was ? post.interestedCount - 1 : post.interestedCount + 1,
          };
        }
        return post;
      })
    );
  };

  const toggleWantToRead = (bookInfo: { title: string; author: string; coverUrl?: string; id?: string }) => {
    const existing = books.find(
      (b) => (bookInfo.id && b.id === bookInfo.id) ||
             b.title.toLowerCase().trim() === bookInfo.title.toLowerCase().trim()
    );

    if (existing) {
      if (existing.status === 'want_to_read') {
        // Toggle off: remove from pending
        setBooks((prev) => prev.filter((b) => b.id !== existing.id));
        showToast(`«${bookInfo.title}» quitado de tus pendientes.`);
        return;
      } else {
        showToast(`«${bookInfo.title}» ya figura como leído en tu biblioteca.`);
        return;
      }
    }

    const newBook: Book = {
      id: bookInfo.id || `want-${Date.now()}`,
      title: bookInfo.title,
      author: bookInfo.author,
      coverUrl: bookInfo.coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
      status: 'want_to_read',
      tags: ['Pendiente'],
    };

    setBooks((prev) => [newBook, ...prev]);
    showToast(`«${bookInfo.title}» guardado en tus pendientes 🔖`);
  };

  const removePendingBook = (bookId: string) => {
    const target = books.find((b) => b.id === bookId);
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    if (target) {
      showToast(`«${target.title}» eliminado de pendientes 🗑️`);
    } else {
      showToast('Libro eliminado de pendientes 🗑️');
    }
  };

  const isSavedInPending = (titleOrId: string): boolean => {
    return books.some(
      (b) => b.status === 'want_to_read' &&
        (b.id === titleOrId || b.title.toLowerCase().trim() === titleOrId.toLowerCase().trim())
    );
  };

  return (
    <LibritoContext.Provider
      value={{
        books,
        user,
        posts,
        currentReadingBook,
        activeTab,
        setActiveTab,
        isRegisterFlowOpen,
        registerStep,
        selectedBookForRegister,
        activeDraft,
        drafts,
        startRegistration,
        selectBookForStep2,
        goToStep1,
        closeRegisterFlow,
        saveRegisteredBook,
        saveDraft,
        resumeDraft,
        deleteDraft,
        isBarcodeModalOpen,
        openBarcodeModal,
        closeBarcodeModal,
        isManualModalOpen,
        openManualModal,
        closeManualModal,
        addBookManually,
        selectedDetailBook,
        openBookDetail,
        closeBookDetail,
        toggleCongratulate,
        toggleInterested,
        toggleWantToRead,
        removePendingBook,
        isSavedInPending,
        toastMessage,
        showToast,
        isGoalModalOpen,
        openGoalModal,
        closeGoalModal,
        updateMonthlyGoal,
      }}
    >
      {children}
    </LibritoContext.Provider>
  );
};

export const useLibrito = () => {
  const context = useContext(LibritoContext);
  if (!context) {
    throw new Error('useLibrito must be used within a LibritoProvider');
  }
  return context;
};
