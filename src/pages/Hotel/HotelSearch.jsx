import { useNavigate } from 'react-router-dom'
import SearchBox from '../../components/SearchBox'

function HotelSearch() {
  const navigate = useNavigate()
  
  const handleSearch = (searchData) => {
    const params = new URLSearchParams(searchData)
    navigate(`/hotel/list?${params.toString()}`)
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">酒店搜索</h1>
      <SearchBox type="hotel" onSearch={handleSearch} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">热门城市</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['北京', '上海', '广州', '深圳', '成都', '杭州', '西安', '重庆', '武汉', '南京', '厦门', '青岛'].map((city) => (
            <button
              key={city}
              className="btn btn-outline"
              onClick={() => handleSearch({ city, checkIn: '', checkOut: '' })}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HotelSearch

