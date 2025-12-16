import { useNavigate } from 'react-router-dom'
import SearchBox from '../../components/SearchBox'

function FlightSearch() {
  const navigate = useNavigate()
  
  const handleSearch = (searchData) => {
    const params = new URLSearchParams(searchData)
    navigate(`/flight/list?${params.toString()}`)
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">机票搜索</h1>
      <SearchBox type="flight" onSearch={handleSearch} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">热门航线</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { from: '北京', to: '上海', price: 450 },
            { from: '上海', to: '广州', price: 580 },
            { from: '深圳', to: '成都', price: 620 },
            { from: '北京', to: '深圳', price: 750 },
            { from: '上海', to: '成都', price: 680 },
            { from: '广州', to: '杭州', price: 450 },
          ].map((route, idx) => (
            <div key={idx} className="card bg-base-100 shadow hover:shadow-lg transition-shadow cursor-pointer">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold">{route.from} → {route.to}</p>
                    <p className="text-sm text-base-content/70">多个航班可选</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-error">¥{route.price}</p>
                    <p className="text-xs text-base-content/70">起</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FlightSearch

