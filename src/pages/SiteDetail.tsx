/**
 * SiteDetail.tsx
 * 世界遺産1件分の詳細ページ
 * ヒーロー画像・メタ情報・登録基準・概要文を表示する
 */
import { useParams, useNavigate } from 'react-router-dom'
import { useHeritage } from '../hooks/useHeritage'
import { parseCriteria } from '../utils/criteria'
import { useState, useEffect } from 'react'
import { fetchWikipediaImage } from '../utils/wikipediaImage'
import { motion } from 'framer-motion'
import MiniMap from '../components/map/MiniMap'

const categoryLabel = (category: string) => {
  switch (category) {
    case 'Cultural': return '文化遺産'
    case 'Natural':  return '自然遺産'
    case 'Mixed':    return '複合遺産'
    default: return category
  }
}

const regionLabel = (region: string) => {
  switch (region) {
    case 'Africa': return 'アフリカ'
    case 'Arab States': return 'アラブ諸国'
    case 'Asia and the Pacific': return 'アジア・太平洋'
    case 'Europe and North America': return 'ヨーロッパ・北米'
    case 'Latin America and the Caribbean': return 'ラテンアメリカ・カリブ'
    default: return region
  }
}

const SiteDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { sites, loading } = useHeritage()

  const site = sites.find((s) => s.id === Number(id))

  // 画像：データになければWikipediaから取得（フックは早期returnより前に置く）
  const [heroImage, setHeroImage] = useState('')

  useEffect(() => {
    if (!site) return
    if (site.image_url) {
      setHeroImage(site.image_url)
    } else {
      fetchWikipediaImage(site.wiki_title ?? site.name).then((url) => {
        if (url) setHeroImage(url)
      })
    }
  }, [site])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        読み込み中...
      </div>
    )
  }

  if (!site) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500">該当する遺産が見つかりませんでした</p>
        <button onClick={() => navigate('/')} className="text-blue-500 underline text-sm">
          トップに戻る
        </button>
      </div>
    )
  }

  const criteria = parseCriteria(site.justification)

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      {/* ヒーロー */}
      <div className="relative h-72 md:h-96 bg-gray-800 overflow-hidden">
        {heroImage && (
          <motion.img
            src={heroImage}
            alt={site.name_ja}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="absolute inset-0 max-w-3xl mx-auto px-6 flex flex-col justify-end pb-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-6 text-white/80 hover:text-white text-sm"
          >
            ← 戻る
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col"
          >
            <span className="self-start text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-gray-800 mb-3">
              {categoryLabel(site.category)}
            </span>
            <h1 className="text-white text-3xl md:text-4xl font-bold">
              {site.name_ja}
            </h1>
            {site.name_ja !== site.name && (
              <p className="text-white/70 text-sm mt-2">{site.name}</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* 本文 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-3xl mx-auto px-6 py-8"
      >
        {/* メタ情報 */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 pb-5 border-b border-gray-100 mb-6">
          <span className="text-gray-800 font-medium">{site.country}</span>
          <span>{site.date_inscribed}年登録</span>
          <span>{regionLabel(site.region)}</span>
        </div>

        {/* 登録基準 */}
        {criteria.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs tracking-wider text-gray-400 uppercase mb-3">登録基準</h2>
            <div className="flex flex-col gap-3">
              {criteria.map((c) => (
                <div key={c.code} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-50 text-blue-600 text-xs flex items-center justify-center font-medium">
                    {c.code}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed pt-1">
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 概要 */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">概要</h2>
          <p className="text-sm text-gray-600 leading-loose">
            {site.short_description || 'この遺産の概要はまだ登録されていません。'}
          </p>
        </motion.section>

        {/* 魅力 */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">魅力</h2>
          <p className="text-sm text-gray-600 leading-loose">
            {site.appeal || 'この遺産の魅力はまだ登録されていません。'}
          </p>
        </motion.section>

        {/* 場所 */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">場所</h2>
          {site.latitude && site.longitude &&
           !isNaN(Number(site.latitude)) && !isNaN(Number(site.longitude)) ? (
            <MiniMap
              lat={Number(site.latitude)}
              lng={Number(site.longitude)}
              name={site.name_ja}
            />
          ) : (
            <p className="text-sm text-gray-400">位置情報が登録されていません。</p>
          )}
        </motion.section>
      </motion.div>
    </div>
  )
}

export default SiteDetail