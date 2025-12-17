-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Categories are publicly readable
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Products are publicly readable
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);

-- Cart items policies
CREATE POLICY "Users can view their own cart items" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own cart items" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cart items" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cart items" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view their own order items" ON public.order_items FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Insert sample categories
INSERT INTO public.categories (name, slug, image_url) VALUES
('Clothing', 'clothing', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400'),
('Electronics', 'electronics', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
('Home & Living', 'home-living', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400'),
('Accessories', 'accessories', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400');

-- Insert sample products
INSERT INTO public.products (name, description, price, image_url, category_id, stock_quantity, is_featured) VALUES
('Premium Cotton Tee', 'Soft organic cotton t-shirt in minimalist design', 49.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', (SELECT id FROM categories WHERE slug = 'clothing'), 50, true),
('Wireless Earbuds Pro', 'Crystal clear audio with active noise cancellation', 149.00, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', (SELECT id FROM categories WHERE slug = 'electronics'), 30, true),
('Ceramic Vase Set', 'Handcrafted minimalist ceramic vases', 89.00, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400', (SELECT id FROM categories WHERE slug = 'home-living'), 25, true),
('Leather Watch', 'Classic timepiece with genuine leather strap', 199.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', (SELECT id FROM categories WHERE slug = 'accessories'), 20, true),
('Linen Shirt', 'Breathable summer linen in natural tones', 79.00, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', (SELECT id FROM categories WHERE slug = 'clothing'), 40, false),
('Smart Speaker', 'Voice-controlled speaker with premium sound', 129.00, 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400', (SELECT id FROM categories WHERE slug = 'electronics'), 35, false),
('Scented Candle Set', 'Artisan soy candles in amber and cedar', 45.00, 'https://images.unsplash.com/photo-1602607753754-7b32cbb41dfe?w=400', (SELECT id FROM categories WHERE slug = 'home-living'), 60, false),
('Minimalist Wallet', 'Slim cardholder in premium leather', 69.00, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', (SELECT id FROM categories WHERE slug = 'accessories'), 45, false);