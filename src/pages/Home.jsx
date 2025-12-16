import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBox from '../components/SearchBox'

function Home() {
  const [activeTab, setActiveTab] = useState('flight')
  const navigate = useNavigate()
  
  const handleSearch = (searchData) => {
    // 根据搜索类型导航到相应的列表页
    const params = new URLSearchParams(searchData)
    navigate(`/${activeTab}/list?${params.toString()}`)
  }
  
  return (
    <div className="min-h-screen">
      {/* 英雄区域 */}
      <div className="hero min-h-[400px] bg-gradient-to-r from-primary to-secondary">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-4xl w-full">
            <h1 className="text-5xl font-bold mb-8">探索世界，从这里开始</h1>
            
            {/* 搜索标签切换 */}
            <div className="tabs tabs-boxed bg-base-100 text-base-content mb-6 inline-flex">
              <button
                className={`tab ${activeTab === 'flight' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('flight')}
              >
                机票
              </button>
              <button
                className={`tab ${activeTab === 'hotel' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('hotel')}
              >
                酒店
              </button>
              <button
                className={`tab ${activeTab === 'train' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('train')}
              >
                火车票
              </button>
            </div>
            
            {/* 搜索框 */}
            <SearchBox type={activeTab} onSearch={handleSearch} />
          </div>
        </div>
      </div>
      
      {/* 热门推荐 */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">热门推荐</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 热门城市 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <h3 className="card-title">🏙️ 热门城市</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="badge badge-lg">北京</div>
                <div className="badge badge-lg">上海</div>
                <div className="badge badge-lg">广州</div>
                <div className="badge badge-lg">深圳</div>
                <div className="badge badge-lg">成都</div>
                <div className="badge badge-lg">杭州</div>
              </div>
            </div>
          </div>
          
          {/* 特惠机票 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <h3 className="card-title">✈️ 特惠机票</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex justify-between">
                  <span>北京 → 上海</span>
                  <span className="text-error font-bold">¥450起</span>
                </li>
                <li className="flex justify-between">
                  <span>上海 → 广州</span>
                  <span className="text-error font-bold">¥580起</span>
                </li>
                <li className="flex justify-between">
                  <span>深圳 → 成都</span>
                  <span className="text-error font-bold">¥620起</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* 优质酒店 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <h3 className="card-title">🏨 优质酒店</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex justify-between">
                  <span>五星级酒店</span>
                  <span className="text-primary font-bold">¥599起</span>
                </li>
                <li className="flex justify-between">
                  <span>四星级酒店</span>
                  <span className="text-primary font-bold">¥299起</span>
                </li>
                <li className="flex justify-between">
                  <span>精品民宿</span>
                  <span className="text-primary font-bold">¥199起</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* 服务优势 */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">为什么选择我们</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-bold text-lg mb-2">价格优惠</h3>
              <p className="text-sm text-base-content/70">超低价格保证，让您的旅行更实惠</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="font-bold text-lg mb-2">安全保障</h3>
              <p className="text-sm text-base-content/70">7x24小时客服，全程保障您的权益</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">快速便捷</h3>
              <p className="text-sm text-base-content/70">一键预订，快速出票，省时省心</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="font-bold text-lg mb-2">优质服务</h3>
              <p className="text-sm text-base-content/70">专业团队，贴心服务，让旅行更完美</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

