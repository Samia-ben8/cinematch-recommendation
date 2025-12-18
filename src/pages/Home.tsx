import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MovieCarousel } from "@/components/MovieCarousel";
import { movies, getTrendingMovies, getRecommendedMovies, getMoviesByGenre } from "@/data/movies";
import { genres } from "@/data/genres";

export default function Home() {
  const featuredMovie = movies[0];
  const trending = getTrendingMovies();
  const recommended = getRecommendedMovies();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection movie={featuredMovie} />
      <div className="-mt-32 relative z-10 pb-12">
        <MovieCarousel title="Tendances actuelles" movies={trending} />
        <MovieCarousel title="Recommandés pour vous" movies={recommended} />
        {genres.slice(0, 4).map((genre) => {
          const genreMovies = getMoviesByGenre(genre.id);
          if (genreMovies.length === 0) return null;
          return <MovieCarousel key={genre.id} title={genre.name} movies={genreMovies} />;
        })}
      </div>
    </div>
  );
}
