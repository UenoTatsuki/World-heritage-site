/**
 * wikipediaImage.ts
 * Wikipediaのページ名から代表画像のURLを取得する
 * REST APIのsummaryエンドポイントを使い、画像がなければ空文字を返す
 */

export const fetchWikipediaImage = async (title: string): Promise<string> => {
  try {
    const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    const response = await fetch(endpoint)
    if (!response.ok) return ''
    const data = await response.json()
    // thumbnail（小）またはoriginalimage（大）があれば使う
    return data.thumbnail?.source ?? data.originalimage?.source ?? ''
  } catch {
    return ''
  }
}