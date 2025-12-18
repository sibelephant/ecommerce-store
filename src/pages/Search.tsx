import { Search as SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query.trim()) return [];

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(20);

      if (error) throw error;
      return data;
    },
    enabled: query.length > 0,
  });

  return (
    <Layout>
      <div className="px-4 py-6">
        {/* Search Input */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 h-12 rounded-xl bg-muted border-0 focus-visible:ring-primary"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            Cancel
          </Button>
        </div>

        {/* Results */}
        {!query && (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">Search for products by name</p>
          </div>
        )}

        {query && isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {query && !isLoading && results?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No results found for "{query}"
            </p>
          </div>
        )}

        {results && results.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {results.length} result{results.length !== 1 ? "s" : ""} for "
              {query}"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {results.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={Number(product.price)}
                  imageUrl={product.image_url || ""}
                  description={product.description || undefined}
                  className={`animate-fade-up stagger-${(index % 4) + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
