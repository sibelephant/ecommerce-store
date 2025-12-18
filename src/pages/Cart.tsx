import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export default function Cart() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="px-4 py-6 pb-48 md:pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">
              Cart
            </h1>
            <p className="text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to add items to your cart
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="btn-primary"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="md:grid md:grid-cols-3 md:gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-0 mb-6">
              <div className="space-y-0 mb-6">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`animate-fade-up stagger-${(index % 4) + 1}`}
                  >
                    <CartItem item={item} />
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>

            {/* Desktop Summary */}
            <div className="hidden md:block md:col-span-1">
              <div className="sticky top-24 p-6 bg-card rounded-xl border border-border/50 shadow-sm">
                <h2 className="font-display text-lg font-semibold mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-primary">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between pt-4 border-t border-border/50">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-lg text-foreground">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full h-12 btn-primary font-semibold"
                  onClick={() => navigate("/auth")}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Summary - Mobile Only */}
      {items.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-card/95 backdrop-blur-xl border-t border-border/50 animate-slide-in-bottom md:hidden">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-foreground">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-primary">
                Add ${(50 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="flex justify-between pt-2 border-t border-border/50">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-lg text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            className="w-full h-12 text-base font-semibold btn-primary"
            onClick={() => navigate("/auth")}
          >
            Checkout
          </Button>
        </div>
      )}
    </Layout>
  );
}
