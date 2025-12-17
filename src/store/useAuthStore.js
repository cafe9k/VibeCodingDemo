import { create } from 'zustand'
import { supabase } from '../services/supabase'

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      set({ session, user: session?.user || null, loading: false })
      
      // 监听认证状态变化
      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, user: session?.user || null })
      })
    } catch (error) {
      console.error('初始化认证失败:', error)
      set({ loading: false })
    }
  },
  
  signUp: async (email, password, nickname) => {
    // 根据环境动态设置重定向 URL
    const redirectTo = import.meta.env.PROD 
      ? 'https://cafe9k.github.io/VibeCodingDemo/auth/callback'
      : 'http://test.ctripcorp.com:5173/auth/callback'
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          nickname,
        },
      },
    })
    if (error) throw error
    return data
  },
  
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },
  
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    set({ user: null, session: null })
  },
}))

export default useAuthStore

