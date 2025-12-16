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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{city} 酒店</h1>
        <p className="text-base-content/70">
          {checkIn && checkOut && `${checkIn} - ${checkOut} | `}
          找到 {hotels?.length || 0} 家酒店
        </p>
      </div>
      
      {hotels && hotels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg">暂无符合条件的酒店</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels?.map((hotel) => (
            <div
              key={hotel.id}
              className="card bg-base-100 shadow hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/hotel/${hotel.id}`)}
            >
              <figure className="h-48 bg-base-300">
                {hotel.images && hotel.images[0] ? (
                  <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-base-content/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title">{hotel.name}</h2>
                <div className="flex items-center gap-2 my-2">
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
                  <span className="text-sm font-bold">{hotel.rating_score}</span>
                </div>
                <p className="text-sm text-base-content/70">{hotel.address}</p>
                {hotel.facilities && hotel.facilities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {hotel.facilities.slice(0, 3).map((facility, idx) => (
                      <span key={idx} className="badge badge-sm">{facility}</span>
                    ))}
                  </div>
                )}
                <div className="card-actions justify-between items-center mt-4">
                  <div>
                    <p className="text-2xl font-bold text-error">{formatPrice(hotel.price_start)}</p>
                    <p className="text-xs text-base-content/70">起/晚</p>
                  </div>
                  <button className="btn btn-primary btn-sm">查看详情</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HotelList

