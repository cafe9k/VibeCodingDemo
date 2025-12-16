import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../components/LoadingSpinner'
import { searchHotels } from '../../services/api/hotelApi'
import { formatPrice } from '../../utils/priceFormat'

function HotelList() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const city = searchParams.get('city')
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  
  const { data: hotels, isLoading, error } = useQuery({
    queryKey: ['hotels', city, checkIn, checkOut],
    queryFn: () => searchHotels({ city, checkIn, checkOut }),
    enabled: !!city,
  })
  
  if (!city) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>请先进行搜索</p>
        <button onClick={() => navigate('/hotel')} className="btn btn-primary mt-4">
          返回搜索
        </button>
      </div>
    )
  }
  
  if (isLoading) {
    return <LoadingSpinner size="lg" text="正在搜索酒店..." />
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
          <h1 className="text-2xl font-bold text-ctrip-gray-dark">{city} 酒店</h1>
          <p className="text-ctrip-gray-light mt-1">
            {checkIn && checkOut && `${checkIn} - ${checkOut} | `}
            找到 {hotels?.length || 0} 家酒店
          </p>
        </div>
        
        {hotels && hotels.length === 0 ? (
          <div className="bg-white rounded-ctrip-lg shadow-card p-12 text-center">
            <p className="text-lg text-ctrip-gray">暂无符合条件的酒店</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels?.map((hotel) => (
              <div
                key={hotel.id}
                className="card-ctrip overflow-hidden cursor-pointer"
                onClick={() => navigate(`/hotels/${hotel.id}`)}
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  {hotel.images && hotel.images[0] ? (
                    <img 
                      src={hotel.images[0]} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-300" 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-ctrip-gray-light">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-ctrip-gray-dark mb-2 line-clamp-1">{hotel.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < hotel.star_rating ? 'text-ctrip-warning' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="px-2 py-0.5 bg-ctrip-blue text-white text-xs rounded font-medium">
                      {hotel.rating_score}分
                    </span>
                  </div>
                  <p className="text-sm text-ctrip-gray-light mb-3 line-clamp-1">📍 {hotel.address}</p>
                  {hotel.facilities && hotel.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hotel.facilities.slice(0, 3).map((facility, idx) => (
                        <span key={idx} className="px-2 py-1 bg-ctrip-bg text-ctrip-gray text-xs rounded">
                          {facility}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t border-ctrip-border">
                    <div>
                      <p className="text-xs text-ctrip-gray-light">起</p>
                      <p className="text-2xl font-bold text-ctrip-orange">{formatPrice(hotel.price_start)}</p>
                    </div>
                    <button 
                      className="px-6 py-2 bg-ctrip-blue text-white rounded-ctrip-md font-medium hover:bg-ctrip-dark-blue transition-smooth"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/hotels/${hotel.id}`)
                      }}
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HotelList

