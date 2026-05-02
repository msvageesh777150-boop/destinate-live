-- Run this in your Supabase SQL Editor

-- 1. Create Customers Table
CREATE TABLE public.Customers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create Orders Table
CREATE TABLE public.Orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.Customers(id),
    occasion TEXT,
    flavour TEXT,
    weight TEXT,
    eggless BOOLEAN DEFAULT false,
    message TEXT,
    image_url TEXT,
    delivery_date DATE,
    delivery_time TEXT,
    urgent BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Create Reviews Table
CREATE TABLE public.Reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Set Row Level Security (RLS) to be public for now or customize as needed
ALTER TABLE public.Customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.Orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.Reviews ENABLE ROW LEVEL SECURITY;

-- Create policies to allow inserts and reads (simplified for demo)
CREATE POLICY "Allow public insert to Customers" ON public.Customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read to Customers" ON public.Customers FOR SELECT USING (true);

CREATE POLICY "Allow public insert to Orders" ON public.Orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read to Orders" ON public.Orders FOR SELECT USING (true);

CREATE POLICY "Allow public insert to Reviews" ON public.Reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read to Reviews" ON public.Reviews FOR SELECT USING (true);

-- Also, remember to create a Storage bucket named 'cake-references' and make it public.
