import React from 'react'
import classes from './Layout.module.css'
import { ChildProps } from '../types/auth.context'
import { useAuth } from '../providers/AuthProvider'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box/Box'

export type AuthProviderProps = ChildProps

const Layout = ({ children }: AuthProviderProps) => {
  const { isLoggedIn, logout } = useAuth()

  return (
    <Box sx={{ boxShadow: 1 }}>
      <div className={classes.header}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700'
              : 'px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm'
          }
        >
          LEARN HUB
        </NavLink>
        {!isLoggedIn ? (
          <nav className={classes.nav}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? 'inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700'
                  : 'px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm'
              }
            >
              LOGIN
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? 'inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700'
                  : 'px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm'
              }
            >
              REGISTER
            </NavLink>
          </nav>
        ) : (
          <nav className={classes.nav}>
            <a
              className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
              onClick={logout}
            >
              LOGOUT
            </a>
          </nav>
        )}
      </div>
      <main>{children}</main>
    </Box>
  )
}

export default Layout
