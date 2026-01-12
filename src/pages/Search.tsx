import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { useMoviesPage, useGenres, useSearchMoviesPage, useMoviesByGenrePage } from "@/hooks/useMovies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search as SearchIcon, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 24;

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: genres = [] } = useGenres();

  // Determine which data source to use
  const isSearching = query.length > 0;
  const isFilteringByGenre = selectedGenre.length > 0;

  // Fetch data based on current filters
  const { data: catalogData, isLoading: catalogLoading } = useMoviesPage(
    currentPage,
    ITEMS_PER_PAGE
  );

  const { data: searchData, isLoading: searchLoading } = useSearchMoviesPage(
    query,
    currentPage,
    ITEMS_PER_PAGE
  );

  const { data: genreData, isLoading: genreLoading } = useMoviesByGenrePage(
    selectedGenre,
    currentPage,
    ITEMS_PER_PAGE
  );

  // Determine active data source
  const activeData = useMemo(() => {
    if (isSearching) return searchData;
    if (isFilteringByGenre) return genreData;
    return catalogData;
  }, [isSearching, isFilteringByGenre, searchData, genreData, catalogData]);

  const isLoading = isSearching ? searchLoading : isFilteringByGenre ? genreLoading : catalogLoading;
  
  const movies = activeData?.movies || [];
  const total = activeData?.total || 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    setCurrentPage(1);
    setSelectedGenre("");
  };

  const handleGenreChange = (genreSlug: string) => {
    setSelectedGenre(genreSlug);
    setQuery("");
    setSearchParams({});
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 px-4 md:px-12 pb-12">
        <h1 className="text-3xl font-bold mb-6">Explorer les films</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-xl">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un film, acteur, réalisateur..."
            className="bg-secondary"
          />
          <Button type="submit"><SearchIcon className="h-4 w-4" /></Button>
        </form>

        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedGenre === "" && !isSearching ? "default" : "secondary"}
            size="sm"
            onClick={() => handleGenreChange("")}
          >
            Tous
          </Button>
          {genres.map((g) => (
            <Button
              key={g.slug}
              variant={selectedGenre === g.slug ? "default" : "secondary"}
              size="sm"
              onClick={() => handleGenreChange(g.slug)}
            >
              {g.name}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-4">
              {total} film(s) trouvé(s)
              {totalPages > 1 && ` • Page ${currentPage} sur ${totalPages}`}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>

            {movies.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Aucun film trouvé.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>
                
                <div className="flex items-center gap-1">
                  {generatePaginationNumbers(currentPage, totalPages).map((pageNum, idx) => (
                    pageNum === "..." ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">...</span>
                    ) : (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum as number)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    )
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Helper function to generate pagination numbers with ellipsis
function generatePaginationNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", total);
  } else if (current >= total - 3) {
    pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }

  return pages;
}
