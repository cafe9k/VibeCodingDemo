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
    <div className="min-h-screen bg-ctrip-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ctrip-gray-dark">{from} → {to}</h1>
          <p className="text-ctrip-gray-light mt-1">{date} | 找到 {trains?.length || 0} 个车次</p>
        </div>
        
        {trains && trains.length === 0 ? (
          <div className="bg-white rounded-ctrip-lg shadow-card p-12 text-center">
            <p className="text-lg text-ctrip-gray">暂无符合条件的车次</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trains?.map((train) => (
              <div key={train.id} className="card-ctrip p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className={`px-4 py-2 rounded-ctrip-md font-bold text-white text-lg ${
                          train.train_type === 'G' ? 'bg-ctrip-blue' :
                          train.train_type === 'D' ? 'bg-ctrip-success' :
                          'bg-ctrip-gray'
                        }`}>
                          {train.train_number}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-ctrip-gray-dark">{formatTime(train.departure_time)}</p>
                            <p className="text-sm text-ctrip-gray mt-1">{train.departure_station}</p>
                          </div>
                          
                          <div className="flex-1 px-6">
                            <div className="flex flex-col items-center">
                              <p className="text-xs text-ctrip-gray-light mb-1">
                                {formatDuration(train.duration)}
                              </p>
                              <div className="w-full h-px border-t-2 border-dashed border-ctrip-border relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-ctrip-success rounded-full"></div>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-ctrip-success rounded-full"></div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-3xl font-bold text-ctrip-gray-dark">{formatTime(train.arrival_time)}</p>
                            <p className="text-sm text-ctrip-gray mt-1">{train.arrival_station}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 items-center justify-end">
                    {train.seats && Object.entries(train.seats).map(([type, info]) => (
                      <button
                        key={type}
                        className={`px-4 py-3 border-2 rounded-ctrip-md transition-smooth ${
                          info.available === 0 
                            ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'border-ctrip-blue hover:bg-ctrip-light-blue cursor-pointer'
                        }`}
                        onClick={() => {
                          if (info.available > 0) {
                            setSelectedTrain(train)
                            setSelectedSeat({ type, ...info })
                            document.getElementById('booking_modal').showModal()
                          }
                        }}
                        disabled={info.available === 0}
                      >
                        <div className="text-center">
                          <p className="font-bold text-ctrip-gray-dark text-sm">{type}</p>
                          <p className="text-ctrip-orange font-bold text-lg my-1">{formatPrice(info.price)}</p>
                          <p className="text-xs text-ctrip-gray-light">
                            {info.available > 0 ? `余${info.available}张` : '无票'}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      
        {/* 预订模态框 */}
        <dialog id="booking_modal" className="modal">
          <div className="modal-box max-w-lg bg-white rounded-ctrip-xl">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-ctrip-gray hover:text-ctrip-gray-dark">✕</button>
            </form>
            
            <h3 className="font-bold text-xl text-ctrip-gray-dark mb-6">填写乘客信息</h3>
            
            {selectedTrain && selectedSeat && (
              <div className="mb-6 p-4 bg-ctrip-light-blue rounded-ctrip-lg">
                <p className="font-bold text-lg text-ctrip-gray-dark">{selectedTrain.train_number}</p>
                <p className="text-sm text-ctrip-gray mt-1">{selectedTrain.departure_station} → {selectedTrain.arrival_station}</p>
                <p className="text-sm text-ctrip-gray">{formatTime(selectedTrain.departure_time)} - {formatTime(selectedTrain.arrival_time)}</p>
                <p className="text-xl font-bold text-ctrip-orange mt-3">{selectedSeat.type} {formatPrice(selectedSeat.price)}</p>
              </div>
            )}
            
            <form onSubmit={handleBooking}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  乘客姓名
                </label>
                <input
                  type="text"
                  placeholder="请输入姓名"
                  className="input-ctrip"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  身份证号
                </label>
                <input
                  type="text"
                  placeholder="请输入身份证号"
                  className="input-ctrip"
                  value={idCard}
                  onChange={(e) => setIdCard(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="btn-ctrip w-full py-4" disabled={submitting}>
                {submitting ? <span className="loading loading-spinner"></span> : '提交订单'}
              </button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>关闭</button>
          </form>
        </dialog>
      </div>
    </div>
  )
}

export default TrainList

