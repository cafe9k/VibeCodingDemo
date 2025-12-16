import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

function Profile() {
  const navigate = useNavigate()
  const { user, loading } = useAuthStore()
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }
  
  if (!user) {
    return null
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">个人中心</h1>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">基本信息</h2>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">邮箱</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                value={user.email}
                disabled
              />
            </div>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">昵称</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={user.user_metadata?.nickname || '未设置'}
                disabled
              />
            </div>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">注册时间</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={new Date(user.created_at).toLocaleDateString()}
                disabled
              />
            </div>
            
            <div className="card-actions justify-end mt-6">
              <button className="btn btn-primary" disabled>
                编辑资料（开发中）
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

