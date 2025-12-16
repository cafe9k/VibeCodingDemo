-- 创建航班表
CREATE TABLE IF NOT EXISTS flights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    flight_number TEXT NOT NULL,
    airline TEXT NOT NULL,
    departure_city TEXT NOT NULL,
    arrival_city TEXT NOT NULL,
    departure_airport TEXT NOT NULL,
    arrival_airport TEXT NOT NULL,
    departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
    arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    aircraft_type TEXT,
    available_seats INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建酒店表
CREATE TABLE IF NOT EXISTS hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT,
    star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
    rating_score DECIMAL(3, 1) CHECK (rating_score >= 0 AND rating_score <= 10),
    price_start DECIMAL(10, 2) NOT NULL,
    images JSONB,
    facilities TEXT[],
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建房型表
CREATE TABLE IF NOT EXISTS hotel_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    room_type TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    max_guests INTEGER DEFAULT 2,
    available_rooms INTEGER DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建火车票表
CREATE TABLE IF NOT EXISTS trains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    train_number TEXT NOT NULL,
    train_type TEXT NOT NULL,
    departure_station TEXT NOT NULL,
    arrival_station TEXT NOT NULL,
    departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
    arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTEGER NOT NULL,
    seats JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建订单表
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    order_type TEXT NOT NULL CHECK (order_type IN ('flight', 'hotel', 'train')),
    order_data JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'completed', 'cancelled')),
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_flights_departure ON flights(departure_city, arrival_city, departure_time);
CREATE INDEX IF NOT EXISTS idx_hotels_city ON hotels(city);
CREATE INDEX IF NOT EXISTS idx_trains_departure ON trains(departure_station, arrival_station, departure_time);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hotel_rooms_hotel ON hotel_rooms(hotel_id);

-- 启用 RLS (Row Level Security)
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE trains ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略

-- 航班表：所有人可以查看
CREATE POLICY "所有人可查看航班" ON flights FOR SELECT USING (true);

-- 酒店表：所有人可以查看
CREATE POLICY "所有人可查看酒店" ON hotels FOR SELECT USING (true);

-- 房型表：所有人可以查看
CREATE POLICY "所有人可查看房型" ON hotel_rooms FOR SELECT USING (true);

-- 火车票表：所有人可以查看
CREATE POLICY "所有人可查看车次" ON trains FOR SELECT USING (true);

-- 订单表：用户只能查看和创建自己的订单
CREATE POLICY "用户可查看自己的订单" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "用户可创建自己的订单" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "用户可更新自己的订单" ON orders FOR UPDATE USING (auth.uid() = user_id);

