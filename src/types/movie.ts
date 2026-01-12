export interface Person {
  id: string;
  name: string;
  photo?: string;
  role?: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  poster: string;
  backdrop: string;
  year: number;
  duration: number; // in minutes
  rating: number; // 0-10
  synopsis: string;
  genres: Genre[];
  director: Person;
  actors: Person[];
  trailerUrl?: string;
  budget?: number;
  revenue?: number;
  releaseDate: string;
  language: string;
  tagline?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  movies: Movie[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface PaginatedResponse<T> {
  page: number | null;
  limit: number;
  total: number;
  movies: T[];
}

export interface ApiGenre {
  id: string;
  name: string;
  slug: string;
}
