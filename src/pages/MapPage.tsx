/**
 * MapPage.tsx
 * 地図専用ページ：世界地図＋フィルター＋カード一覧
 * 以前トップにあった地図機能をここに分離した
 */
import { useNavigate } from 'react-router-dom'
import { useHeritage } from '../hooks/useHeritage'
import { useFilterStore } from '../store/filterStore'
import WorldMap from '../components/map/WorldMap'
import FilterPanel from '../components/ui/FilterPanel'
import SiteCard from '../components/ui/SiteCard'
import type { HeritageItem } from '../types/heritage'

const MapPage = () => {
  const navigate = useNavigate()
  const { sites, loading, error } = useHeritage()
  const { region, category, search } = useFilterStore()

  const filtered = sites.filter((site) => {
    const matchRegion   = region === 'All' || site.region === region
    const matchCategory = category === 'All' || site.category === category
    const matchSearch   = search === '' ||
      site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.country.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchCategory && matchSearch
  })

  const handleSelectSite = (site: HeritageItem) => {
    navigate(`/site/${site.id}`)
  }

  if (error) return (
    <div className="flex items-center justify-center h-screen text-red-500">
      エラー: {error}
    </div>
  )

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-gray-50 pt-14">
      <div className="px-4 pt-4">
        <FilterPanel />
      </div>

      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        <div className="flex-1 rounded-xl overflow-hidden shadow">
          {loading ? (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
              データ読み込み中...
            </div>
          ) : (
            <WorldMap sites={filtered} onSelectSite={handleSelectSite} />
          )}
        </div>

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

export default MapPage