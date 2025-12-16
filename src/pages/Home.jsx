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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 英雄区域 - 更加现代化的设计 */}
      <div className="relative min-h-[600px] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 overflow-hidden">
        {/* 动态背景装饰 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        {/* 几何图案装饰 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-white rotate-45"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* 主标题区域 */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                探索世界，从这里开始
              </h1>
              <p className="text-xl text-white/90 font-light">
                机票·酒店·火车票 一站式预订平台
              </p>
            </div>
            
            {/* 白色搜索卡片 - 增强的阴影和圆角 */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
              {/* 搜索标签切换 - 更现代的设计 */}
              <div className="flex gap-1 mb-8 bg-gray-100 p-1.5 rounded-xl">
                <button
                  className={`flex-1 px-6 py-3.5 font-semibold text-base transition-all duration-300 rounded-lg ${
                    activeTab === 'flight'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('flight')}
                >
                  <span className="text-xl mr-2">✈️</span>
                  机票
                </button>
                <button
                  className={`flex-1 px-6 py-3.5 font-semibold text-base transition-all duration-300 rounded-lg ${
                    activeTab === 'hotel'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('hotel')}
                >
                  <span className="text-xl mr-2">🏨</span>
                  酒店
                </button>
                <button
                  className={`flex-1 px-6 py-3.5 font-semibold text-base transition-all duration-300 rounded-lg ${
                    activeTab === 'train'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('train')}
                >
                  <span className="text-xl mr-2">🚄</span>
                  火车票
                </button>
              </div>
              
              {/* 搜索框 */}
              <SearchBox type={activeTab} onSearch={handleSearch} />
            </div>
            
            {/* 快速入口 */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center text-white hover:bg-white/20 transition-all cursor-pointer">
                <div className="text-2xl mb-1">🎫</div>
                <div className="text-sm font-medium">特价机票</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center text-white hover:bg-white/20 transition-all cursor-pointer">
                <div className="text-2xl mb-1">🏷️</div>
                <div className="text-sm font-medium">酒店优惠</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center text-white hover:bg-white/20 transition-all cursor-pointer">
                <div className="text-2xl mb-1">🎁</div>
                <div className="text-sm font-medium">积分商城</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center text-white hover:bg-white/20 transition-all cursor-pointer">
                <div className="text-2xl mb-1">📱</div>
                <div className="text-sm font-medium">下载APP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 热门推荐 - 现代化卡片设计 */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-gray-800">热门推荐</h2>
          <p className="text-gray-500">精选优质服务，让您的出行更轻松</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 热门城市 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200 group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform">
                🏙️
              </div>
              <h3 className="text-2xl font-bold text-gray-800">热门城市</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">北京</span>
              <span className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">上海</span>
              <span className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">广州</span>
              <span className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">深圳</span>
              <span className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">成都</span>
              <span className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">杭州</span>
            </div>
          </div>
          
          {/* 特惠机票 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-orange-200 group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform">
                ✈️
              </div>
              <h3 className="text-2xl font-bold text-gray-800">特惠机票</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-3 rounded-lg hover:bg-orange-50 transition-all cursor-pointer group/item">
                <span className="text-gray-700 font-medium group-hover/item:text-orange-600">北京 → 上海</span>
                <span className="text-orange-600 font-bold text-xl">¥450<span className="text-sm font-normal">起</span></span>
              </li>
              <li className="flex justify-between items-center p-3 rounded-lg hover:bg-orange-50 transition-all cursor-pointer group/item">
                <span className="text-gray-700 font-medium group-hover/item:text-orange-600">上海 → 广州</span>
                <span className="text-orange-600 font-bold text-xl">¥580<span className="text-sm font-normal">起</span></span>
              </li>
              <li className="flex justify-between items-center p-3 rounded-lg hover:bg-orange-50 transition-all cursor-pointer group/item">
                <span className="text-gray-700 font-medium group-hover/item:text-orange-600">深圳 → 成都</span>
                <span className="text-orange-600 font-bold text-xl">¥620<span className="text-sm font-normal">起</span></span>
              </li>
            </ul>
          </div>
          
          {/* 优质酒店 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-purple-200 group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform">
                🏨
              </div>
              <h3 className="text-2xl font-bold text-gray-800">优质酒店</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-3 rounded-lg hover:bg-purple-50 transition-all cursor-pointer group/item">
                <span className="text-gray-700 font-medium group-hover/item:text-purple-600">五星级酒店</span>
                <span className="text-purple-600 font-bold text-xl">¥599<span className="text-sm font-normal">起</span></span>
              </li>
              <li className="flex justify-between items-center p-3 rounded-lg hover:bg-purple-50 transition-all cursor-pointer group/item">
                <span className="text-gray-700 font-medium group-hover/item:text-purple-600">四星级酒店</span>
                <span className="text-purple-600 font-bold text-xl">¥299<span className="text-sm font-normal">起</span></span>
              </li>
              <li className="flex justify-between items-center p-3 rounded-lg hover:bg-purple-50 transition-all cursor-pointer group/item">
                <span className="text-gray-700 font-medium group-hover/item:text-purple-600">精品民宿</span>
                <span className="text-purple-600 font-bold text-xl">¥199<span className="text-sm font-normal">起</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 服务优势 - 渐变背景 */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-3 text-gray-800">为什么选择我们</h2>
            <p className="text-gray-500 text-lg">专业服务，值得信赖</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                💰
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">价格优惠</h3>
              <p className="text-gray-600 leading-relaxed">超低价格保证，让您的旅行更实惠</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                🛡️
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">安全保障</h3>
              <p className="text-gray-600 leading-relaxed">7x24小时客服，全程保障您的权益</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                ⚡
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">快速便捷</h3>
              <p className="text-gray-600 leading-relaxed">一键预订，快速出票，省时省心</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                🎁
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">优质服务</h3>
              <p className="text-gray-600 leading-relaxed">专业团队，贴心服务，让旅行更完美</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

