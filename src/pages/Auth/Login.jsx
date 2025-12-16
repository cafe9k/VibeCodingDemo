import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

function Login() {
  const navigate = useNavigate()
  const signIn = useAuthStore(state => state.signIn)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await signIn(formData.email, formData.password)
      navigate('/')
    } catch (err) {
      setError(err.message || '登录失败，请检查邮箱和密码')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-[calc(100vh-16rem)] bg-ctrip-bg flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-ctrip-xl shadow-modal p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-ctrip-gray-dark">登录</h2>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-ctrip-error text-ctrip-error p-4 mb-6 rounded">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-ctrip-gray mb-2">
              邮箱
            </label>
            <input
              type="email"
              placeholder="请输入邮箱"
              className="input-ctrip"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-sm font-medium text-ctrip-gray mb-2">
              密码
            </label>
            <input
              type="password"
              placeholder="请输入密码"
              className="input-ctrip"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          
          <div className="text-right mb-6">
            <a href="#" className="text-sm text-ctrip-blue hover:text-ctrip-dark-blue transition-smooth">
              忘记密码？
            </a>
          </div>
          
          <button type="submit" className="btn-ctrip w-full py-3 mb-6" disabled={loading}>
            {loading ? <span className="loading loading-spinner text-white"></span> : '登录'}
          </button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ctrip-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-ctrip-gray-light">或</span>
          </div>
        </div>
        
        <div className="text-center">
          <span className="text-sm text-ctrip-gray">还没有账号？</span>
          <Link to="/register" className="text-sm text-ctrip-blue hover:text-ctrip-dark-blue font-medium ml-2 transition-smooth">
            立即注册
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

