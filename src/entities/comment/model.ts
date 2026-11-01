export type Sentiment = 'positive' | 'negative'

export type CommentAnalysis = {
  id: string
  text: string
  sentiment: Sentiment
  createdAt: string
}

export const COMMENT_HISTORY_KEY = 'comment-classifier-history'

export function getCommentHistory(): CommentAnalysis[] {
  const value = localStorage.getItem(COMMENT_HISTORY_KEY)
  if (!value) return []

  try {
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed) ? parsed as CommentAnalysis[] : []
  } catch {
    localStorage.removeItem(COMMENT_HISTORY_KEY)
    return []
  }
}

export function saveCommentAnalysis(analysis: CommentAnalysis): void {
  const history = getCommentHistory()
  localStorage.setItem(COMMENT_HISTORY_KEY, JSON.stringify([analysis, ...history]))
}
