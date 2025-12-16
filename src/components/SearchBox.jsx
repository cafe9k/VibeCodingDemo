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
              <div className="flex gap-4 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    className="w-4 h-4 text-ctrip-blue focus:ring-ctrip-blue"
                    checked={searchData.tripType === 'oneWay'}
                    onChange={() => handleChange('tripType', 'oneWay')}
                  />
                  <span className="text-ctrip-gray font-medium">单程</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    className="w-4 h-4 text-ctrip-blue focus:ring-ctrip-blue"
                    checked={searchData.tripType === 'roundTrip'}
                    onChange={() => handleChange('tripType', 'roundTrip')}
                  />
                  <span className="text-ctrip-gray font-medium">往返</span>
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ctrip-gray mb-2">
                    出发城市
                  </label>
                  <input
                    type="text"
                    placeholder="请输入城市"
                    className="input-ctrip"
                    value={searchData.from}
                    onChange={(e) => handleChange('from', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-ctrip-gray mb-2">
                    到达城市
                  </label>
                  <input
                    type="text"
                    placeholder="请输入城市"
                    className="input-ctrip"
                    value={searchData.to}
                    onChange={(e) => handleChange('to', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-ctrip-gray mb-2">
                    出发日期
                  </label>
                  <input
                    type="date"
                    className="input-ctrip"
                    value={searchData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    required
                  />
                </div>
                
                {searchData.tripType === 'roundTrip' && (
                  <div>
                    <label className="block text-sm font-medium text-ctrip-gray mb-2">
                      返程日期
                    </label>
                    <input
                      type="date"
                      className="input-ctrip"
                      value={searchData.returnDate}
                      onChange={(e) => handleChange('returnDate', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          
          {type === 'hotel' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  城市
                </label>
                <input
                  type="text"
                  placeholder="请输入城市"
                  className="input-ctrip"
                  value={searchData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  入住日期
                </label>
                <input
                  type="date"
                  className="input-ctrip"
                  value={searchData.checkIn}
                  onChange={(e) => handleChange('checkIn', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  离店日期
                </label>
                <input
                  type="date"
                  className="input-ctrip"
                  value={searchData.checkOut}
                  onChange={(e) => handleChange('checkOut', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  关键词
                </label>
                <input
                  type="text"
                  placeholder="酒店名称/地标"
                  className="input-ctrip"
                  value={searchData.keyword}
                  onChange={(e) => handleChange('keyword', e.target.value)}
                />
              </div>
            </div>
          )}
          
          {type === 'train' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  出发站
                </label>
                <input
                  type="text"
                  placeholder="请输入车站"
                  className="input-ctrip"
                  value={searchData.from}
                  onChange={(e) => handleChange('from', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  到达站
                </label>
                <input
                  type="text"
                  placeholder="请输入车站"
                  className="input-ctrip"
                  value={searchData.to}
                  onChange={(e) => handleChange('to', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ctrip-gray mb-2">
                  出发日期
                </label>
                <input
                  type="date"
                  className="input-ctrip"
                  value={searchData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-center mt-8">
            <button type="submit" className="btn-ctrip px-16 py-4 text-lg font-bold">
              搜索
            </button>
          </div>
        </form>
    </div>
  )
}

export default SearchBox

