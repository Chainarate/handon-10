import React from 'react'
import classes from './Banner.module.css'
const Banner = () => {
  return (
    <div className={classes.container}>
      <p className="font-bold text-2xl text-white">LearnHub</p>
      <p className="text-white">Hub for Education</p>
    </div>
  )
}

export default Banner
