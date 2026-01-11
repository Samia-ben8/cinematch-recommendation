import { useQuery } from "@tanstack/react-query";
import {
  fetchMovies,
  fetchMovieById,
  searchMovies,
  fetchRecommendations,
  fetchMoviesByGenre,
  fetchGenres,
} from "@/services/api";

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useMovie(id: string) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
    enabled: !!id,
  });
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000,
  });
}

export function useRecommendations(title: string) {
  return useQuery({
    queryKey: ["recommendations", title],
    queryFn: () => fetchRecommendations(title),
    enabled: !!title,
  });
}

export function useMoviesByGenre(genre: string) {
  return useQuery({
    queryKey: ["movies", "genre", genre],
    queryFn: () => fetchMoviesByGenre(genre),
    enabled: !!genre,
  });
}

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
