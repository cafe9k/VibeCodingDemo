import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../components/LoadingSpinner'
import useAuthStore from '../../store/useAuthStore'
import useOrderStore from '../../store/useOrderStore'
import { getFlightById } from '../../services/api/flightApi'
import { createOrder } from '../../services/api/orderApi'
import { formatDateTime, formatDuration } from '../../utils/dateFormat'
import { formatPrice } from '../../utils/priceFormat'

function FlightDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const setCurrentOrder = useOrderStore(state => state.setCurrentOrder)
  const [passengers, setPassengers] = useState([{ name: '', idCard: '' }])
  const [submitting, setSubmitting] = useState(false)
  
  const { data: flight, isLoading, error } = useQuery({
    queryKey: ['flight', id],
    queryFn: () => getFlightById(id),
  })
  
  const addPassenger = () => {
    setPassengers([...passengers, { name: '', idCard: '' }])
  }
  
  const removePassenger = (index) => {
    setPassengers(passengers.filter((_, i) => i !== index))
  }
  
  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...passengers]
    newPassengers[index][field] = value
    setPassengers(newPassengers)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('请先登录')
      navigate('/login')
      return
    }
    
    setSubmitting(true)
    
    try {
      const orderData = {
        flightId: flight.id,
        flightNumber: flight.flight_number,
        airline: flight.airline,
        departureCity: flight.departure_city,
        arrivalCity: flight.arrival_city,
        departureTime: flight.departure_time,
        arrivalTime: flight.arrival_time,
        passengers: passengers,
      }
      
      const order = await createOrder({
        type: 'flight',
        data: orderData,
        totalPrice: flight.price * passengers.length,
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
    return <LoadingSpinner size="lg" text="加载航班详情..." />
  }
  
  if (error || !flight) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="alert alert-error">
          <span>加载失败: {error?.message || '航班不存在'}</span>
        </div>
        <button onClick={() => navigate('/flight')} className="btn btn-primary mt-4">
          返回搜索
        </button>
      </div>
    )
  }
  
  const duration = (new Date(flight.arrival_time) - new Date(flight.departure_time)) / 60000
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">航班详情</h1>
        
        {/* 航班信息卡片 */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{flight.airline} {flight.flight_number}</h2>
                <p className="text-base-content/70">{flight.aircraft_type}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-error">{formatPrice(flight.price)}</p>
                <p className="text-sm text-base-content/70">每位成人</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm text-base-content/70 mb-1">出发</p>
                <p className="text-xl font-bold">{formatDateTime(flight.departure_time)}</p>
                <p className="text-base-content/70">{flight.departure_city} {flight.departure_airport}</p>
              </div>
              
              <div className="text-center flex flex-col justify-center">
                <p className="text-sm text-base-content/70 mb-2">飞行时长</p>
                <p className="text-lg font-bold">{formatDuration(duration)}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-base-content/70 mb-1">到达</p>
                <p className="text-xl font-bold">{formatDateTime(flight.arrival_time)}</p>
                <p className="text-base-content/70">{flight.arrival_city} {flight.arrival_airport}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-base-content/70">剩余座位: {flight.available_seats}</p>
            </div>
          </div>
        </div>
        
        {/* 乘客信息表单 */}
        <form onSubmit={handleSubmit}>
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title">乘客信息</h2>
                <button
                  type="button"
                  onClick={addPassenger}
                  className="btn btn-sm btn-primary"
                >
                  + 添加乘客
                </button>
              </div>
              
              {passengers.map((passenger, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">乘客 {index + 1}</h3>
                    {passengers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePassenger(index)}
                        className="btn btn-sm btn-ghost btn-circle"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">姓名</span>
                      </label>
                      <input
                        type="text"
                        placeholder="请输入姓名"
                        className="input input-bordered"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">身份证号</span>
                      </label>
                      <input
                        type="text"
                        placeholder="请输入身份证号"
                        className="input input-bordered"
                        value={passenger.idCard}
                        onChange={(e) => handlePassengerChange(index, 'idCard', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 价格汇总 */}
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title">价格明细</h2>
              
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <span>票价 × {passengers.length}</span>
                  <span>{formatPrice(flight.price * passengers.length)}</span>
                </div>
                <div className="flex justify-between">
                  <span>机场建设费 × {passengers.length}</span>
                  <span>{formatPrice(50 * passengers.length)}</span>
                </div>
                <div className="flex justify-between">
                  <span>燃油附加费 × {passengers.length}</span>
                  <span>{formatPrice(30 * passengers.length)}</span>
                </div>
                <div className="divider"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>总计</span>
                  <span className="text-error">{formatPrice(flight.price * passengers.length + 80 * passengers.length)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline flex-1"
            >
              返回
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={submitting}
            >
              {submitting ? <span className="loading loading-spinner"></span> : '提交订单'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FlightDetail

