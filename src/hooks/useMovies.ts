import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchMovies,
  fetchMovieById,
  searchMovies,
  fetchRecommendations,
  fetchMoviesByGenre,
  fetchGenres,
  fetchTrendingMovies,
} from "@/services/api";

// Paginated movies with infinite scroll support
export function useMovies(limit: number = 50) {
  return useInfiniteQuery({
    queryKey: ["movies", limit],
    queryFn: ({ pageParam = 1 }) => fetchMovies(pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (lastPage.page === null) return undefined;
      const hasMore = lastPage.page * lastPage.limit < lastPage.total;
      return hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
}

// Simple paginated fetch for a specific page
export function useMoviesPage(page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: ["movies", "page", page, limit],
    queryFn: () => fetchMovies(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

// Trending movies (no pagination)
export function useTrendingMovies() {
  return useQuery({
    queryKey: ["movies", "trending"],
    queryFn: fetchTrendingMovies,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMovie(id: string) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
    enabled: !!id,
  });
}

// Paginated search with infinite scroll
export function useSearchMovies(query: string, limit: number = 50) {
  return useInfiniteQuery({
    queryKey: ["search", query, limit],
    queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (lastPage.page === null) return undefined;
      const hasMore = lastPage.page * lastPage.limit < lastPage.total;
      return hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000,
  });
}

// Simple search for a specific page
export function useSearchMoviesPage(query: string, page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: ["search", "page", query, page, limit],
    queryFn: () => searchMovies(query, page, limit),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000,
  });
}

export function useRecommendations(movieId: string) {
  return useQuery({
    queryKey: ["recommendations", movieId],
    queryFn: () => fetchRecommendations(movieId),
    enabled: !!movieId,
  });
}

// Paginated movies by genre
export function useMoviesByGenre(genreSlug: string, limit: number = 50) {
  return useInfiniteQuery({
    queryKey: ["movies", "genre", genreSlug, limit],
    queryFn: ({ pageParam = 1 }) => fetchMoviesByGenre(genreSlug, pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (lastPage.page === null) return undefined;
      const hasMore = lastPage.page * lastPage.limit < lastPage.total;
      return hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!genreSlug,
    staleTime: 5 * 60 * 1000,
  });
}

// Simple genre fetch for a specific page
export function useMoviesByGenrePage(genreSlug: string, page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: ["movies", "genre", "page", genreSlug, page, limit],
    queryFn: () => fetchMoviesByGenre(genreSlug, page, limit),
    enabled: !!genreSlug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 10 * 60 * 1000,
  });
}
