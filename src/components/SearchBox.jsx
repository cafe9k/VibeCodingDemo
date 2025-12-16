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
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {type === 'flight' && (
            <>
              <div className="flex gap-2 mb-4">
                <label className="label cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="tripType"
                    className="radio radio-primary"
                    checked={searchData.tripType === 'oneWay'}
                    onChange={() => handleChange('tripType', 'oneWay')}
                  />
                  <span className="label-text">单程</span>
                </label>
                <label className="label cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="tripType"
                    className="radio radio-primary"
                    checked={searchData.tripType === 'roundTrip'}
                    onChange={() => handleChange('tripType', 'roundTrip')}
                  />
                  <span className="label-text">往返</span>
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">出发城市</span>
                  </label>
                  <input
                    type="text"
                    placeholder="北京"
                    className="input input-bordered"
                    value={searchData.from}
                    onChange={(e) => handleChange('from', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">到达城市</span>
                  </label>
                  <input
                    type="text"
                    placeholder="上海"
                    className="input input-bordered"
                    value={searchData.to}
                    onChange={(e) => handleChange('to', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">出发日期</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={searchData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    required
                  />
                </div>
                
                {searchData.tripType === 'roundTrip' && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">返程日期</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered"
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">城市</span>
                </label>
                <input
                  type="text"
                  placeholder="请输入城市"
                  className="input input-bordered"
                  value={searchData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">入住日期</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={searchData.checkIn}
                  onChange={(e) => handleChange('checkIn', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">离店日期</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={searchData.checkOut}
                  onChange={(e) => handleChange('checkOut', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">关键词</span>
                </label>
                <input
                  type="text"
                  placeholder="酒店名称/地标"
                  className="input input-bordered"
                  value={searchData.keyword}
                  onChange={(e) => handleChange('keyword', e.target.value)}
                />
              </div>
            </div>
          )}
          
          {type === 'train' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">出发站</span>
                </label>
                <input
                  type="text"
                  placeholder="北京"
                  className="input input-bordered"
                  value={searchData.from}
                  onChange={(e) => handleChange('from', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">到达站</span>
                </label>
                <input
                  type="text"
                  placeholder="上海"
                  className="input input-bordered"
                  value={searchData.to}
                  onChange={(e) => handleChange('to', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">出发日期</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={searchData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          
          <div className="card-actions justify-end mt-6">
            <button type="submit" className="btn btn-primary btn-block md:btn-wide">
              搜索
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBox

