import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from '../../components/LoadingSpinner'
import useAuthStore from '../../store/useAuthStore'
import { getUserOrders, updateOrderStatus } from '../../services/api/orderApi'
import { formatDateTime } from '../../utils/dateFormat'
import { formatPrice } from '../../utils/priceFormat'

function Orders() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, loading: authLoading } = useAuthStore()
  const [statusFilter, setStatusFilter] = useState('all')
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])
  
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => getUserOrders(user?.id),
    enabled: !!user,
  })
  
  const payMutation = useMutation({
    mutationFn: ({ orderId }) => updateOrderStatus(orderId, 'paid'),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders'])
      alert('支付成功！')
    },
    onError: (err) => {
      alert('支付失败: ' + err.message)
    },
  })
  
  const cancelMutation = useMutation({
    mutationFn: ({ orderId }) => updateOrderStatus(orderId, 'cancelled'),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders'])
      alert('订单已取消')
    },
    onError: (err) => {
      alert('取消失败: ' + err.message)
    },
  })
  
  if (authLoading || isLoading) {
    return <LoadingSpinner size="lg" text="加载订单..." />
  }
  
  if (!user) {
    return null
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="alert alert-error">
          <span>加载失败: {error.message}</span>
        </div>
      </div>
    )
  }
  
  const filteredOrders = orders?.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  ) || []
  
  const getOrderTypeLabel = (type) => {
    const labels = { flight: '机票', hotel: '酒店', train: '火车票' }
    return labels[type] || type
  }
  
  const getStatusBadge = (status) => {
    const badges = {
      pending: <span className="badge badge-warning">待支付</span>,
      paid: <span className="badge badge-success">已支付</span>,
      completed: <span className="badge badge-info">已完成</span>,
      cancelled: <span className="badge badge-error">已取消</span>,
    }
    return badges[status] || <span className="badge">{status}</span>
  }
  
  const renderOrderContent = (order) => {
    const data = order.order_data
    
    if (order.order_type === 'flight') {
      return (
        <div>
          <p className="font-bold">{data.airline} {data.flightNumber}</p>
          <p className="text-sm">{data.departureCity} → {data.arrivalCity}</p>
          <p className="text-xs text-base-content/70">
            {formatDateTime(data.departureTime)} - {formatDateTime(data.arrivalTime)}
          </p>
          <p className="text-xs">乘客: {data.passengers?.map(p => p.name).join(', ')}</p>
        </div>
      )
    } else if (order.order_type === 'hotel') {
      return (
        <div>
          <p className="font-bold">{data.hotelName}</p>
          <p className="text-sm">{data.roomType}</p>
          <p className="text-xs text-base-content/70">入住 {data.nights} 晚</p>
          <p className="text-xs">入住人: {data.guestName}</p>
        </div>
      )
    } else if (order.order_type === 'train') {
      return (
        <div>
          <p className="font-bold">{data.trainNumber}</p>
          <p className="text-sm">{data.departureStation} → {data.arrivalStation}</p>
          <p className="text-xs text-base-content/70">
            {formatDateTime(data.departureTime)} - {formatDateTime(data.arrivalTime)}
          </p>
          <p className="text-xs">{data.seatType} | 乘客: {data.passengerName}</p>
        </div>
      )
    }
    
    return <p>订单详情</p>
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">我的订单</h1>
      
      {/* 状态筛选 */}
      <div className="tabs tabs-boxed mb-6 bg-base-200 inline-flex">
        <button
          className={`tab ${statusFilter === 'all' ? 'tab-active' : ''}`}
          onClick={() => setStatusFilter('all')}
        >
          全部
        </button>
        <button
          className={`tab ${statusFilter === 'pending' ? 'tab-active' : ''}`}
          onClick={() => setStatusFilter('pending')}
        >
          待支付
        </button>
        <button
          className={`tab ${statusFilter === 'paid' ? 'tab-active' : ''}`}
          onClick={() => setStatusFilter('paid')}
        >
          已支付
        </button>
        <button
          className={`tab ${statusFilter === 'completed' ? 'tab-active' : ''}`}
          onClick={() => setStatusFilter('completed')}
        >
          已完成
        </button>
        <button
          className={`tab ${statusFilter === 'cancelled' ? 'tab-active' : ''}`}
          onClick={() => setStatusFilter('cancelled')}
        >
          已取消
        </button>
      </div>
      
      {/* 订单列表 */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">暂无订单</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            去预订
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge badge-primary">{getOrderTypeLabel(order.order_type)}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    
                    {renderOrderContent(order)}
                    
                    <p className="text-xs text-base-content/70 mt-2">
                      订单号: {order.id}
                    </p>
                    <p className="text-xs text-base-content/70">
                      下单时间: {formatDateTime(order.created_at)}
                    </p>
                  </div>
                  
                  <div className="text-right flex flex-col justify-between">
                    <div>
                      <p className="text-2xl font-bold text-error">{formatPrice(order.total_price)}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      {order.status === 'pending' && (
                        <>
                          <button
                            onClick={() => payMutation.mutate({ orderId: order.id })}
                            className="btn btn-primary btn-sm"
                            disabled={payMutation.isPending}
                          >
                            {payMutation.isPending ? '处理中...' : '立即支付'}
                          </button>
                          <button
                            onClick={() => cancelMutation.mutate({ orderId: order.id })}
                            className="btn btn-outline btn-sm"
                            disabled={cancelMutation.isPending}
                          >
                            取消订单
                          </button>
                        </>
                      )}
                      {order.status === 'paid' && (
                        <button className="btn btn-outline btn-sm" disabled>
                          等待出行
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders

