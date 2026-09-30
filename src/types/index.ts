export type BookStatus = 'reading' | 'completed' | 'want_to_read';

export type BookVibe = 'Inolvidable' | 'Reflexivo' | 'Reconfortante' | 'Desafiante' | 'Melancólico' | 'Poético';

export interface Book {
  id: string;
  title: string;
  author: string;
  edition?: string;
  isbn?: string;
  coverUrl: string;
  status: BookStatus;
  rating?: number; // 1 to 5
  vibe?: BookVibe;
  review?: string;
  quote?: string;
  isFavorite?: boolean;
  isRecommended?: boolean;
  completedDate?: string;
  tags?: string[];
  isPublic?: boolean;
  notesCount?: number;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatarUrl: string;
  points: number;
  activeStreakDays: number;
  monthlyCompleted: number;
  monthlyGoal: number;
  monthlyBenefitUnlocked?: boolean;
  totalBooksRead: number;
  sanctuaryLevel: string;
  bio: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    badge?: string;
    isFriend: boolean;
  };
  book: {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    edition?: string;
  };
  actionType: 'completed' | 'quote' | 'milestone' | 'started';
  timestamp: string;
  rating?: number;
  vibe?: BookVibe;
  quote?: string;
  review?: string;
  milestoneTitle?: string;
  congratulationsCount: number;
  userCongratulated: boolean;
  interestedCount: number;
  userInterested: boolean;
  commentsCount: number;
}

export interface RegisterFormData {
  rating: number;
  vibe: BookVibe;
  review: string;
  quote: string;
  isFavorite: boolean;
  isRecommended: boolean;
  completedDate: string;
  tags: string[];
  isPublic: boolean;
}

export interface ReadingDraft {
  id: string;
  book: Book;
  formData: RegisterFormData;
  savedAt: string;
}
