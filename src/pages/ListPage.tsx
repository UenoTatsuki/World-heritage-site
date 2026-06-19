/**
 * ListPage.tsx
 * 一覧専用ページ：左に多階層カテゴリー、右に絞り込みグリッド
 * listFilterStoreの複数選択条件（地域・分類・登録年代）で絞り込む
 */
import { useHeritage } from '../hooks/useHeritage'
import { useListFilterStore } from '../store/listFilterStore'
import CategorySidebar from '../components/ui/CategorySidebar'
import HeritageGrid from '../components/ui/HeritageGrid'
import ActiveFilterTags from '../components/ui/ActiveFilterTags'

const ListPage = () => {
  const { sites, loading, error } = useHeritage()
  const { regions, categories, decades } = useListFilterStore()

  // 絞り込み（各カテゴリーは「配列が空 = 条件なし」、選択ありなら「どれかに一致」）
  const filtered = sites.filter((site) => {
    const matchRegion =
      regions.length === 0 || regions.includes(site.region as never)
    const matchCategory =
      categories.length === 0 || categories.includes(site.category)
    const matchDecade =
      decades.length === 0 ||
      decades.includes(Math.floor(site.date_inscribed / 10) * 10)
    return matchRegion && matchCategory && matchDecade
  })

  return (
    <div className="min-h-screen bg-white pt-14">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">世界遺産を探す</h1>
        <p className="text-sm text-gray-400 mb-8">カテゴリーで絞り込んで探せます</p>

        <div className="flex gap-10">
          <div className="w-52 flex-shrink-0">
            <div className="sticky top-20">
              <CategorySidebar sites={sites} />
            </div>
          </div>

          <div className="flex-1">
            <ActiveFilterTags />
            {error ? (
              <p className="text-red-500 py-20 text-center">エラー: {error}</p>
            ) : loading ? (
              <p className="text-gray-400 py-20 text-center">読み込み中...</p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-400 py-20 text-center">該当する遺産が見つかりません</p>
            ) : (
              <HeritageGrid sites={filtered} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListPage