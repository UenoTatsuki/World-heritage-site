/**
 * CategorySidebar.tsx
 * 多階層カテゴリー検索のサイドバー（地域・分類・登録年代）
 * 大分類をクリックで開閉、小分類で絞り込む。件数はデータから自動集計する
 * 選択状態はfilterStore（Zustand）と連携する
 */
import { useState } from 'react'
import { useFilterStore } from '../../store/filterStore'
import type { HeritageItem, Region, Category } from '../../types/heritage'

interface Props {
  sites: HeritageItem[]
}

const REGIONS: Region[] = [
  'Africa',
  'Arab States',
  'Asia and the Pacific',
  'Europe and North America',
  'Latin America and the Caribbean',
]

const REGION_LABEL: Record<Region, string> = {
  'Africa': 'アフリカ',
  'Arab States': 'アラブ諸国',
  'Asia and the Pacific': 'アジア・太平洋',
  'Europe and North America': 'ヨーロッパ・北米',
  'Latin America and the Caribbean': 'ラテンアメリカ・カリブ',
}

const CATEGORIES: Category[] = ['Cultural', 'Natural', 'Mixed']
const CATEGORY_LABEL: Record<Category, string> = {
  'Cultural': '文化遺産',
  'Natural': '自然遺産',
  'Mixed': '複合遺産',
}

const DECADES = [1970, 1980, 1990, 2000, 2010, 2020]

const CategorySidebar = ({ sites }: Props) => {
  // どの大分類が開いているか
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    region: true,
    category: false,
    decade: false,
  })

  const {
    region, category, decade,
    setRegion, setCategory, setDecade, reset,
  } = useFilterStore()

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // 件数を数えるヘルパー
  const countByRegion = (r: Region) => sites.filter((s) => s.region === r).length
  const countByCategory = (c: Category) => sites.filter((s) => s.category === c).length
  const countByDecade = (d: number) =>
    sites.filter((s) => Math.floor(s.date_inscribed / 10) * 10 === d).length

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs tracking-[0.1em] text-gray-400 uppercase">カテゴリー</h2>
        <button
          onClick={reset}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          リセット
        </button>
      </div>

      {/* 地域 */}
      <div className="mb-2">
        <button
          onClick={() => toggleGroup('region')}
          className="w-full flex items-center justify-between text-sm text-gray-800 py-2 px-2 rounded-lg hover:bg-gray-50"
        >
          地域
          <span className={`text-gray-400 transition-transform ${openGroups.region ? 'rotate-90' : ''}`}>›</span>
        </button>
        {openGroups.region && (
          <div className="mt-1">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(region === r ? 'All' : r)}
                className={`w-full flex items-center justify-between text-xs py-1.5 pl-5 pr-2 rounded-lg hover:bg-gray-50 ${
                  region === r ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                <span>{REGION_LABEL[r]}</span>
                <span className="text-gray-300">{countByRegion(r)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 分類 */}
      <div className="mb-2">
        <button
          onClick={() => toggleGroup('category')}
          className="w-full flex items-center justify-between text-sm text-gray-800 py-2 px-2 rounded-lg hover:bg-gray-50"
        >
          分類
          <span className={`text-gray-400 transition-transform ${openGroups.category ? 'rotate-90' : ''}`}>›</span>
        </button>
        {openGroups.category && (
          <div className="mt-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(category === c ? 'All' : c)}
                className={`w-full flex items-center justify-between text-xs py-1.5 pl-5 pr-2 rounded-lg hover:bg-gray-50 ${
                  category === c ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                <span>{CATEGORY_LABEL[c]}</span>
                <span className="text-gray-300">{countByCategory(c)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 登録年代 */}
      <div className="mb-2">
        <button
          onClick={() => toggleGroup('decade')}
          className="w-full flex items-center justify-between text-sm text-gray-800 py-2 px-2 rounded-lg hover:bg-gray-50"
        >
          登録年代
          <span className={`text-gray-400 transition-transform ${openGroups.decade ? 'rotate-90' : ''}`}>›</span>
        </button>
        {openGroups.decade && (
          <div className="mt-1">
            {DECADES.map((d) => (
              <button
                key={d}
                onClick={() => setDecade(decade === d ? 'All' : d)}
                className={`w-full flex items-center justify-between text-xs py-1.5 pl-5 pr-2 rounded-lg hover:bg-gray-50 ${
                  decade === d ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                <span>{d}年代</span>
                <span className="text-gray-300">{countByDecade(d)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

export default CategorySidebar