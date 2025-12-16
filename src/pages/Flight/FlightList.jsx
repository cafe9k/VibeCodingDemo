import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../components/LoadingSpinner'
import { searchFlights } from '../../services/api/flightApi'
import { formatTime, formatDuration } from '../../utils/dateFormat'
import { formatPrice } from '../../utils/priceFormat'

function FlightList() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [filter, setFilter] = useState({
    sortBy: 'price',
    timeRange: 'all',
  })
  
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const date = searchParams.get('date')
  
  const { data: flights, isLoading, error } = useQuery({
    queryKey: ['flights', from, to, date],
    queryFn: () => searchFlights({ from, to, date }),
    enabled: !!from && !!to && !!date,
  })
  
  const filteredFlights = flights ? [...flights].sort((a, b) => {
    if (filter.sortBy === 'price') {
      return a.price - b.price
    } else if (filter.sortBy === 'time') {
      return new Date(a.departure_time) - new Date(b.departure_time)
    }
    return 0
  }).filter(flight => {
    if (filter.timeRange === 'morning') {
      const hour = new Date(flight.departure_time).getHours()
      return hour >= 6 && hour < 12
    } else if (filter.timeRange === 'afternoon') {
      const hour = new Date(flight.departure_time).getHours()
      return hour >= 12 && hour < 18
    } else if (filter.timeRange === 'evening') {
      const hour = new Date(flight.departure_time).getHours()
      return hour >= 18 || hour < 6
    }
    return true
  }) : []
  
  if (!from || !to || !date) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>请先进行搜索</p>
        <button onClick={() => navigate('/flight')} className="btn btn-primary mt-4">
          返回搜索
        </button>
      </div>
    )
  }
  
  if (isLoading) {
    return <LoadingSpinner size="lg" text="正在搜索航班..." />
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
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 筛选侧边栏 */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-ctrip-lg shadow-card sticky top-24 p-6">
              <h2 className="text-lg font-bold text-ctrip-gray-dark mb-4">筛选</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  排序方式
                </label>
                <select
                  className="w-full h-10 px-3 border border-ctrip-border rounded-ctrip-md focus:outline-none focus:border-ctrip-blue transition-smooth"
                  value={filter.sortBy}
                  onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
                >
                  <option value="price">价格优先</option>
                  <option value="time">时间优先</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  起飞时间
                </label>
                <select
                  className="w-full h-10 px-3 border border-ctrip-border rounded-ctrip-md focus:outline-none focus:border-ctrip-blue transition-smooth"
                  value={filter.timeRange}
                  onChange={(e) => setFilter({ ...filter, timeRange: e.target.value })}
                >
                  <option value="all">全部</option>
                  <option value="morning">早上 (06:00-12:00)</option>
                  <option value="afternoon">下午 (12:00-18:00)</option>
                  <option value="evening">晚上 (18:00-次日06:00)</option>
                </select>
              </div>
            </div>
          </div>
        
          {/* 航班列表 */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-ctrip-gray-dark">{from} → {to}</h1>
              <p className="text-ctrip-gray-light mt-1">{date} | 找到 {filteredFlights.length} 个航班</p>
            </div>
            
            {filteredFlights.length === 0 ? (
              <div className="bg-white rounded-ctrip-lg shadow-card p-12 text-center">
                <p className="text-lg text-ctrip-gray">暂无符合条件的航班</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="card-ctrip p-6 cursor-pointer"
                    onClick={() => navigate(`/flights/${flight.id}`)}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex-1 w-full">
                        {/* 航司信息 */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-ctrip-light-blue text-ctrip-blue rounded-full text-xs font-medium">
                            {flight.airline}
                          </span>
                          <span className="text-ctrip-gray text-sm">{flight.flight_number}</span>
                        </div>
                        
                        {/* 时间和航线 */}
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-ctrip-gray-dark">{formatTime(flight.departure_time)}</p>
                            <p className="text-sm text-ctrip-gray mt-1">{flight.departure_airport}</p>
                          </div>
                          
                          <div className="flex-1 px-4">
                            <div className="flex flex-col items-center">
                              <p className="text-xs text-ctrip-gray-light mb-1">
                                {formatDuration(
                                  (new Date(flight.arrival_time) - new Date(flight.departure_time)) / 60000
                                )}
                              </p>
                              <div className="w-full h-px border-t-2 border-dashed border-ctrip-border relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-ctrip-blue rounded-full"></div>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-ctrip-blue rounded-full"></div>
                              </div>
                              <p className="text-xs text-ctrip-gray-light mt-1">{flight.aircraft_type}</p>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-3xl font-bold text-ctrip-gray-dark">{formatTime(flight.arrival_time)}</p>
                            <p className="text-sm text-ctrip-gray mt-1">{flight.arrival_airport}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <p className="text-3xl font-bold text-ctrip-orange mb-3">{formatPrice(flight.price)}</p>
                        <button 
                          className="btn-ctrip px-8 py-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/flights/${flight.id}`)
                          }}
                        >
                          预订
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightList

