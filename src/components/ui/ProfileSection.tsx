/**
 * ProfileSection.tsx
 * トップページの運営者プロフィールセクション
 * アイコン・名前・紹介文・SNSリンク（GitHub / Instagram）を表示する
 */
import { motion } from 'framer-motion'

// プロフィール情報（自分の情報に書き換えてください）
const PROFILE = {
  name: 'Ueno Tatsuki',
  bio: '世界遺産検定1級所持/現在Web開発を勉強中',
  iconImage: '', // 画像URLを入れると写真アイコンになる。空なら頭文字アイコン
  initial: 'U',  // 画像がないときに表示する頭文字
  github: 'https://github.com/UenoTatsuki',
  instagram: 'https://www.instagram.com/heritage_ut',
}

// GitHubアイコン（SVG直書き）
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.2 11.16.6.1.82-.25.82-.56v-2c-3.34.7-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.1-.73.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.8 1.28 3.49.98.1-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.34 1.23-3.17-.12-.3-.53-1.52.12-3.16 0 0 1-.32 3.3 1.21a11.5 11.5 0 0 1 6 0c2.3-1.53 3.3-1.21 3.3-1.21.65 1.64.24 2.86.12 3.16.77.83 1.23 1.88 1.23 3.17 0 4.54-2.81 5.53-5.49 5.83.43.37.81 1.1.81 2.22v3.29c0 .31.22.67.83.56C20.56 21.88 24 17.48 24 12.29 24 5.78 18.63.5 12 .5z"/>
  </svg>
)

// Instagramアイコン（SVG直書き）
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const ProfileSection = () => {
  return (
    <section className="bg-gray-50 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto px-6 text-center"
      >
        <p className="text-xs tracking-[0.2em] text-gray-400 mb-8">PROFILE</p>

        {/* アイコン */}
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
          {PROFILE.iconImage ? (
            <img
              src={PROFILE.iconImage}
              alt={PROFILE.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-3xl font-bold">{PROFILE.initial}</span>
          )}
        </div>

        {/* 名前・紹介 */}
        <h3 className="mt-6 text-lg font-bold text-gray-800">{PROFILE.name}</h3>
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">{PROFILE.bio}</p>

        {/* SNSリンク */}
        <div className="mt-6 flex items-center justify-center gap-4">
            <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-md transition"
                aria-label="GitHub"
            >
                <GithubIcon />
            </a>

            <a
                href={PROFILE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-pink-500 hover:shadow-md transition"
                aria-label="Instagram"
            >
                <InstagramIcon />
            </a>
        </div>
      </motion.div>
    </section>
  )
}

export default ProfileSection