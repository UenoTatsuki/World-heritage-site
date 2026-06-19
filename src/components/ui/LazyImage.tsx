/**
 * LazyImage.tsx
 * 遺産の画像を遅延読み込みするコンポーネント
 * 画面に入るまでは色プレースホルダー、入ったらWikipediaから画像を取得して表示する
 */
import { useState, useEffect } from 'react'
import { useInView } from '../../hooks/useInView'
import { fetchWikipediaImage } from '../../utils/wikipediaImage'
import type { HeritageItem } from '../../types/heritage'

interface Props {
  site: HeritageItem
}

const placeholderColor = (category: HeritageItem['category']) => {
  switch (category) {
    case 'Cultural': return 'bg-amber-100'
    case 'Natural':  return 'bg-emerald-100'
    case 'Mixed':    return 'bg-violet-100'
  }
}

const LazyImage = ({ site }: Props) => {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [imageUrl, setImageUrl] = useState(site.image_url)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // 画面に入っていて、まだ画像がなければ取得する
    if (inView && !imageUrl) {
      fetchWikipediaImage(site.wiki_title ?? site.name).then((url) => {
        if (url) setImageUrl(url)
      })
    }
  }, [inView, imageUrl, site.name])

  return (
    <div
      ref={ref}
      className={`aspect-[4/3] rounded-xl overflow-hidden ${placeholderColor(site.category)} flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={site.name_ja}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <span className="text-gray-400 text-sm">{site.country}</span>
      )}
    </div>
  )
}

export default LazyImage