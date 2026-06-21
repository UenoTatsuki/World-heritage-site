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

  // ↓ここの数値を変えると演出のタイミングを調整できる（単位：秒）
  const MAIN_DELAY = 1      // メインコピーが出るまでの待ち時間
  const SUB_DELAY = 2.5       // サブコピーが出るまでの待ち時間
  const FADE_DURATION = 2.5   // 文字が浮かび上がる時間
  const IMAGE_INTERVAL = 8    // 画像が切り替わる間隔
  const IMAGE_START_DELAY = 3.2  // 最初の画像が浮かび始めるまでの待ち時間
  const IMAGE_FADE = 3           // 画像が浮かび上がる時間
  //

  // 画像を一定間隔で切り替える
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length)
    }, IMAGE_INTERVAL * 1000)
    return () => clearInterval(timer)
  }, [IMAGE_INTERVAL])

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
          transition={{
            duration: index === current ? IMAGE_FADE : 2,
            ease: 'easeInOut',
            delay: index === 0 && current === 0 ? IMAGE_START_DELAY : 0,
          }}
        />
      ))}

      {/* 暗いオーバーレイ */}
      <div className="absolute inset-0 bg-black/40" />

      {/* コピー */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-5xl mx-auto px-8">

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION, delay: MAIN_DELAY }}
          className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-wide"
        >
          世界の宝を、<br />地図から旅する。
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION, delay: SUB_DELAY }}
          className="text-white/80 text-xs sm:text-base md:text-lg mt-6"
        >
          1,199件の世界遺産を地域・分類から探せるアーカイブ
        </motion.p>
      </div>

      {/* スクロール案内 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 3.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 text-xs tracking-widest"
      >
        SCROLL ↓
      </motion.div>
    </section>
  )
}

export default Hero