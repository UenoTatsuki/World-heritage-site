/**
 * Home.tsx
 * トップページ：世界地図とカード一覧を表示するメインページ
 * useHeritageでAPIデータを取得し、filterStoreで絞り込んだ結果を表示する
 */
import { useHeritage } from '../hooks/useHeritage'
import { useFilterStore } from '../store/filterStore'
import WorldMap from '../components/map/WorldMap'
import FilterPanel from '../components/ui/FilterPanel'
import SiteCard from '../components/ui/SiteCard'
import { useNavigate } from 'react-router-dom'
import type { HeritageItem } from '../types/heritage'

const Home = () => {
  const { sites, loading, error } = useHeritage()
  const { region, category, search } = useFilterStore()

  // フィルタリング処理
  const filtered = sites.filter((site) => {
    const matchRegion   = region === 'All' || site.region === region
    const matchCategory = category === 'All' || site.category === category
    const matchSearch   = search === '' ||
      site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.country.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchCategory && matchSearch
  })

  const navigate = useNavigate()

  const handleSelectSite = (site: HeritageItem) => {
  navigate(`/site/${site.id}`)
  }

  if (error) return (
    <div className="flex items-center justify-center h-screen text-red-500">
      エラー: {error}
    </div>
  )

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* ヘッダー */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">🌍 世界遺産マップ</h1>
        <button
          onClick={() => navigate('/wishlist')}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          ❤️ 行きたいリスト
        </button>
      </header>

      {/* フィルターパネル */}
      <div className="px-4 pt-4">
        <FilterPanel />
      </div>

      {/* メインコンテンツ */}
      <div className="flex flex-1 gap-4 p-4 overflow-hidden">

        {/* 地図エリア */}
        <div className="flex-1 rounded-xl overflow-hidden shadow">
          {loading ? (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
              データ読み込み中...
            </div>
          ) : (
            <WorldMap sites={filtered} onSelectSite={handleSelectSite} />
          )}
        </div>

        {/* カード一覧エリア */}
        <div className="w-72 overflow-y-auto flex flex-col gap-3">
          {loading ? (
            <p className="text-sm text-gray-400 text-center mt-8">読み込み中...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-gray-400 text-center mt-8">該当する遺産が見つかりません</p>
          ) : (
            filtered.map((site) => (
              <SiteCard key={site.id} site={site} onClick={handleSelectSite} />
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Home