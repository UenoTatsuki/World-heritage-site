/**
 * App.tsx
 * アプリ全体のルーティングを管理するエントリーポイント
 * React RouterでURLとページコンポーネントを対応付ける
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SiteDetail from './pages/SiteDetail.tsx'
import Wishlist from './pages/Wishlist'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/site/:id" element={<SiteDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App