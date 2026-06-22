/**
 * SiteCard.tsx
 * 世界遺産1件分の情報を表示するカードコンポーネント
 * Framer Motionでスクロールアニメーション、ハートボタンでお気に入り登録を実装
 */
import { motion } from 'framer-motion'
import { useWishlist } from '../../hooks/useWishlist'
import type { HeritageItem } from '../../types/heritage'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface Props {
  site: HeritageItem
  onClick: (site: HeritageItem) => void
}

const categoryColor = (category: HeritageItem['category']) => {
  switch (category) {
    case 'Cultural': return 'bg-blue-100 text-blue-700'
    case 'Natural':  return 'bg-green-100 text-green-700'
    case 'Mixed':    return 'bg-purple-100 text-purple-700'
  }
}

const categoryLabel = (category: HeritageItem['category']) => {
  switch (category) {
    case 'Cultural': return '文化遺産'
    case 'Natural':  return '自然遺産'
    case 'Mixed':    return '複合遺産'
  }
}

const SiteCard = ({ site, onClick }: Props) => {
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(site.id)
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(site)}
      className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* お気に入りボタン */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (!user) {
            navigate('/login')
            return
          }
          toggleWishlist(site.id)
        }}
        className="absolute top-3 right-3 text-lg"
        aria-label="お気に入りに追加"
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      {/* カテゴリバッジ */}
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColor(site.category)}`}>
        {categoryLabel(site.category)}
      </span>

      {/* 遺産名 */}
      <h3 className="mt-2 text-sm font-bold text-gray-800 line-clamp-2 pr-6">
        {site.name_ja}
      </h3>

      {/* 国名・登録年 */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
        <span>{site.country}</span>
        <span>{site.date_inscribed}年登録</span>
      </div>
    </motion.div>
  )
}

export default SiteCard