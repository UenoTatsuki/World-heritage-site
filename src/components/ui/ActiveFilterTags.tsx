/**
 * ActiveFilterTags.tsx
 * 一覧ページで選択中のフィルター条件をタグ表示する
 * 各タグの×で個別解除、「すべて解除」で一括リセット
 * listFilterStoreの状態を読み、解除も同storeの関数を再利用する
 */
import { useListFilterStore } from '../../store/listFilterStore'
import type { Region, Category } from '../../types/heritage'

const REGION_LABEL: Record<Region, string> = {
  'Africa': 'アフリカ',
  'Arab States': 'アラブ諸国',
  'Asia and the Pacific': 'アジア・太平洋',
  'Europe and North America': 'ヨーロッパ・北米',
  'Latin America and the Caribbean': 'ラテンアメリカ・カリブ',
}

const CATEGORY_LABEL: Record<Category, string> = {
  'Cultural': '文化遺産',
  'Natural': '自然遺産',
  'Mixed': '複合遺産',
}

const ActiveFilterTags = () => {
  const {
    regions, categories, decades,
    toggleRegion, toggleCategory, toggleDecade, reset,
  } = useListFilterStore()

  const hasAny = regions.length + categories.length + decades.length > 0

  // 何も選ばれていなければ表示しない
  if (!hasAny) return null

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 border-b border-gray-100">
      <span className="text-xs text-gray-400 mr-1">絞り込み中:</span>

      {regions.map((r) => (
        <Tag key={`r-${r}`} label={REGION_LABEL[r]} onRemove={() => toggleRegion(r)} />
      ))}
      {categories.map((c) => (
        <Tag key={`c-${c}`} label={CATEGORY_LABEL[c]} onRemove={() => toggleCategory(c)} />
      ))}
      {decades.map((d) => (
        <Tag key={`d-${d}`} label={`${d}年代`} onRemove={() => toggleDecade(d)} />
      ))}

      <button
        onClick={reset}
        className="text-xs text-gray-400 hover:text-gray-600 underline ml-1"
      >
        すべて解除
      </button>
    </div>
  )
}

// タグ1つ分の見た目
const Tag = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <span className="inline-flex items-center gap-1.5 text-xs pl-3 pr-1.5 py-1 rounded-full bg-blue-50 text-blue-700">
    {label}
    <button
      onClick={onRemove}
      className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
      aria-label={`${label}を解除`}
    >
      ×
    </button>
  </span>
)

export default ActiveFilterTags