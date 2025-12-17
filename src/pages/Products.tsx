import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');
  
  const { data: products, isLoading: loadingProducts } = useProducts(categorySlug);
  const { data: categories } = useCategories();

  const handleCategoryChange = (slug: string | null) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Layout>
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">
              {categorySlug 
                ? categories?.find(c => c.slug === categorySlug)?.name || 'Products'
                : 'All Products'
              }
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {products?.length || 0} items
            </p>
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide -mx-4 px-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'rounded-full whitespace-nowrap px-4 flex-shrink-0 transition-all',
              !categorySlug 
                ? 'bg-foreground text-background hover:bg-foreground/90' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
            onClick={() => handleCategoryChange(null)}
          >
            All
          </Button>
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              className={cn(
                'rounded-full whitespace-nowrap px-4 flex-shrink-0 transition-all',
                categorySlug === category.slug
                  ? 'bg-foreground text-background hover:bg-foreground/90'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
              onClick={() => handleCategoryChange(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3">
          {loadingProducts ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : products?.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground">No products found</p>
            </div>
          ) : (
            products?.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={Number(product.price)}
                imageUrl={product.image_url || ''}
                description={product.description || undefined}
                className={`animate-fade-up stagger-${(index % 4) + 1}`}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
