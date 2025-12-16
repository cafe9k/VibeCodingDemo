import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-ctrip-gray-dark text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">关于携程</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-ctrip-orange transition-smooth">
                  关于我们
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-ctrip-orange transition-smooth">
                  联系我们
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-ctrip-orange transition-smooth">
                  加入我们
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">服务指南</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-ctrip-orange transition-smooth">
                  预订帮助
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-ctrip-orange transition-smooth">
                  支付方式
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-ctrip-orange transition-smooth">
                  退改政策
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">客户服务</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-ctrip-orange transition-smooth">
                  客服中心
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-ctrip-orange transition-smooth">
                  投诉建议
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-ctrip-orange transition-smooth">
                  常见问题
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">关注我们</h3>
            <p className="text-sm text-gray-400 mb-2">客服电话</p>
            <p className="font-bold text-2xl text-ctrip-orange mb-4">400-123-4567</p>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-ctrip-blue transition-smooth flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-ctrip-blue transition-smooth flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2024 携程旅行 Demo. All rights reserved. | MVP项目仅供学习使用
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

