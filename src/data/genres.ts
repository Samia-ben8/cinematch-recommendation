import { Genre } from "@/types/movie";

export const genres: Genre[] = [
  { id: "1", name: "Action", slug: "action" },
  { id: "2", name: "Comédie", slug: "comedie" },
  { id: "3", name: "Drame", slug: "drame" },
  { id: "4", name: "Science-Fiction", slug: "sci-fi" },
  { id: "5", name: "Thriller", slug: "thriller" },
  { id: "6", name: "Horreur", slug: "horreur" },
  { id: "7", name: "Romance", slug: "romance" },
  { id: "8", name: "Animation", slug: "animation" },
  { id: "9", name: "Aventure", slug: "aventure" },
  { id: "10", name: "Fantastique", slug: "fantastique" },
];

export const getGenreById = (id: string): Genre | undefined => {
  return genres.find((g) => g.id === id);
};

export const getGenreBySlug = (slug: string): Genre | undefined => {
  return genres.find((g) => g.slug === slug);
};
