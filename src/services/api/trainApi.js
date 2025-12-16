import { supabase } from '../supabase'

export const searchTrains = async ({ from, to, date }) => {
  try {
    const { data, error } = await supabase
      .from('trains')
      .select('*')
      .eq('departure_station', from)
      .eq('arrival_station', to)
      .gte('departure_time', `${date}T00:00:00`)
      .lte('departure_time', `${date}T23:59:59`)
      .order('departure_time', { ascending: true })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('搜索车次失败:', error)
    throw error
  }
}

