import { supabase } from '../supabase'

export const searchHotels = async ({ city, checkIn, checkOut }) => {
  try {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('city', city)
      .order('rating_score', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('搜索酒店失败:', error)
    throw error
  }
}

export const getHotelById = async (id) => {
  try {
    // 获取酒店基本信息
    const { data: hotel, error: hotelError } = await supabase
      .from('hotels')
      .select('*')
      .eq('id', id)
      .single()
    
    if (hotelError) throw hotelError
    
    // 获取房型信息
    const { data: rooms, error: roomsError } = await supabase
      .from('hotel_rooms')
      .select('*')
      .eq('hotel_id', id)
    
    if (roomsError) throw roomsError
    
    return { ...hotel, rooms }
  } catch (error) {
    console.error('获取酒店详情失败:', error)
    throw error
  }
}

