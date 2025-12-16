import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

function Header() {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()
  
  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('退出登录失败:', error)
    }
  }
  
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 sticky top-0 z-50 shadow-xl backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - 更加精致 */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 text-white text-2xl font-bold hover:opacity-90 transition-all group">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-sm">
                <span className="text-2xl">✈️</span>
              </div>
              <span className="hidden sm:block">无线旅行</span>
            </Link>
          </div>
          
          {/* 导航菜单 - 更现代的设计 */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link 
              to="/flight" 
              className="px-5 py-2.5 text-white font-semibold rounded-lg hover:bg-white/10 relative group transition-all"
            >
              <span className="relative z-10">✈️ 机票</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-orange-400 rounded-full group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link 
              to="/hotel" 
              className="px-5 py-2.5 text-white font-semibold rounded-lg hover:bg-white/10 relative group transition-all"
            >
              <span className="relative z-10">🏨 酒店</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-orange-400 rounded-full group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link 
              to="/train" 
              className="px-5 py-2.5 text-white font-semibold rounded-lg hover:bg-white/10 relative group transition-all"
            >
              <span className="relative z-10">🚄 火车票</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-orange-400 rounded-full group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
          </nav>
          
          {/* 用户区域 - 现代化设计 */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link 
                  to="/orders" 
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                >
                  <span>📋</span>
                  <span>我的订单</span>
                </Link>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-circle bg-white/20 hover:bg-white/30 border-0 text-white backdrop-blur-sm">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-lg font-bold">{user.email?.charAt(0).toUpperCase()}</span>
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-4 z-[1] p-3 shadow-2xl menu dropdown-content bg-white rounded-xl w-56 border border-gray-100">
                    <li><Link to="/profile" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-3 font-medium">👤 个人中心</Link></li>
                    <li><Link to="/orders" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-3 font-medium">📋 我的订单</Link></li>
                    <li><button onClick={handleLogout} className="text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg py-3 font-medium">🚪 退出登录</button></li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white font-semibold hover:text-white/90 transition-all px-5 py-2.5 rounded-lg hover:bg-white/10"
                >
                  登录
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  注册
                </Link>
              </>
            )}
            
            {/* 移动端菜单按钮 - 优化设计 */}
            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} className="btn btn-circle bg-white/20 hover:bg-white/30 border-0 text-white backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-white rounded-xl w-56 border border-gray-100">
                <li><Link to="/flight" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-3 font-medium">✈️ 机票</Link></li>
                <li><Link to="/hotel" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg py-3 font-medium">🏨 酒店</Link></li>
                <li><Link to="/train" className="text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg py-3 font-medium">🚄 火车票</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

