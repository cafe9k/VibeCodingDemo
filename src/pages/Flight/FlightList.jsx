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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 筛选侧边栏 */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="card bg-base-100 shadow-xl sticky top-24">
            <div className="card-body">
              <h2 className="card-title">筛选</h2>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">排序方式</span>
                </label>
                <select
                  className="select select-bordered"
                  value={filter.sortBy}
                  onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
                >
                  <option value="price">价格优先</option>
                  <option value="time">时间优先</option>
                </select>
              </div>
              
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">起飞时间</span>
                </label>
                <select
                  className="select select-bordered"
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
        </div>
        
        {/* 航班列表 */}
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{from} → {to}</h1>
            <p className="text-base-content/70">{date} | 找到 {filteredFlights.length} 个航班</p>
          </div>
          
          {filteredFlights.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg">暂无符合条件的航班</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="card bg-base-100 shadow hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => navigate(`/flight/${flight.id}`)}
                >
                  <div className="card-body">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold">{formatTime(flight.departure_time)}</p>
                            <p className="text-sm text-base-content/70">{flight.departure_airport}</p>
                          </div>
                          
                          <div className="flex-1 text-center">
                            <p className="text-xs text-base-content/70">
                              {formatDuration(
                                (new Date(flight.arrival_time) - new Date(flight.departure_time)) / 60000
                              )}
                            </p>
                            <div className="divider my-1"></div>
                            <p className="text-xs text-base-content/70">{flight.aircraft_type}</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-2xl font-bold">{formatTime(flight.arrival_time)}</p>
                            <p className="text-sm text-base-content/70">{flight.arrival_airport}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <span className="badge badge-primary">{flight.airline}</span>
                          <span className="ml-2 text-sm text-base-content/70">{flight.flight_number}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-3xl font-bold text-error">{formatPrice(flight.price)}</p>
                        <button className="btn btn-primary btn-sm mt-2">预订</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FlightList

