// 模拟数据生成脚本
// 注意：这个文件包含用于生成测试数据的函数
// 在实际部署时，需要在 Supabase SQL Editor 中直接运行生成的 SQL

export const generateMockFlights = () => {
  const cities = [
    { name: '北京', airport: 'PEK' },
    { name: '上海', airport: 'PVG' },
    { name: '广州', airport: 'CAN' },
    { name: '深圳', airport: 'SZX' },
    { name: '成都', airport: 'CTU' },
    { name: '杭州', airport: 'HGH' },
    { name: '西安', airport: 'XIY' },
    { name: '重庆', airport: 'CKG' },
  ]
  
  const airlines = ['中国国航', '东方航空', '南方航空', '海南航空', '厦门航空', '四川航空']
  const aircraftTypes = ['A320', 'A321', 'B737', 'B738', 'B787', 'A330']
  
  const sql = []
  
  for (let i = 0; i < cities.length; i++) {
    for (let j = 0; j < cities.length; j++) {
      if (i !== j) {
        // 为每条航线生成 2-3 个航班
        const numFlights = Math.floor(Math.random() * 2) + 2
        
        for (let k = 0; k < numFlights; k++) {
          const airline = airlines[Math.floor(Math.random() * airlines.length)]
          const flightNum = `${airline.substring(0, 2)}${Math.floor(Math.random() * 9000) + 1000}`
          const aircraft = aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)]
          
          // 随机生成今天到30天后的日期
          const daysOffset = Math.floor(Math.random() * 30)
          const departureHour = 6 + Math.floor(Math.random() * 16)
          const departureMinute = Math.floor(Math.random() * 60)
          
          const departureTime = new Date()
          departureTime.setDate(departureTime.getDate() + daysOffset)
          departureTime.setHours(departureHour, departureMinute, 0, 0)
          
          // 飞行时长 1-4 小时
          const flightDuration = 60 + Math.floor(Math.random() * 180)
          const arrivalTime = new Date(departureTime.getTime() + flightDuration * 60000)
          
          const price = 300 + Math.floor(Math.random() * 1500)
          const seats = 50 + Math.floor(Math.random() * 150)
          
          sql.push(`
INSERT INTO flights (flight_number, airline, departure_city, arrival_city, departure_airport, arrival_airport, departure_time, arrival_time, price, aircraft_type, available_seats)
VALUES ('${flightNum}', '${airline}', '${cities[i].name}', '${cities[j].name}', '${cities[i].airport}', '${cities[j].airport}', '${departureTime.toISOString()}', '${arrivalTime.toISOString()}', ${price}, '${aircraft}', ${seats});
          `)
        }
      }
    }
  }
  
  return sql.join('\n')
}

export const generateMockHotels = () => {
  const cities = ['北京', '上海', '广州', '深圳', '成都', '杭州', '西安', '重庆', '武汉', '南京']
  
  const hotelNames = [
    '香格里拉大酒店',
    '希尔顿酒店',
    '万豪酒店',
    '洲际酒店',
    '凯悦酒店',
    '喜来登酒店',
    '皇冠假日酒店',
    '如家酒店',
    '汉庭酒店',
    '锦江之星',
  ]
  
  const facilities = [
    ['免费WiFi', '停车场', '健身房', '游泳池', '餐厅'],
    ['免费WiFi', '停车场', '早餐'],
    ['免费WiFi', '24小时前台'],
    ['免费WiFi', '停车场', '健身房', '商务中心', '会议室'],
  ]
  
  const sql = []
  
  cities.forEach(city => {
    const numHotels = 3 + Math.floor(Math.random() * 5)
    
    for (let i = 0; i < numHotels; i++) {
      const name = `${city}${hotelNames[Math.floor(Math.random() * hotelNames.length)]}`
      const starRating = 3 + Math.floor(Math.random() * 3)
      const ratingScore = (7 + Math.random() * 3).toFixed(1)
      const priceStart = starRating === 5 ? 500 + Math.floor(Math.random() * 1000) :
                         starRating === 4 ? 300 + Math.floor(Math.random() * 500) :
                         150 + Math.floor(Math.random() * 300)
      const address = `${city}市中心区第${i + 1}大街${Math.floor(Math.random() * 500) + 1}号`
      const hotelFacilities = facilities[Math.floor(Math.random() * facilities.length)]
      
      sql.push(`
INSERT INTO hotels (name, city, address, star_rating, rating_score, price_start, facilities, description)
VALUES ('${name}', '${city}', '${address}', ${starRating}, ${ratingScore}, ${priceStart}, ARRAY[${hotelFacilities.map(f => `'${f}'`).join(', ')}], '舒适便捷的住宿选择，位于市中心，交通便利。');
      `)
    }
  })
  
  return sql.join('\n')
}

export const generateMockHotelRooms = () => {
  // 这个需要在hotels插入后运行，使用hotel_id
  const roomTypes = [
    { type: '标准间', price: 0, maxGuests: 2 },
    { type: '大床房', price: 50, maxGuests: 2 },
    { type: '豪华套房', price: 200, maxGuests: 3 },
    { type: '商务套房', price: 300, maxGuests: 2 },
  ]
  
  const sql = `
-- 为每个酒店添加房型
-- 需要在Supabase中运行以下查询
DO $$
DECLARE
    hotel_record RECORD;
BEGIN
    FOR hotel_record IN SELECT id, price_start FROM hotels LOOP
        -- 标准间
        INSERT INTO hotel_rooms (hotel_id, room_type, price, max_guests, available_rooms)
        VALUES (hotel_record.id, '标准间', hotel_record.price_start, 2, 10);
        
        -- 大床房
        INSERT INTO hotel_rooms (hotel_id, room_type, price, max_guests, available_rooms)
        VALUES (hotel_record.id, '大床房', hotel_record.price_start + 50, 2, 8);
        
        -- 豪华套房
        INSERT INTO hotel_rooms (hotel_id, room_type, price, max_guests, available_rooms)
        VALUES (hotel_record.id, '豪华套房', hotel_record.price_start + 200, 3, 5);
    END LOOP;
END $$;
  `
  
  return sql
}

export const generateMockTrains = () => {
  const stations = [
    '北京', '上海', '广州', '深圳', '成都', '杭州', '西安', '重庆', '武汉', '南京'
  ]
  
  const trainTypes = [
    { prefix: 'G', name: '高速动车', speed: 300 },
    { prefix: 'D', name: '动车', speed: 200 },
    { prefix: 'K', name: '快速', speed: 120 },
    { prefix: 'T', name: '特快', speed: 140 },
  ]
  
  const sql = []
  
  for (let i = 0; i < stations.length; i++) {
    for (let j = 0; j < stations.length; j++) {
      if (i !== j) {
        // 计算距离（简化计算）
        const distance = 500 + Math.floor(Math.random() * 1500)
        
        // 为每条线路生成 2-3 个车次
        const numTrains = Math.floor(Math.random() * 2) + 2
        
        for (let k = 0; k < numTrains; k++) {
          const trainType = trainTypes[Math.floor(Math.random() * trainTypes.length)]
          const trainNum = `${trainType.prefix}${Math.floor(Math.random() * 9000) + 1000}`
          
          const daysOffset = Math.floor(Math.random() * 30)
          const departureHour = 6 + Math.floor(Math.random() * 16)
          const departureMinute = Math.floor(Math.random() * 60)
          
          const departureTime = new Date()
          departureTime.setDate(departureTime.getDate() + daysOffset)
          departureTime.setHours(departureHour, departureMinute, 0, 0)
          
          const duration = Math.floor(distance / trainType.speed * 60)
          const arrivalTime = new Date(departureTime.getTime() + duration * 60000)
          
          // 座位价格
          const basePrice = distance * 0.5
          const seats = {
            '二等座': {
              price: Math.floor(basePrice * 0.6),
              available: 50 + Math.floor(Math.random() * 100)
            },
            '一等座': {
              price: Math.floor(basePrice),
              available: 20 + Math.floor(Math.random() * 50)
            }
          }
          
          if (trainType.prefix === 'G' || trainType.prefix === 'D') {
            seats['商务座'] = {
              price: Math.floor(basePrice * 1.8),
              available: 5 + Math.floor(Math.random() * 15)
            }
          }
          
          sql.push(`
INSERT INTO trains (train_number, train_type, departure_station, arrival_station, departure_time, arrival_time, duration, seats)
VALUES ('${trainNum}', '${trainType.prefix}', '${stations[i]}', '${stations[j]}', '${departureTime.toISOString()}', '${arrivalTime.toISOString()}', ${duration}, '${JSON.stringify(seats).replace(/'/g, "''")}');
          `)
        }
      }
    }
  }
  
  return sql.join('\n')
}

// 生成完整的SQL文件
export const generateAllMockData = () => {
  return `
-- 清空现有数据（可选）
-- TRUNCATE flights, hotels, hotel_rooms, trains CASCADE;

-- 插入航班数据
${generateMockFlights()}

-- 插入酒店数据
${generateMockHotels()}

-- 插入房型数据
${generateMockHotelRooms()}

-- 插入火车票数据
${generateMockTrains()}
  `
}

