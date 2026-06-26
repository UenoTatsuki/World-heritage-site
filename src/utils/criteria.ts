/**
 * criteria.ts
 * 世界遺産の登録基準（i〜x）を日本語の説明に変換する対応表
 * justificationの "(i)(iv)" のような記号を意味に変換するのに使う
 */

// 登録基準（10項目）の日本語説明
const CRITERIA_MAP: Record<string, string> = {
  i:    '人類の創造的才能を表す傑作である',
  ii:   '建築・技術・記念碑・都市計画などの発展に重要な影響を与えた',
  iii:  '現存するか消滅した文化的伝統・文明の希有な証拠である',
  iv:   '歴史上の重要な段階を物語る建築様式・技術・景観の見本である',
  v:    '伝統的な人間の居住・土地利用・海洋利用の顕著な見本である',
  vi:   '顕著な普遍的意義を持つ出来事・伝統・思想・信仰・芸術と関連する',
  vii:  '最上級の自然現象、または類まれな自然美・美的価値をもつ地域である',
  viii: '地球の歴史の主要段階を示す顕著な見本である',
  ix:   '生態系や動植物群集の進化・発展を示す顕著な見本である',
  x:    '生物多様性の保全にとって重要な自然生息地を含む',
}

/**
 * "(i)(iv)" のような文字列を、[{ code, text }] の配列に変換する
 */
export const parseCriteria = (justification: string): { code: string; text: string }[] => {
  if (!justification) return []
  // (i) や (iv) のような () で囲まれた記号を取り出す
  const matches = justification.match(/\(([ivx]+)\)/g) ?? []
  return matches.map((m) => {
    const code = m.replace(/[()]/g, '') // 括弧を外す
    return { code, text: CRITERIA_MAP[code] ?? '不明な基準' }
  })
}