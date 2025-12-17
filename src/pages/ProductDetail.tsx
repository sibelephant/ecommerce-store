import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/hooks/useProducts';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  const { data: product, isLoading } = useProduct(id || '');
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        imageUrl: product.image_url || '',
      });
    }
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} has been added to your cart`,
    });
  };

  if (isLoading) {
    return (
      <Layout hideNav>
        <div className="px-4 py-6">
          <Skeleton className="aspect-square rounded-3xl mb-6" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/4 mb-4" />
          <Skeleton className="h-20 w-full" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
      </Layout>
    );
  }

  const categoryInfo = product.categories as { slug: string; name: string } | null;

  return (
    <Layout hideNav>
      {/* Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16 bg-background/80 backdrop-blur-xl">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4 pt-2 pb-32">
        {/* Product Image */}
        <div className="aspect-square rounded-3xl overflow-hidden bg-muted mb-6 animate-scale-up">
          <img
            src={product.image_url || ''}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="animate-fade-up">
          {categoryInfo && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full mb-3">
              {categoryInfo.name}
            </span>
          )}
          
          <h1 className="font-display text-2xl font-semibold text-foreground mb-2">
            {product.name}
          </h1>
          
          <p className="text-2xl font-bold text-foreground mb-4">
            ${Number(product.price).toFixed(2)}
          </p>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            {product.description || 'No description available.'}
          </p>

          {/* Stock Info */}
          <div className="flex items-center gap-2 mb-6">
            <span className={`w-2 h-2 rounded-full ${product.stock_quantity > 0 ? 'bg-success' : 'bg-destructive'}`} />
            <span className="text-sm text-muted-foreground">
              {product.stock_quantity > 0 
                ? `${product.stock_quantity} in stock`
                : 'Out of stock'
              }
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-foreground">Quantity</span>
            <div className="flex items-center gap-3 bg-muted rounded-full p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-card"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-card"
                onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-xl border-t border-border/50 mobile-safe-bottom animate-slide-in-bottom">
        <Button
          className="w-full h-14 text-base font-semibold btn-primary"
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          Add to Cart · ${(Number(product.price) * quantity).toFixed(2)}
        </Button>
      </div>
    </Layout>
  );
}
