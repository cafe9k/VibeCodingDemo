import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../components/LoadingSpinner'
import useAuthStore from '../../store/useAuthStore'
import useOrderStore from '../../store/useOrderStore'
import { searchTrains } from '../../services/api/trainApi'
import { createOrder } from '../../services/api/orderApi'
import { formatTime, formatDuration } from '../../utils/dateFormat'
import { formatPrice } from '../../utils/priceFormat'

function TrainList() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const setCurrentOrder = useOrderStore(state => state.setCurrentOrder)
  const [selectedTrain, setSelectedTrain] = useState(null)
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [passengerName, setPassengerName] = useState('')
  const [idCard, setIdCard] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const date = searchParams.get('date')
  
  const { data: trains, isLoading, error } = useQuery({
    queryKey: ['trains', from, to, date],
    queryFn: () => searchTrains({ from, to, date }),
    enabled: !!from && !!to && !!date,
  })
  
  const handleBooking = async (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('请先登录')
      navigate('/login')
      return
    }
    
    if (!selectedTrain || !selectedSeat) {
      alert('请选择车次和座位类型')
      return
    }
    
    setSubmitting(true)
    
    try {
      const orderData = {
        trainId: selectedTrain.id,
        trainNumber: selectedTrain.train_number,
        departureStation: selectedTrain.departure_station,
        arrivalStation: selectedTrain.arrival_station,
        departureTime: selectedTrain.departure_time,
        arrivalTime: selectedTrain.arrival_time,
        seatType: selectedSeat.type,
        passengerName: passengerName,
        idCard: idCard,
      }
      
      const order = await createOrder({
        type: 'train',
        data: orderData,
        totalPrice: selectedSeat.price,
      })
      
      setCurrentOrder(order)
      setSelectedTrain(null)
      setSelectedSeat(null)
      navigate('/orders')
    } catch (err) {
      alert('创建订单失败: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }
  
  if (!from || !to || !date) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>请先进行搜索</p>
        <button onClick={() => navigate('/train')} className="btn btn-primary mt-4">
          返回搜索
        </button>
      </div>
    )
  }
  
  if (isLoading) {
    return <LoadingSpinner size="lg" text="正在搜索车次..." />
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="alert alert-error">
          <span>搜索失败: {error.message}</span>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{from} → {to}</h1>
        <p className="text-base-content/70">{date} | 找到 {trains?.length || 0} 个车次</p>
      </div>
      
      {trains && trains.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg">暂无符合条件的车次</p>
        </div>
      ) : (
        <div className="space-y-4">
          {trains?.map((train) => (
            <div key={train.id} className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <span className={`badge badge-lg ${
                          train.train_type === 'G' ? 'badge-primary' :
                          train.train_type === 'D' ? 'badge-secondary' :
                          'badge-neutral'
                        }`}>
                          {train.train_number}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold">{formatTime(train.departure_time)}</p>
                            <p className="text-sm text-base-content/70">{train.departure_station}</p>
                          </div>
                          
                          <div className="text-center px-4">
                            <p className="text-xs text-base-content/70 mb-1">
                              {formatDuration(train.duration)}
                            </p>
                            <div className="w-24 h-px bg-base-300"></div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-2xl font-bold">{formatTime(train.arrival_time)}</p>
                            <p className="text-sm text-base-content/70">{train.arrival_station}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    {train.seats && Object.entries(train.seats).map(([type, info]) => (
                      <button
                        key={type}
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setSelectedTrain(train)
                          setSelectedSeat({ type, ...info })
                          document.getElementById('booking_modal').showModal()
                        }}
                        disabled={info.available === 0}
                      >
                        <div className="text-left">
                          <p className="font-bold">{type}</p>
                          <p className="text-error">{formatPrice(info.price)}</p>
                          <p className="text-xs">{info.available > 0 ? `余${info.available}` : '无票'}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* 预订模态框 */}
      <dialog id="booking_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          
          <h3 className="font-bold text-lg mb-4">填写乘客信息</h3>
          
          {selectedTrain && selectedSeat && (
            <div className="mb-4 p-4 bg-base-200 rounded-lg">
              <p className="font-bold">{selectedTrain.train_number}</p>
              <p className="text-sm">{selectedTrain.departure_station} → {selectedTrain.arrival_station}</p>
              <p className="text-sm">{formatTime(selectedTrain.departure_time)} - {formatTime(selectedTrain.arrival_time)}</p>
              <p className="text-lg font-bold text-error mt-2">{selectedSeat.type} {formatPrice(selectedSeat.price)}</p>
            </div>
          )}
          
          <form onSubmit={handleBooking}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">乘客姓名</span>
              </label>
              <input
                type="text"
                placeholder="请输入姓名"
                className="input input-bordered"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">身份证号</span>
              </label>
              <input
                type="text"
                placeholder="请输入身份证号"
                className="input input-bordered"
                value={idCard}
                onChange={(e) => setIdCard(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? <span className="loading loading-spinner"></span> : '提交订单'}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>关闭</button>
        </form>
      </dialog>
    </div>
  )
}

export default TrainList

