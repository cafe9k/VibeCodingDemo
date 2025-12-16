import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../components/LoadingSpinner'
import useAuthStore from '../../store/useAuthStore'
import useOrderStore from '../../store/useOrderStore'
import { getHotelById } from '../../services/api/hotelApi'
import { createOrder } from '../../services/api/orderApi'
import { formatPrice } from '../../utils/priceFormat'

function HotelDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const setCurrentOrder = useOrderStore(state => state.setCurrentOrder)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [nights, setNights] = useState(1)
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  const { data: hotel, isLoading, error } = useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getHotelById(id),
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('请先登录')
      navigate('/login')
      return
    }
    
    if (!selectedRoom) {
      alert('请选择房型')
      return
    }
    
    setSubmitting(true)
    
    try {
      const orderData = {
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomType: selectedRoom.room_type,
        nights: nights,
        guestName: guestName,
        guestPhone: guestPhone,
      }
      
      const order = await createOrder({
        type: 'hotel',
        data: orderData,
        totalPrice: selectedRoom.price * nights,
      })
      
      setCurrentOrder(order)
      navigate('/orders')
    } catch (err) {
      alert('创建订单失败: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }
  
  if (isLoading) {
    return <LoadingSpinner size="lg" text="加载酒店详情..." />
  }
  
  if (error || !hotel) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="alert alert-error">
          <span>加载失败: {error?.message || '酒店不存在'}</span>
        </div>
        <button onClick={() => navigate('/hotel')} className="btn btn-primary mt-4">
          返回搜索
        </button>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* 酒店基本信息 */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="rating rating-sm">
                {[...Array(5)].map((_, i) => (
                  <input
                    key={i}
                    type="radio"
                    className="mask mask-star-2 bg-orange-400"
                    checked={i < hotel.star_rating}
                    readOnly
                  />
                ))}
              </div>
              <span className="badge badge-lg">{hotel.rating_score} 分</span>
            </div>
            
            <p className="text-base-content/70 mb-4">📍 {hotel.address}</p>
            
            {hotel.facilities && hotel.facilities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.facilities.map((facility, idx) => (
                  <span key={idx} className="badge badge-outline">{facility}</span>
                ))}
              </div>
            )}
            
            <p className="text-base-content/80">{hotel.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 房型列表 */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">选择房型</h2>
            
            {hotel.rooms && hotel.rooms.length > 0 ? (
              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`card bg-base-100 shadow cursor-pointer transition-all ${
                      selectedRoom?.id === room.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="card-body">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{room.room_type}</h3>
                          <p className="text-sm text-base-content/70 mb-2">
                            最多入住 {room.max_guests} 人
                          </p>
                          <p className="text-sm text-base-content/70">
                            剩余 {room.available_rooms} 间
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-error">{formatPrice(room.price)}</p>
                          <p className="text-xs text-base-content/70">每晚</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p>暂无可预订房型</p>
              </div>
            )}
          </div>
          
          {/* 预订表单 */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-24">
              <div className="card-body">
                <h2 className="card-title mb-4">预订信息</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">入住天数</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="input input-bordered"
                      value={nights}
                      onChange={(e) => setNights(parseInt(e.target.value))}
                      required
                    />
                  </div>
                  
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">入住人姓名</span>
                    </label>
                    <input
                      type="text"
                      placeholder="请输入姓名"
                      className="input input-bordered"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">联系电话</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="请输入电话"
                      className="input input-bordered"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="divider"></div>
                  
                  {selectedRoom && (
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>房型</span>
                        <span>{selectedRoom.room_type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>价格 × {nights} 晚</span>
                        <span>{formatPrice(selectedRoom.price * nights)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>总计</span>
                        <span className="text-error">{formatPrice(selectedRoom.price * nights)}</span>
                      </div>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={!selectedRoom || submitting}
                  >
                    {submitting ? <span className="loading loading-spinner"></span> : '立即预订'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelDetail

