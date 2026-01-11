import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MovieCarousel } from "@/components/MovieCarousel";
import { useMovies, useGenres } from "@/hooks/useMovies";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: movies = [], isLoading: moviesLoading } = useMovies();
  const { data: genres = [] } = useGenres();

  const featuredMovie = movies[0];
  const trending = movies.slice(0, 10);
  const recommended = movies.slice(10, 20);

  if (moviesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 md:px-12">
          <Skeleton className="h-[60vh] w-full mb-8" />
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="flex gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-44 flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!featuredMovie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 md:px-12 text-center">
          <p className="text-muted-foreground">Aucun film disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection movie={featuredMovie} />
      <div className="-mt-32 relative z-10 pb-12">
        <MovieCarousel title="Tendances actuelles" movies={trending} />
        {recommended.length > 0 && (
          <MovieCarousel title="Recommandés pour vous" movies={recommended} />
        )}
        {genres.slice(0, 4).map((genre) => {
          const genreMovies = movies.filter((m) =>
            m.genres.some((g) => g.name.toLowerCase() === genre.toLowerCase())
          );
          if (genreMovies.length === 0) return null;
          return <MovieCarousel key={genre} title={genre} movies={genreMovies.slice(0, 10)} />;
        })}
      </div>
    </div>
  );
}
