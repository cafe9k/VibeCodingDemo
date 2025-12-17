import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'

function AuthCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [message, setMessage] = useState('正在验证您的邮箱...')

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // 获取 URL 中的 hash 参数
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const type = hashParams.get('type')

        if (type === 'signup' || type === 'recovery') {
          if (accessToken && refreshToken) {
            // 设置 session
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            })

            if (error) throw error

            setStatus('success')
            setMessage('邮箱验证成功！正在跳转...')
            
            // 3秒后跳转到首页
            setTimeout(() => {
              navigate('/')
            }, 3000)
          } else {
            throw new Error('验证链接无效')
          }
        } else {
          // 如果不是预期的验证类型，直接跳转到登录页
          navigate('/login')
        }
      } catch (error) {
        console.error('邮箱验证失败:', error)
        setStatus('error')
        setMessage('邮箱验证失败：' + (error.message || '请稍后重试'))
        
        // 5秒后跳转到登录页
        setTimeout(() => {
          navigate('/login')
        }, 5000)
      }
    }

    handleEmailVerification()
  }, [navigate])

  return (
    <div className="min-h-[calc(100vh-16rem)] bg-ctrip-bg flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ctrip-blue"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                验证中...
              </h2>
              <p className="text-gray-600">
                {message}
              </p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                验证成功！
              </h2>
              <p className="text-gray-600">
                {message}
              </p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                验证失败
              </h2>
              <p className="text-gray-600 mb-4">
                {message}
              </p>
              <button
                onClick={() => navigate('/login')}
                className="btn-ctrip px-6 py-2"
              >
                返回登录
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthCallback

