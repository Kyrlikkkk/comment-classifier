export type DemoUser = {
  username: string
  email: string
  password: string
}

export const DEMO_USER_KEY = 'comment-classifier-user'
export const CURRENT_USER_KEY = 'comment-classifier-current-user'

export function getDemoUser(): DemoUser | null {
  const value = localStorage.getItem(DEMO_USER_KEY)
  if (!value) return null

  try {
    return JSON.parse(value) as DemoUser
  } catch {
    localStorage.removeItem(DEMO_USER_KEY)
    return null
  }
}

export function getCurrentUser(): DemoUser | null {
  const value = localStorage.getItem(CURRENT_USER_KEY)
  if (!value) return null

  try {
    return JSON.parse(value) as DemoUser
  } catch {
    localStorage.removeItem(CURRENT_USER_KEY)
    return null
  }
}
