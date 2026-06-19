/**
 * SiteDetail.tsx
 * 世界遺産1件分の詳細を表示するページ
 * URLパラメータのidを使って該当する遺産データを探し出す
 */
import { useParams, useNavigate } from 'react-router-dom'
import { useHeritage } from '../hooks/useHeritage'

const categoryLabel = (category: string) => {
  switch (category) {
    case 'Cultural': return '文化遺産'
    case 'Natural':  return '自然遺産'
    case 'Mixed':    return '複合遺産'
    default: return category
  }
}

const SiteDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { sites, loading } = useHeritage()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        読み込み中...
      </div>
    )
  }

  const site = sites.find((s) => s.id === Number(id))

  if (!site) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-gray-500">該当する遺産が見つかりませんでした</p>
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 underline text-sm"
        >
          トップに戻る
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-14">

      {/* ヘッダー */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ← 戻る
        </button>
        <h1 className="text-lg font-bold text-gray-800">遺産の詳細</h1>
      </header>

      {/* コンテンツ */}
      <div className="max-w-2xl mx-auto p-6">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
          {categoryLabel(site.category)}
        </span>

        <h2 className="text-2xl font-bold text-gray-800 mt-3">
          {site.name_ja}
        </h2>

        <div className="flex gap-4 mt-2 text-sm text-gray-400">
          <span>{site.country}</span>
          <span>{site.date_inscribed}年登録</span>
          <span>{site.region}</span>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-700 mb-2">概要</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {site.short_description || '説明文がまだ登録されていません。'}
          </p>

          {site.description && (
            <>
              <h3 className="text-sm font-bold text-gray-700 mt-6 mb-2">登録基準・詳細</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {site.description}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SiteDetail