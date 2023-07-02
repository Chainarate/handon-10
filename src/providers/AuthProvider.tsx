import React from 'react'
import { ChildProps, IAuthContext } from '../types/auth.context'
import { host } from '../constant'
import toast from 'react-hot-toast'

export type AuthProviderProps = ChildProps
type UserInfo = Pick<IAuthContext, 'id' | 'token'>

type LoginFunc = IAuthContext['login']
type LogoutFunc = IAuthContext['logout']
type RegisterFunc = IAuthContext['register']
// type GetAuthHeaderFunc = IAuthContext['getAuthHeader']
// type IsOwnPostFunc = IAuthContext['isOwnPost']

export const AuthContext = React.createContext<IAuthContext | null>(null)

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const retrieveUserData = (token: string) =>
  fetch(`https://${host}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json())

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(!!localStorage.getItem('token'))
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token'),
  })

  const login: LoginFunc = async (username: string, password: string) => {
    const loginInfo = { username, password }

    try {
      const response = await fetch(`https://${host}/auth/login`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      })
      const data = await response.json()

      if (data.statusCode === 401) {
        throw new Error(data.message)
      }
      localStorage.setItem('token', data.accessToken)
      const accessToken = localStorage.getItem('token') || 'a'
      console.log(accessToken)

      const { id } = await retrieveUserData(accessToken)

      localStorage.setItem('id', id)

      setIsLoggedIn(true)
      setUserInfo(() => {
        const update = {
          id,
          token: accessToken,
        }
        return update
      })
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const logout: LogoutFunc = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    setIsLoggedIn(false)
    setUserInfo({ id: null, token: null })
    toast.success('Successful Logout')
  }

  const register: RegisterFunc = async (username: string, name: string, password: string) => {
    const registerInfo = { username, name, password }

    try {
      const response = await fetch(`https://${host}/user`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInfo),
      })
      const data = await response.json()

      if (data.statusCode === 401) {
        throw new Error(data.message)
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, ...userInfo, logout, register }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
