import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryCard } from '@/components/product/CategoryCard';
import { Button } from '@/components/ui/button';
import { useFeaturedProducts, useCategories } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

export default function Index() {
  const { data: featuredProducts, isLoading: loadingProducts } = useFeaturedProducts();
  const { data: categories, isLoading: loadingCategories } = useCategories();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative px-4 pt-6 pb-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent to-secondary p-6 md:p-10">
          <div className="relative z-10 max-w-xs">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4 animate-fade-up">
              New Season
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3 animate-fade-up stagger-1">
              Curated for You
            </h2>
            <p className="text-sm text-muted-foreground mb-6 animate-fade-up stagger-2">
              Discover thoughtfully selected pieces for your everyday life.
            </p>
            <Link to="/products">
              <Button className="btn-primary animate-fade-up stagger-3">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-4 right-8 w-24 h-24 bg-accent rounded-full blur-2xl" />
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">Categories</h2>
          <Link to="/products" className="text-sm text-primary font-medium hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {loadingCategories ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
            ))
          ) : (
            categories?.slice(0, 4).map((category, index) => (
              <CategoryCard
                key={category.id}
                slug={category.slug}
                name={category.name}
                imageUrl={category.image_url || ''}
                className={`animate-fade-up stagger-${index + 1}`}
              />
            ))
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">Featured</h2>
          <Link to="/products" className="text-sm text-primary font-medium hover:underline">
            See All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {loadingProducts ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            featuredProducts?.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={Number(product.price)}
                imageUrl={product.image_url || ''}
                description={product.description || undefined}
                className={`animate-fade-up stagger-${index + 1}`}
              />
            ))
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="px-4 pb-8">
        <div className="relative overflow-hidden rounded-2xl bg-foreground p-6">
          <div className="relative z-10">
            <p className="text-xs text-muted uppercase tracking-wider mb-2">Limited Time</p>
            <h3 className="font-display text-xl text-card mb-2">Free Shipping</h3>
            <p className="text-sm text-muted mb-4">On orders over $50</p>
            <Link to="/products">
              <Button variant="secondary" size="sm" className="font-medium">
                Shop Now
              </Button>
            </Link>
          </div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
        </div>
      </section>
    </Layout>
  );
}