-- 这是示例种子数据文件
-- 在 Supabase SQL Editor 中运行 mockData.js 生成的 SQL 来填充数据
-- 或者使用以下示例数据快速开始

-- 示例航班数据
INSERT INTO flights (flight_number, airline, departure_city, arrival_city, departure_airport, arrival_airport, departure_time, arrival_time, price, aircraft_type, available_seats) VALUES
('CA1234', '中国国航', '北京', '上海', 'PEK', 'PVG', '2024-12-20 08:00:00+00', '2024-12-20 10:30:00+00', 650, 'A320', 120),
('MU5678', '东方航空', '上海', '广州', 'PVG', 'CAN', '2024-12-20 09:00:00+00', '2024-12-20 11:45:00+00', 780, 'B737', 150),
('CZ9012', '南方航空', '广州', '深圳', 'CAN', 'SZX', '2024-12-20 14:00:00+00', '2024-12-20 15:10:00+00', 350, 'A321', 180);

-- 示例酒店数据
INSERT INTO hotels (name, city, address, star_rating, rating_score, price_start, facilities, description) VALUES
('北京香格里拉大酒店', '北京', '北京市朝阳区建国门外大街1号', 5, 9.2, 899, ARRAY['免费WiFi', '停车场', '健身房', '游泳池', '餐厅'], '位于市中心的豪华五星级酒店'),
('上海万豪酒店', '上海', '上海市浦东新区世纪大道88号', 5, 9.0, 799, ARRAY['免费WiFi', '停车场', '健身房', '商务中心'], '现代化商务酒店，交通便利'),
('广州白天鹅宾馆', '广州', '广州市越秀区中山一路368号', 4, 8.5, 499, ARRAY['免费WiFi', '停车场', '餐厅'], '老牌四星级酒店，服务优质');

-- 示例房型数据（需要先获取hotel_id）
-- 这里使用 DO 块来动态插入
DO $$
DECLARE
    hotel_id UUID;
BEGIN
    -- 为每个酒店添加房型
    FOR hotel_id IN SELECT id FROM hotels LIMIT 3 LOOP
        INSERT INTO hotel_rooms (hotel_id, room_type, price, max_guests, available_rooms) VALUES
        (hotel_id, '标准间', 299, 2, 10),
        (hotel_id, '大床房', 399, 2, 8),
        (hotel_id, '豪华套房', 699, 3, 5);
    END LOOP;
END $$;

-- 示例火车票数据
INSERT INTO trains (train_number, train_type, departure_station, arrival_station, departure_time, arrival_time, duration, seats) VALUES
('G1', 'G', '北京', '上海', '2024-12-20 08:00:00+00', '2024-12-20 12:30:00+00', 270, '{"二等座": {"price": 553, "available": 80}, "一等座": {"price": 933, "available": 30}, "商务座": {"price": 1748, "available": 10}}'),
('D2', 'D', '上海', '杭州', '2024-12-20 09:00:00+00', '2024-12-20 10:30:00+00', 90, '{"二等座": {"price": 49, "available": 100}, "一等座": {"price": 78, "available": 40}, "商务座": {"price": 148, "available": 15}}'),
('K3', 'K', '北京', '西安', '2024-12-20 20:00:00+00', '2024-12-21 08:00:00+00', 720, '{"硬座": {"price": 152, "available": 200}, "硬卧": {"price": 268, "available": 80}, "软卧": {"price": 398, "available": 40}}');

