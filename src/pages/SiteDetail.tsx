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
import ReactMarkdown from 'react-markdown'

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

        {/* 数字カード */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-gray-50 rounded-xl py-4 text-center">
            <p className="text-lg font-bold text-gray-800">{site.date_inscribed}</p>
            <p className="text-xs text-gray-400 mt-1">登録年</p>
          </div>
          <div className="bg-gray-50 rounded-xl py-4 text-center">
            <p className="text-lg font-bold text-gray-800">{site.country}</p>
            <p className="text-xs text-gray-400 mt-1">所在国</p>
          </div>
          {site.components > 0 && (
            <div className="bg-gray-50 rounded-xl py-4 text-center">
              <p className="text-lg font-bold text-gray-800">{site.components}</p>
              <p className="text-xs text-gray-400 mt-1">構成資産</p>
            </div>
          )}
        </div>

        {/* キャッチコピー */}
        {site.catchphrase && (
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed border-l-4 border-gray-200 pl-4 mb-8"
             style={{ fontFamily: 'serif' }}>
            {site.catchphrase}
          </p>
        )}

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
          <div className="text-sm text-gray-600 leading-loose text-justify">
            <ReactMarkdown>
              {site.short_description || 'この遺産の概要はまだ登録されていません。'}
            </ReactMarkdown>
          </div>
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
          <div className="text-sm text-gray-600 leading-loose text-justify">
            <ReactMarkdown>
              {site.appeal || 'この遺産の魅力はまだ登録されていません。'}
            </ReactMarkdown>
          </div>
        </motion.section>

        {/* 見どころギャラリー */}
        {site.gallery && site.gallery.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">見どころ</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {site.gallery.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${site.name_ja} ${index + 1}`}
                  loading="lazy"
                  className="w-full aspect-square object-cover rounded-xl"
                />
              ))}
            </div>
          </motion.section>
        )}

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