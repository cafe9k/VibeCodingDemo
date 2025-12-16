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
    <header className="bg-primary text-primary-content sticky top-0 z-50 shadow-lg">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            携程旅行
          </Link>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/flight">机票</Link></li>
            <li><Link to="/hotel">酒店</Link></li>
            <li><Link to="/train">火车票</Link></li>
          </ul>
        </div>
        
        <div className="navbar-end gap-2">
          {user ? (
            <>
              <Link to="/orders" className="btn btn-ghost btn-sm">
                我的订单
              </Link>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span>{user.email?.charAt(0).toUpperCase()}</span>
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box w-52">
                  <li><Link to="/profile">个人中心</Link></li>
                  <li><Link to="/orders">我的订单</Link></li>
                  <li><button onClick={handleLogout}>退出登录</button></li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">
                登录
              </Link>
              <Link to="/register" className="btn btn-sm">
                注册
              </Link>
            </>
          )}
        </div>
        
        {/* 移动端菜单 */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-base-content rounded-box w-52">
            <li><Link to="/flight">机票</Link></li>
            <li><Link to="/hotel">酒店</Link></li>
            <li><Link to="/train">火车票</Link></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header

