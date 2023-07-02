import React from 'react'
import { useState, FormEvent } from 'react'
import classes from './Create.module.css'
import { useNavigate } from 'react-router-dom'
import { host } from '../constant'
import { useAuth } from '../providers/AuthProvider'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'

const Create = () => {
  const [rating, setRating] = useState<number | null>(0)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { id, token } = useAuth()
  const [newVideo, setNewVideo] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    setSubmitting(true)

    // TODO: Try post new blog to server
    try {
      const res = await fetch(`https://${host}/content`, {
        method: 'POST',
        body: JSON.stringify({
          accept: 'application/json',
          videoUrl: newVideo,
          comment: comment,
          rating: rating,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()

      toast.success('Successful Create')

      navigate('/')
      return data
    } catch (err) {
      // TODO: Handling error
      toast.error('Unsuccessful Create')
      console.log(err)
    } finally {
      setSubmitting(false)
    }
  }

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  })

  return (
    <div>
      <form className={classes.container} onSubmit={handleSubmit}>
        <div className="text-2xl text-white">Creat Content</div>
        <div className="text-left m-auto">
          <label className="text-l flex flex-col text-white my-1 ">Video</label>
          <input
            type="text"
            value={newVideo}
            className="px-2 py-0.5 rounded"
            onChange={(e) => setNewVideo(e.target.value)}
            required
          />
        </div>
        <div className="text-left m-auto">
          <label className="text-l flex flex-col text-white my-1 ">Comment</label>
          <input
            type="text"
            value={comment}
            className="px-2 py-0.5 rounded"
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div>
          <Typography component="legend" className="text-white">
            Rating
          </Typography>
          <StyledRating
            name="Heart Rate"
            defaultValue={5}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            onChange={(event, newRating: any) => {
              setRating(newRating)
            }}
          />
        </div>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </div>
  )
}

export default Create
