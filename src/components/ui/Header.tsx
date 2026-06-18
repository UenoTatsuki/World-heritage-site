/**
 * Header.tsx
 * 全ページ共通の上部ナビゲーションバー
 * トップのヒーロー上では透明、スクロールすると半透明の白に切り替わる
 * 現在地のタブをハイライトする
 */
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  // トップページかどうか（ヒーローがあるページ）
  const isHome = pathname === '/'

  // スクロール位置を監視する
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 背景を透明にするか（トップの最上部だけ透明）
  const transparent = isHome && !scrolled

  const tabs = [
    { path: '/', label: 'Home' },
    { path: '/map', label: 'Map' },
    { path: '/wishlist', label: 'Wishlist' },
  ]

  return (
    <header
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

        {/* タブ */}
        <nav className="flex gap-6">
          {tabs.map((tab) => {
            const active = pathname === tab.path
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`text-sm transition-colors ${
                  transparent
                    ? active
                      ? 'text-white font-medium'
                      : 'text-white/70 hover:text-white'
                    : active
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header