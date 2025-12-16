import { supabase } from '../supabase'

export const searchFlights = async ({ from, to, date }) => {
  try {
    const { data, error } = await supabase
      .from('flights')
      .select('*')
      .eq('departure_city', from)
      .eq('arrival_city', to)
      .gte('departure_time', `${date}T00:00:00`)
      .lte('departure_time', `${date}T23:59:59`)
      .order('departure_time', { ascending: true })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('搜索航班失败:', error)
    throw error
  }
}

export const getFlightById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('flights')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('获取航班详情失败:', error)
    throw error
  }
}

