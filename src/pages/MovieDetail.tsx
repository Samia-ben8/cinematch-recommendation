import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MovieCarousel } from "@/components/MovieCarousel";
import { getMovieById, movies } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Star, Clock, Calendar, DollarSign } from "lucide-react";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const movie = getMovieById(id || "");

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Film non trouvé</h1>
          <Button asChild><Link to="/">Retour à l'accueil</Link></Button>
        </div>
      </div>
    );
  }

  const similarMovies = movies.filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.some((mg) => mg.id === g.id))).slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <img src={movie.backdrop} alt={movie.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        
        <Link to="/" className="absolute top-20 left-4 md:left-12 z-10">
          <Button variant="ghost" size="sm" className="gap-2"><ArrowLeft className="h-4 w-4" />Retour</Button>
        </Link>
      </div>

      {/* Content */}
      <div className="relative -mt-48 z-10 px-4 md:px-12 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={movie.poster} alt={movie.title} className="w-48 md:w-64 rounded-lg shadow-2xl hidden md:block" />
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
            {movie.tagline && <p className="text-primary mb-4 italic">"{movie.tagline}"</p>}
            
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 text-yellow-500"><Star className="h-4 w-4 fill-current" />{movie.rating}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{movie.year}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{movie.duration} min</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((g) => <span key={g.id} className="px-3 py-1 bg-secondary rounded-full text-xs">{g.name}</span>)}
            </div>

            <p className="text-muted-foreground mb-6 max-w-3xl">{movie.synopsis}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
              <div><span className="text-muted-foreground">Réalisateur</span><p className="font-medium">{movie.director.name}</p></div>
              {movie.budget && <div><span className="text-muted-foreground">Budget</span><p className="font-medium">${(movie.budget / 1000000).toFixed(0)}M</p></div>}
              {movie.revenue && <div><span className="text-muted-foreground">Revenus</span><p className="font-medium">${(movie.revenue / 1000000).toFixed(0)}M</p></div>}
              <div><span className="text-muted-foreground">Langue</span><p className="font-medium uppercase">{movie.language}</p></div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Acteurs principaux</h3>
              <div className="flex flex-wrap gap-2">
                {movie.actors.map((a) => <span key={a.id} className="px-3 py-1 bg-card rounded text-sm">{a.name}</span>)}
              </div>
            </div>

            {movie.trailerUrl && (
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Bande-annonce</h3>
                <div className="aspect-video max-w-2xl rounded-lg overflow-hidden">
                  <iframe src={movie.trailerUrl} title="Trailer" className="w-full h-full" allowFullScreen />
                </div>
              </div>
            )}
          </div>
        </div>

        {similarMovies.length > 0 && <MovieCarousel title="Films similaires" movies={similarMovies} />}
      </div>
    </div>
  );
}
