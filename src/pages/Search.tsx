import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { searchMovies, movies } from "@/data/movies";
import { genres } from "@/data/genres";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const results = useMemo(() => {
    let filtered = query ? searchMovies(query) : movies;
    if (selectedGenre) {
      filtered = filtered.filter((m) => m.genres.some((g) => g.id === selectedGenre));
    }
    return filtered;
  }, [query, selectedGenre]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 px-4 md:px-12 pb-12">
        <h1 className="text-3xl font-bold mb-6">Explorer les films</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-xl">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un film, acteur, réalisateur..." className="bg-secondary" />
          <Button type="submit"><SearchIcon className="h-4 w-4" /></Button>
        </form>

        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant={selectedGenre === "" ? "default" : "secondary"} size="sm" onClick={() => setSelectedGenre("")}>Tous</Button>
          {genres.map((g) => (
            <Button key={g.id} variant={selectedGenre === g.id ? "default" : "secondary"} size="sm" onClick={() => setSelectedGenre(g.id)}>{g.name}</Button>
          ))}
        </div>

        <p className="text-muted-foreground mb-4">{results.length} film(s) trouvé(s)</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>

        {results.length === 0 && <p className="text-center text-muted-foreground py-12">Aucun film trouvé.</p>}
      </div>
    </div>
  );
}
