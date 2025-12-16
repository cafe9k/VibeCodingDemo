import { useNavigate } from 'react-router-dom'
import SearchBox from '../../components/SearchBox'

function TrainSearch() {
  const navigate = useNavigate()
  
  const handleSearch = (searchData) => {
    const params = new URLSearchParams(searchData)
    navigate(`/train/list?${params.toString()}`)
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">火车票搜索</h1>
      <SearchBox type="train" onSearch={handleSearch} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">热门线路</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { from: '北京', to: '上海', duration: '4小时18分' },
            { from: '上海', to: '广州', duration: '7小时45分' },
            { from: '北京', to: '深圳', duration: '8小时56分' },
            { from: '上海', to: '成都', duration: '10小时50分' },
            { from: '北京', to: '西安', duration: '4小时25分' },
            { from: '广州', to: '深圳', duration: '1小时10分' },
          ].map((route, idx) => (
            <div key={idx} className="card bg-base-100 shadow hover:shadow-lg transition-shadow cursor-pointer">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold">{route.from} → {route.to}</p>
                    <p className="text-sm text-base-content/70">最快 {route.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-base-content/70">多趟车次可选</p>
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

export default TrainSearch

