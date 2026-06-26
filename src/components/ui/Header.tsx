/**
 * Header.tsx
 * 全ページ共通の上部ナビゲーションバー
 * PCではタブを横並び、スマホではハンバーガーメニューで開閉する
 * トップのヒーロー上では透明、スクロールで半透明の白に切り替わる
 */
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'

const Header = () => {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()
  const HEADER_DELAY = 2.5

  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ページが変わったらメニューを閉じる
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const transparent = isHome && !scrolled && !menuOpen

  const handleLogout = async () => {
    await signOut(auth)
    setMenuOpen(false)
  }

  const tabs = [
    { path: '/', label: 'Home' },
    { path: '/list', label: 'List' },
    { path: '/map', label: 'Map' },
    { path: '/wishlist', label: 'Wishlist' },
  ]

  // タブのリンク色（PC/スマホ共通のロジック）
  const tabClass = (active: boolean) =>
    `text-sm transition-colors ${
      transparent
        ? active ? 'text-white font-medium' : 'text-white/70 hover:text-white'
        : active ? 'text-gray-900 font-medium' : 'text-gray-400 hover:text-gray-600'
    }`

  return (
    <motion.header
      initial={{ opacity: isHome ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: isHome ? HEADER_DELAY : 0 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        transparent
          ? 'bg-transparent border-b border-transparent'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* ロゴ */}
        <Link
          to="/"
          className={`text-sm font-bold tracking-[0.15em] transition-colors ${
            transparent ? 'text-white' : 'text-gray-800'
          }`}
        >
          WORLD HERITAGE
        </Link>

        {/* PC用タブ（md以上で表示） */}
        <nav className="hidden md:flex gap-6 items-center">
          {tabs.map((tab) => (
            <Link key={tab.path} to={tab.path} className={tabClass(pathname === tab.path)}>
              {tab.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className={tabClass(false)}>Logout</button>
          ) : (
            <Link to="/login" className={tabClass(false)}>Login</Link>
          )}
        </nav>

        {/* スマホ用ハンバーガーボタン（md未満で表示） */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden text-2xl ${transparent ? 'text-white' : 'text-gray-800'}`}
          aria-label="メニュー"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* スマホ用メニュー（開いたとき表示） */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`text-sm ${pathname === tab.path ? 'text-gray-900 font-medium' : 'text-gray-500'}`}
            >
              {tab.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="text-sm text-gray-500 text-left">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-sm text-gray-500">
              Login
            </Link>
          )}
        </nav>
      )}
    </motion.header>
  )
}

export default Header