import { supabase } from '../supabase'

export const createOrder = async ({ type, data, totalPrice }) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('请先登录')
    }
    
    const { data: order, error } = await supabase
      .from('orders')
      .insert([
        {
          user_id: user.id,
          order_type: type,
          order_data: data,
          total_price: totalPrice,
          status: 'pending',
        }
      ])
      .select()
      .single()
    
    if (error) throw error
    return order
  } catch (error) {
    console.error('创建订单失败:', error)
    throw error
  }
}

export const getUserOrders = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('获取订单列表失败:', error)
    throw error
  }
}

export const updateOrderStatus = async (orderId, status) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('更新订单状态失败:', error)
    throw error
  }
}

