import { Movie, Genre, Person } from "@/types/movie";

const API_URL = "https://neo4j-movies-api-production.up.railway.app";

interface Neo4jMovie {
  id: string;
  title: string;
  originalTitle?: string;
  tagline?: string;
  year?: string; // "1995-11-22" format
  duration?: number;
  rating?: number;
  synopsis?: string;
  poster?: string;
  backdrop?: string;
  budget?: number;
  revenue?: number;
  releaseDate?: string;
  language?: string;
  genres?: Array<{ id: string; name: string }>;
  director?: { id: string; name: string };
  actors?: Array<{ id: string; name: string; role?: string; photo?: string }>;
  trailerUrl?: string | null;
}

function mapNeo4jToMovie(neo4jMovie: Neo4jMovie): Movie {
  // Extract year from date string like "1995-11-22"
  const yearFromDate = neo4jMovie.year ? parseInt(neo4jMovie.year.split("-")[0]) : new Date().getFullYear();
  
  return {
    id: neo4jMovie.id || String(Math.random()),
    title: neo4jMovie.title || "Sans titre",
    originalTitle: neo4jMovie.originalTitle || neo4jMovie.title,
    poster: neo4jMovie.poster || "https://via.placeholder.com/500x750?text=No+Poster",
    backdrop: neo4jMovie.backdrop || neo4jMovie.poster || "https://via.placeholder.com/1920x1080?text=No+Backdrop",
    year: yearFromDate,
    duration: neo4jMovie.duration || 0,
    rating: neo4jMovie.rating || 0,
    synopsis: neo4jMovie.synopsis || "Aucun synopsis disponible.",
    genres: (neo4jMovie.genres || []).map((g) => ({
      id: g.id || g.name.toLowerCase().replace(/\s/g, "-"),
      name: g.name,
      slug: g.name.toLowerCase().replace(/\s/g, "-"),
    })),
    director: neo4jMovie.director || { id: "unknown", name: "Inconnu" },
    actors: (neo4jMovie.actors || []).map((a) => ({
      id: a.id || String(Math.random()),
      name: a.name,
      role: a.role,
      photo: a.photo,
    })),
    trailerUrl: neo4jMovie.trailerUrl || undefined,
    budget: neo4jMovie.budget,
    revenue: neo4jMovie.revenue,
    releaseDate: neo4jMovie.releaseDate || neo4jMovie.year || "",
    language: neo4jMovie.language || "en",
    tagline: neo4jMovie.tagline,
  };
}

export async function fetchMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_URL}/api/movies`);
    if (!response.ok) throw new Error("Failed to fetch movies");
    const data: Neo4jMovie[] = await response.json();
    return data.map(mapNeo4jToMovie);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function fetchMovieById(id: string): Promise<Movie | null> {
  try {
    const response = await fetch(`${API_URL}/api/movies/${id}`);
    if (!response.ok) throw new Error("Failed to fetch movie");
    const data: Neo4jMovie = await response.json();
    return mapNeo4jToMovie(data);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Failed to search movies");
    const data: Neo4jMovie[] = await response.json();
    return data.map(mapNeo4jToMovie);
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}

export async function fetchRecommendations(title: string): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_URL}/api/recommendations/${encodeURIComponent(title)}`);
    if (!response.ok) throw new Error("Failed to fetch recommendations");
    const data: Neo4jMovie[] = await response.json();
    return data.map(mapNeo4jToMovie);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}

export async function fetchMoviesByGenre(genre: string): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_URL}/api/movies/genre/${encodeURIComponent(genre)}`);
    if (!response.ok) throw new Error("Failed to fetch movies by genre");
    const data: Neo4jMovie[] = await response.json();
    return data.map(mapNeo4jToMovie);
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
}

export async function fetchGenres(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/api/genres`);
    if (!response.ok) throw new Error("Failed to fetch genres");
    const data: string[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}
