/**
 * AuthContext.tsx
 * ログイン状態をアプリ全体で共有するための仕組み（React Context）
 * Firebaseの認証状態を監視し、現在のユーザー情報を提供する
 */
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ログイン状態の変化を監視する
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// 他のコンポーネントからログイン状態を簡単に使うためのhook
export const useAuth = () => useContext(AuthContext)