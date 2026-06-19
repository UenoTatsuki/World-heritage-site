/**
 * Hero.tsx
 * トップページ最上部のヒーローセクション
 * 黒背景からコピーがフェードアップし、複数の風景画像がクロスフェードで巡回する
 */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// 背景に使う画像（決め打ちで数枚指定）
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1600&q=80',
  'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1600&q=80',
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80',
]

const Hero = () => {
  const [current, setCurrent] = useState(0)

  // 5秒ごとに次の画像へ
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 背景画像（クロスフェード） */}
      {HERO_IMAGES.map((src, index) => (
        <motion.div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      ))}

      {/* 暗いオーバーレイ */}
      <div className="absolute inset-0 bg-black/40" />

      {/* コピー */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-5xl mx-auto px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="text-white/80 text-sm tracking-[0.2em] mb-4"
        >
          UNESCO WORLD HERITAGE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.1 }}
          className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-wide"
        >
          世界の宝を、<br />地図から旅する。
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.6 }}
          className="text-white/80 text-base md:text-lg mt-6"
        >
          1,199件の世界遺産を地域・分類から探せるアーカイブ
        </motion.p>
      </div>

      {/* スクロール案内 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 text-xs tracking-widest"
      >
        SCROLL ↓
      </motion.div>
    </section>
  )
}

export default Hero