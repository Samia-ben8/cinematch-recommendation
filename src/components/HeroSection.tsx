import { Link } from "react-router-dom";
import { Movie } from "@/types/movie";
import { Play, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageError ? "https://placehold.co/1920x1080/1a1a1a/666?text=MovieFlix" : movie.backdrop}
          alt={movie.title}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-4 md:px-12">
        <div className="max-w-2xl animate-fade-in">
          {/* Tagline */}
          {movie.tagline && (
            <p className="mb-2 text-sm font-medium text-primary md:text-base">
              {movie.tagline}
            </p>
          )}

          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold text-foreground text-shadow md:text-6xl lg:text-7xl">
            {movie.title}
          </h1>

          {/* Meta Info */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground md:text-base">
            <span className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              {movie.rating.toFixed(1)}
            </span>
            <span>{movie.year}</span>
            <span>{movie.duration} min</span>
            <span className="rounded bg-secondary px-2 py-0.5 text-xs">
              {movie.genres[0]?.name}
            </span>
          </div>

          {/* Synopsis */}
          <p className="mb-6 line-clamp-3 text-sm text-muted-foreground md:text-base md:line-clamp-4">
            {movie.synopsis}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 gap-2"
            >
              <Link to={`/movie/${movie.id}`}>
                <Play className="h-5 w-5 fill-current" />
                Lecture
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2"
            >
              <Link to={`/movie/${movie.id}`}>
                <Info className="h-5 w-5" />
                Plus d'infos
              </Link>
            </Button>
          </div>

          {/* Director */}
          <p className="mt-4 text-sm text-muted-foreground">
            Réalisé par <span className="text-foreground">{movie.director.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
