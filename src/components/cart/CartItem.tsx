import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem as CartItemType } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleChange = (delta: number) => {
    const next = Math.max(1, item.quantity + delta);
    updateQuantity(item.productId, next);
  };

  return (
    <div className="flex gap-4 rounded-2xl bg-card p-4 shadow-sm">
      <div className="h-20 w-20 overflow-hidden rounded-xl bg-muted">
        <img
          src={item.imageUrl || "https://placehold.co/160x160?text=Item"}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 items-start justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground line-clamp-1">
            {item.name}
          </p>
          <p className="text-sm text-muted-foreground">
            ${item.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleChange(-1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleChange(1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-destructive"
          onClick={() => removeItem(item.productId)}
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
