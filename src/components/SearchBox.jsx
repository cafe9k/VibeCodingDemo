import { useState } from 'react'

function SearchBox({ type = 'flight', onSearch }) {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    returnDate: '',
    city: '',
    checkIn: '',
    checkOut: '',
    keyword: '',
    tripType: 'oneWay',
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchData)
    }
  }
  
  const handleChange = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }))
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
          {type === 'flight' && (
            <>
              <div className="flex gap-6 mb-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="tripType"
                    className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    checked={searchData.tripType === 'oneWay'}
                    onChange={() => handleChange('tripType', 'oneWay')}
                  />
                  <span className="text-gray-700 font-semibold group-hover:text-blue-600 transition-colors">单程</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="tripType"
                    className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    checked={searchData.tripType === 'roundTrip'}
                    onChange={() => handleChange('tripType', 'roundTrip')}
                  />
                  <span className="text-gray-700 font-semibold group-hover:text-blue-600 transition-colors">往返</span>
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    出发城市
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="请输入城市"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                      value={searchData.from}
                      onChange={(e) => handleChange('from', e.target.value)}
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">📍</span>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    到达城市
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="请输入城市"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                      value={searchData.to}
                      onChange={(e) => handleChange('to', e.target.value)}
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">📍</span>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    出发日期
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                      value={searchData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">📅</span>
                  </div>
                </div>
                
                {searchData.tripType === 'roundTrip' && (
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      返程日期
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                        value={searchData.returnDate}
                        onChange={(e) => handleChange('returnDate', e.target.value)}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">📅</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          
          {type === 'hotel' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  城市
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="请输入城市"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                    value={searchData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500">🏨</span>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  入住日期
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                    value={searchData.checkIn}
                    onChange={(e) => handleChange('checkIn', e.target.value)}
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500">📅</span>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  离店日期
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                    value={searchData.checkOut}
                    onChange={(e) => handleChange('checkOut', e.target.value)}
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500">📅</span>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  关键词
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="酒店名称/地标"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                    value={searchData.keyword}
                    onChange={(e) => handleChange('keyword', e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500">🔍</span>
                </div>
              </div>
            </div>
          )}
          
          {type === 'train' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  出发站
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="请输入车站"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                    value={searchData.from}
                    onChange={(e) => handleChange('from', e.target.value)}
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">🚄</span>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  到达站
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="请输入车站"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                    value={searchData.to}
                    onChange={(e) => handleChange('to', e.target.value)}
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">🚄</span>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  出发日期
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
                    value={searchData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">📅</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-center mt-10">
            <button 
              type="submit" 
              className="group relative px-20 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>🔍</span>
                搜索
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </form>
    </div>
  )
}

export default SearchBox

