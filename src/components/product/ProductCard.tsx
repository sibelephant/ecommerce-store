import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  description,
  className,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAdd = () => {
    addItem({ productId: id, name, price, imageUrl });
    toast({
      title: "Added to cart",
      description: `${name} added to your cart.`,
    });
  };

  return (
    <div className={cn("product-card space-y-3 p-3", className)}>
      <Link
        to={`/product/${id}`}
        className="block overflow-hidden rounded-xl bg-muted"
      >
        <img
          src={imageUrl || "https://placehold.co/400x400?text=Product"}
          alt={name}
          className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="space-y-1">
        <Link
          to={`/product/${id}`}
          className="font-medium text-foreground line-clamp-1"
        >
          {name}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {description || "Beautifully crafted item for everyday use."}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-semibold text-foreground">
            ${price.toFixed(2)}
          </span>
          <Button
            size="sm"
            className="rounded-full"
            onClick={handleAdd}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
