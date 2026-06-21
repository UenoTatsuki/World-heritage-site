/**
 * HeritageGrid.tsx
 * 世界遺産をタイル状に並べる新着グリッド
 * 画像がない場合はカテゴリー別の色プレースホルダーを表示する
 * スクロールで画面に入ると順番にフェードアップする
 */
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { HeritageItem } from '../../types/heritage'
import LazyImage from './LazyImage'

interface Props {
  sites: HeritageItem[]
  title?: string
  subtitle?: string
}

const categoryLabel = (category: HeritageItem['category']) => {
  switch (category) {
    case 'Cultural': return '文化遺産'
    case 'Natural':  return '自然遺産'
    case 'Mixed':    return '複合遺産'
  }
}

const HeritageGrid = ({ sites, title, subtitle }: Props) => {
  const navigate = useNavigate()

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{title}</h2>
      )}
      {subtitle && (
        <p className="text-sm text-gray-400 mb-10 text-center">{subtitle}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            onClick={() => navigate(`/site/${site.id}`)}
            className="group cursor-pointer"
          >
            {/* 画像エリア（今は色プレースホルダー） */}
            <LazyImage site={site} />

            {/* キャプション */}
            <div className="mt-3">
              <p className="text-xs text-gray-400">{categoryLabel(site.category)}</p>
              <h3 className="text-sm font-bold text-gray-800 mt-1 line-clamp-1">
                {site.name_ja}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {site.country} · {site.date_inscribed}年
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default HeritageGrid