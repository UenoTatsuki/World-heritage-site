/**
 * Home.tsx
 * トップページ：ヒーロー → 新着グリッドの縦スクロール構成
 * 地図は別ページ（/map）に分離したため、ここには含めない
 */
import { useHeritage } from '../hooks/useHeritage'
import Hero from '../components/ui/Hero'
import HeritageGrid from '../components/ui/HeritageGrid'
import AboutSection from '../components/ui/AboutSection'
import ProfileSection from '../components/ui/ProfileSection'

const Home = () => {
  const { sites, loading, error } = useHeritage()

  // 新着順に並べる（登録年の新しい順）。最大9件を表示
  const latestSites = [...sites]
    .sort((a, b) => b.date_inscribed - a.date_inscribed)
    .slice(0, 6)

  return (
    <div className="bg-white">
      {/* ヒーロー */}
      <Hero />

      {/* 新着グリッド */}
      {error ? (
        <p className="text-center text-red-500 py-20">エラー: {error}</p>
      ) : loading ? (
        <p className="text-center text-gray-400 py-20">読み込み中...</p>
      ) : (
        <div className="pt-32">
          <HeritageGrid sites={latestSites} title="新着の世界遺産" subtitle="最近追加された遺産をピックアップ" />
        </div>
      )}

      {/* サイト紹介 */}
      <AboutSection />

      {/* プロフィール */}
      <ProfileSection />
    </div>
  )
}

export default Home