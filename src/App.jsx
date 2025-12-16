import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import FlightSearch from './pages/Flight/FlightSearch'
import FlightList from './pages/Flight/FlightList'
import FlightDetail from './pages/Flight/FlightDetail'
import HotelSearch from './pages/Hotel/HotelSearch'
import HotelList from './pages/Hotel/HotelList'
import HotelDetail from './pages/Hotel/HotelDetail'
import TrainSearch from './pages/Train/TrainSearch'
import TrainList from './pages/Train/TrainList'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/User/Profile'
import Orders from './pages/User/Orders'
import useAuthStore from './store/useAuthStore'

function App() {
  const initialize = useAuthStore(state => state.initialize)
  
  useEffect(() => {
    // 初始化认证状态
    initialize()
  }, [initialize])
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* 机票路由 */}
          <Route path="/flight" element={<FlightSearch />} />
          <Route path="/flight/list" element={<FlightList />} />
          <Route path="/flight/:id" element={<FlightDetail />} />
          
          {/* 酒店路由 */}
          <Route path="/hotel" element={<HotelSearch />} />
          <Route path="/hotel/list" element={<HotelList />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          
          {/* 火车票路由 */}
          <Route path="/train" element={<TrainSearch />} />
          <Route path="/train/list" element={<TrainList />} />
          
          {/* 用户认证路由 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* 用户中心路由 */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

