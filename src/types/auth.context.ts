import { ReactNode } from 'react'

type FetchAuthorizationHeader = {
  Authorization: `Bearer ${string}`
}

export interface IAuthContext {
  id: string | null
  token: string | null
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<unknown>
  logout: () => void
  register: (username: string, name: string, password: string) => Promise<unknown>

  // Optional, but if we're able to implement below function, it would be helpful :)
  // getAuthHeader?: () => FetchAuthorizationHeader
  // isOwnPost?: (c: ContentDto) => boolean
}

export interface ChildProps {
  children: ReactNode
}
