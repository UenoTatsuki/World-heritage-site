/**
 * App.tsx
 * アプリ全体のルーティングを管理するエントリーポイント
 * 共通ヘッダーを全ページに表示し、各ページへのルートを定義する
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/ui/Header'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import ListPage from './pages/ListPage'
import SiteDetail from './pages/SiteDetail'
import Wishlist from './pages/Wishlist'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/site/:id" element={<SiteDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App