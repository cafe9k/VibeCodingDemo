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
    <div className="min-h-screen bg-ctrip-bg">
      {/* 英雄区域 */}
      <div className="relative min-h-[500px] bg-gradient-to-br from-ctrip-dark-blue via-ctrip-blue to-ctrip-blue overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-ctrip-light-blue rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-bold mb-12 text-white text-center">探索世界，从这里开始</h1>
            
            {/* 白色搜索卡片 */}
            <div className="bg-white rounded-ctrip-xl shadow-2xl p-8">
              {/* 搜索标签切换 */}
              <div className="flex gap-2 mb-6 border-b border-ctrip-border">
                <button
                  className={`px-6 py-3 font-medium transition-smooth relative ${
                    activeTab === 'flight'
                      ? 'text-ctrip-blue'
                      : 'text-ctrip-gray hover:text-ctrip-blue'
                  }`}
                  onClick={() => setActiveTab('flight')}
                >
                  ✈️ 机票
                  {activeTab === 'flight' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ctrip-blue"></span>
                  )}
                </button>
                <button
                  className={`px-6 py-3 font-medium transition-smooth relative ${
                    activeTab === 'hotel'
                      ? 'text-ctrip-blue'
                      : 'text-ctrip-gray hover:text-ctrip-blue'
                  }`}
                  onClick={() => setActiveTab('hotel')}
                >
                  🏨 酒店
                  {activeTab === 'hotel' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ctrip-blue"></span>
                  )}
                </button>
                <button
                  className={`px-6 py-3 font-medium transition-smooth relative ${
                    activeTab === 'train'
                      ? 'text-ctrip-blue'
                      : 'text-ctrip-gray hover:text-ctrip-blue'
                  }`}
                  onClick={() => setActiveTab('train')}
                >
                  🚄 火车票
                  {activeTab === 'train' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ctrip-blue"></span>
                  )}
                </button>
              </div>
              
              {/* 搜索框 */}
              <SearchBox type={activeTab} onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
      
      {/* 热门推荐 */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-ctrip-gray-dark">热门推荐</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 热门城市 */}
          <div className="card-ctrip p-6 cursor-pointer">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🏙️</span>
              <h3 className="text-xl font-bold text-ctrip-gray-dark">热门城市</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="px-4 py-2 bg-ctrip-light-blue text-ctrip-blue rounded-full text-sm font-medium hover:bg-ctrip-blue hover:text-white transition-smooth cursor-pointer">北京</div>
              <div className="px-4 py-2 bg-ctrip-light-blue text-ctrip-blue rounded-full text-sm font-medium hover:bg-ctrip-blue hover:text-white transition-smooth cursor-pointer">上海</div>
              <div className="px-4 py-2 bg-ctrip-light-blue text-ctrip-blue rounded-full text-sm font-medium hover:bg-ctrip-blue hover:text-white transition-smooth cursor-pointer">广州</div>
              <div className="px-4 py-2 bg-ctrip-light-blue text-ctrip-blue rounded-full text-sm font-medium hover:bg-ctrip-blue hover:text-white transition-smooth cursor-pointer">深圳</div>
              <div className="px-4 py-2 bg-ctrip-light-blue text-ctrip-blue rounded-full text-sm font-medium hover:bg-ctrip-blue hover:text-white transition-smooth cursor-pointer">成都</div>
              <div className="px-4 py-2 bg-ctrip-light-blue text-ctrip-blue rounded-full text-sm font-medium hover:bg-ctrip-blue hover:text-white transition-smooth cursor-pointer">杭州</div>
            </div>
          </div>
          
          {/* 特惠机票 */}
          <div className="card-ctrip p-6 cursor-pointer">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">✈️</span>
              <h3 className="text-xl font-bold text-ctrip-gray-dark">特惠机票</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between items-center group">
                <span className="text-ctrip-gray group-hover:text-ctrip-blue transition-smooth">北京 → 上海</span>
                <span className="text-ctrip-orange font-bold text-lg">¥450起</span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="text-ctrip-gray group-hover:text-ctrip-blue transition-smooth">上海 → 广州</span>
                <span className="text-ctrip-orange font-bold text-lg">¥580起</span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="text-ctrip-gray group-hover:text-ctrip-blue transition-smooth">深圳 → 成都</span>
                <span className="text-ctrip-orange font-bold text-lg">¥620起</span>
              </li>
            </ul>
          </div>
          
          {/* 优质酒店 */}
          <div className="card-ctrip p-6 cursor-pointer">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🏨</span>
              <h3 className="text-xl font-bold text-ctrip-gray-dark">优质酒店</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between items-center group">
                <span className="text-ctrip-gray group-hover:text-ctrip-blue transition-smooth">五星级酒店</span>
                <span className="text-ctrip-blue font-bold text-lg">¥599起</span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="text-ctrip-gray group-hover:text-ctrip-blue transition-smooth">四星级酒店</span>
                <span className="text-ctrip-blue font-bold text-lg">¥299起</span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="text-ctrip-gray group-hover:text-ctrip-blue transition-smooth">精品民宿</span>
                <span className="text-ctrip-blue font-bold text-lg">¥199起</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 服务优势 */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-ctrip-gray-dark">为什么选择我们</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-ctrip-lg hover:bg-ctrip-light-blue/30 transition-smooth cursor-pointer">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-bold text-lg mb-2 text-ctrip-gray-dark">价格优惠</h3>
              <p className="text-sm text-ctrip-gray-light">超低价格保证，让您的旅行更实惠</p>
            </div>
            
            <div className="text-center p-6 rounded-ctrip-lg hover:bg-ctrip-light-blue/30 transition-smooth cursor-pointer">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="font-bold text-lg mb-2 text-ctrip-gray-dark">安全保障</h3>
              <p className="text-sm text-ctrip-gray-light">7x24小时客服，全程保障您的权益</p>
            </div>
            
            <div className="text-center p-6 rounded-ctrip-lg hover:bg-ctrip-light-blue/30 transition-smooth cursor-pointer">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2 text-ctrip-gray-dark">快速便捷</h3>
              <p className="text-sm text-ctrip-gray-light">一键预订，快速出票，省时省心</p>
            </div>
            
            <div className="text-center p-6 rounded-ctrip-lg hover:bg-ctrip-light-blue/30 transition-smooth cursor-pointer">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="font-bold text-lg mb-2 text-ctrip-gray-dark">优质服务</h3>
              <p className="text-sm text-ctrip-gray-light">专业团队，贴心服务，让旅行更完美</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

