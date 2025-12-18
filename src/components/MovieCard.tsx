import { Link } from "react-router-dom";
import { Movie } from "@/types/movie";
import { Play, Info, Star } from "lucide-react";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
  size?: "small" | "medium" | "large";
}

export function MovieCard({ movie, size = "medium" }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: "w-32 h-48",
    medium: "w-44 h-64",
    large: "w-56 h-80",
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`relative flex-shrink-0 ${sizeClasses[size]} group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full overflow-hidden rounded-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary/20">
        {/* Poster Image */}
        <img
          src={imageError ? "https://placehold.co/300x450/1a1a1a/666?text=No+Image" : movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hover Content */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
            {movie.title}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              {movie.rating.toFixed(1)}
            </span>
            <span>{movie.year}</span>
            <span>{movie.duration}min</span>
          </div>

          <div className="flex gap-2 mt-2">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors">
              <Play className="h-4 w-4 fill-current" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-foreground border border-border hover:bg-accent transition-colors">
              <Info className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-background/80 px-1.5 py-0.5 text-xs font-medium backdrop-blur-sm">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          {movie.rating.toFixed(1)}
        </div>
      </div>
    </Link>
  );
}
