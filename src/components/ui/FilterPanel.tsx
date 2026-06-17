/**
 * FilterPanel.tsx
 * 地域・カテゴリ・キーワードで世界遺産を絞り込むUIコンポーネント
 * Zustandのfilterストアと連携して状態を管理する
 */
import { useFilterStore } from '../../store/filterStore'
import type { Region, Category } from '../../types/heritage'

const REGIONS: (Region | 'All')[] = [
  'All',
  'Africa',
  'Arab States',
  'Asia and the Pacific',
  'Europe and North America',
  'Latin America and the Caribbean',
]

const CATEGORIES: (Category | 'All')[] = ['All', 'Cultural', 'Natural', 'Mixed']

const FilterPanel = () => {
  const { region, category, search, setRegion, setCategory, setSearch, reset } =
    useFilterStore()

  return (
    <div className="flex flex-wrap gap-3 items-center p-4 bg-white shadow rounded-xl">
      {/* キーワード検索 */}
      <input
        type="text"
        placeholder="遺産名・国名で検索..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {/* 地域フィルター */}
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value as Region | 'All')}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {REGIONS.map((r) => (
          <option key={r} value={r}>
            {r === 'All' ? '全地域' : r}
          </option>
        ))}
      </select>

      {/* カテゴリフィルター */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category | 'All')}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c === 'All' ? '全カテゴリ' : c}
          </option>
        ))}
      </select>

      {/* リセットボタン */}
      <button
        onClick={reset}
        className="text-sm text-gray-400 hover:text-gray-600 underline"
      >
        リセット
      </button>
    </div>
  )
}

export default FilterPanel