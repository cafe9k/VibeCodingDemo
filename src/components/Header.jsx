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
    <header className="bg-gradient-to-r from-ctrip-dark-blue to-ctrip-blue sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold hover:opacity-90 transition-opacity">
              携程旅行
            </Link>
          </div>
          
          {/* 导航菜单 */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/flight" 
              className="text-white font-medium hover:text-white/90 relative group py-2 transition-smooth"
            >
              机票
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ctrip-orange group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/hotel" 
              className="text-white font-medium hover:text-white/90 relative group py-2 transition-smooth"
            >
              酒店
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ctrip-orange group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/train" 
              className="text-white font-medium hover:text-white/90 relative group py-2 transition-smooth"
            >
              火车票
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ctrip-orange group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
          
          {/* 用户区域 */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link 
                  to="/orders" 
                  className="hidden sm:block text-white hover:text-white/90 transition-smooth"
                >
                  我的订单
                </Link>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-circle btn-ghost text-white border-2 border-white/30 hover:border-white/50">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-lg font-semibold">{user.email?.charAt(0).toUpperCase()}</span>
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-modal menu menu-sm dropdown-content bg-white rounded-ctrip-lg w-52">
                    <li><Link to="/profile" className="text-ctrip-gray hover:text-ctrip-blue">个人中心</Link></li>
                    <li><Link to="/orders" className="text-ctrip-gray hover:text-ctrip-blue">我的订单</Link></li>
                    <li><button onClick={handleLogout} className="text-ctrip-gray hover:text-ctrip-error">退出登录</button></li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-white/90 transition-smooth px-4 py-2 rounded-ctrip-md"
                >
                  登录
                </Link>
                <Link 
                  to="/register" 
                  className="bg-ctrip-orange text-white px-5 py-2 rounded-ctrip-md font-medium hover:bg-[#E65500] transition-smooth shadow-md hover:shadow-lg"
                >
                  注册
                </Link>
              </>
            )}
            
            {/* 移动端菜单按钮 */}
            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} className="btn btn-circle btn-ghost text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-modal bg-white rounded-ctrip-lg w-52">
                <li><Link to="/flight" className="text-ctrip-gray hover:text-ctrip-blue">机票</Link></li>
                <li><Link to="/hotel" className="text-ctrip-gray hover:text-ctrip-blue">酒店</Link></li>
                <li><Link to="/train" className="text-ctrip-gray hover:text-ctrip-blue">火车票</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

