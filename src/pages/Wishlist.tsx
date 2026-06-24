/**
 * Wishlist.tsx
 * お気に入り登録した世界遺産だけを一覧表示するページ
 * useWishlistのIDリストとuseHeritageの全データを照合して表示する
 */
import { useNavigate } from 'react-router-dom'
import { useHeritage } from '../hooks/useHeritage'
import { useWishlist } from '../hooks/useWishlist'
import SiteCard from '../components/ui/SiteCard'
import type { HeritageItem } from '../types/heritage'

const Wishlist = () => {
  const navigate = useNavigate()
  const { sites, loading } = useHeritage()
  const { wishlist, loading: wishlistLoading } = useWishlist()

  // お気に入り登録されている遺産だけに絞り込む
  const wishlistedSites = sites.filter((site) => wishlist.includes(site.id))

  const handleSelectSite = (site: HeritageItem) => {
    navigate(`/site/${site.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-14">

      {/* ヘッダー */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ← 戻る
        </button>
        <h1 className="text-lg font-bold text-gray-800">❤️ 行きたいリスト</h1>
      </header>

      {/* コンテンツ */}
      <div className="max-w-4xl mx-auto p-6">
        {loading || wishlistLoading ? (
          <p className="text-sm text-gray-400 text-center mt-12">読み込み中...</p>
        ) : wishlistedSites.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-3">
            <p className="text-gray-400">まだ行きたいリストに登録がありません</p>
            <button
              onClick={() => navigate('/')}
              className="text-blue-500 underline text-sm"
            >
              遺産を探しに行く
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistedSites.map((site) => (
              <SiteCard key={site.id} site={site} onClick={handleSelectSite} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist