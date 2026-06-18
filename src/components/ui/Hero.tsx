/**
 * Hero.tsx
 * トップページ最上部のヒーローセクション
 * 背景写真の上にキャッチコピーをFramer Motionでフェードアップ表示する
 */
import { motion } from 'framer-motion'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1600&q=80'

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 背景写真 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      {/* 暗いオーバーレイ（文字を読みやすくする） */}
      <div className="absolute inset-0 bg-black/40" />

      {/* コピー */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-5xl mx-auto px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white/80 text-sm tracking-[0.2em] mb-4"
        >
          UNESCO WORLD HERITAGE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-wide"
        >
          世界の宝を、<br />地図から旅する。
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/80 text-base md:text-lg mt-6"
        >
          1,199件の世界遺産を地域・分類から探せるアーカイブ
        </motion.p>
      </div>

      {/* スクロール案内 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 text-xs tracking-widest"
      >
        SCROLL ↓
      </motion.div>
    </section>
  )
}

export default Hero