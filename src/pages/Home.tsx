import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MovieCarousel } from "@/components/MovieCarousel";
import { useTrendingMovies, useMoviesPage, useGenres, useMoviesByGenrePage } from "@/hooks/useMovies";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: trendingData, isLoading: trendingLoading } = useTrendingMovies();
  const { data: catalogData, isLoading: catalogLoading } = useMoviesPage(1, 20);
  const { data: genres = [] } = useGenres();

  const trending = trendingData?.movies || [];
  const recommended = catalogData?.movies || [];
  const featuredMovie = trending[0] || recommended[0];

  const isLoading = trendingLoading || catalogLoading;

  if (isLoading) {
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
        {trending.length > 0 && (
          <MovieCarousel title="Tendances actuelles" movies={trending} />
        )}
        {recommended.length > 0 && (
          <MovieCarousel title="Recommandés pour vous" movies={recommended} />
        )}
        {genres.slice(0, 4).map((genre) => (
          <GenreCarousel key={genre.slug} genre={genre} />
        ))}
      </div>
    </div>
  );
}

// Separate component for genre carousels to handle individual loading
function GenreCarousel({ genre }: { genre: { name: string; slug: string } }) {
  const { data } = useMoviesByGenrePage(genre.slug, 1, 10);
  const movies = data?.movies || [];

  if (movies.length === 0) return null;

  return <MovieCarousel title={genre.name} movies={movies} />;
}
