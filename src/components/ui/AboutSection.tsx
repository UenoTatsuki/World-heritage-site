/**
 * AboutSection.tsx
 * トップページのサイト紹介セクション
 * サイトのコンセプトを伝える。スクロールで入るとフェードインする
 */
import { motion } from 'framer-motion'

const AboutSection = () => {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-[0.2em] text-gray-400 mb-6"
      >
        ABOUT THIS SITE
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed mb-8"
      >
        世界の遺産を、<br />もっと身近に。
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm md:text-base text-gray-500 leading-loose"
      >
        このサイトは、世界中のユネスコ世界遺産を地図やカテゴリーから
        気軽に探せるアーカイブです。地域や分類で絞り込んだり、
        気になった遺産を「行きたいリスト」に保存したりできます。
        旅の計画や学びのきっかけに、自由に使ってください。
      </motion.p>
    </section>
  )
}

export default AboutSection