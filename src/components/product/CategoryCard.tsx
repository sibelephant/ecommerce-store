import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  slug: string;
  name: string;
  imageUrl: string;
  className?: string;
}

export function CategoryCard({
  slug,
  name,
  imageUrl,
  className,
}: CategoryCardProps) {
  return (
    <Link
      to={`/products?category=${slug}`}
      className={cn("relative block overflow-hidden rounded-2xl", className)}
    >
      <div className="aspect-[4/5] w-full bg-muted">
        <img
          src={imageUrl || "https://placehold.co/400x500?text=Category"}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <span className="absolute bottom-3 left-3 text-sm font-semibold text-white drop-shadow">
        {name}
      </span>
    </Link>
  );
}
