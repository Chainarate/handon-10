import React from 'react'
import ContentList from '../component/ContentList'
import Banner from '../component/Banner'
import { Link } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import classes from './Home.module.css'
import Button from '@mui/material/Button/Button'

const Home = () => {
  const { isLoggedIn } = useAuth()
  return (
    <div>
      <Banner />
      <div className="flex text-left p-0 m-auto w-11/12 flex-row-reverse">
        {isLoggedIn && (
          <Link to="/new">
            <Button type="submit" variant="contained">
              Create Content
            </Button>
          </Link>
        )}
      </div>
      <div className={classes.cardList}>
        <ContentList />
      </div>
    </div>
  )
}

export default Home
