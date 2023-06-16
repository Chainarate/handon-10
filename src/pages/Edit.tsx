import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../component/Loading'
import { useAuth } from '../providers/AuthProvider'
import withGuard from '../guards/withGuard'
import useContent from '../hooks/useContent'
import classes from './Edit.module.css'
import { host } from '../constant'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import styled from '@emotion/styled'

const Edit = () => {
  const { id } = useParams()
  const {
    status: { error, loading, ready },
    data,
  } = useContent(id || '')
  const navigate = useNavigate()

  // Hint: we may need auth token to patch the upcoming content
  const { token } = useAuth()
  // ORrrrrr, if you decided to put logic in `editPost` function instead, like useAuth() under useContent(), we'd certainly don't need for this line

  const [rating, setRating] = useState<number | null>(0)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  //   const [loading, setLoading] = useState(false)

  //   useEffect(() => {
  //     // TODO: What should happen if we later received current content's rating?

  //   }, [data])

  useEffect(() => {
    const fetchData = async () => {
      //   setLoading(true)
      try {
        const res = await fetch(`https://${host}/content/${id}`)
        const datares = await res.json()

        setRating(datares.rating)
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [data])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    setSubmitting(true)

    // TODO: Try post new blog to server
    try {
      const res = await fetch(`https://${host}/content/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          accept: 'application/json',
          comment: comment,
          rating: rating,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()

      navigate(`/content/${id}`)
      return data
    } catch (err) {
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

  if (loading || !ready) return <Loading />

  //   const { comment } = data!

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Edit content</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <label className="text-l flex flex-col">Comment</label>
          <input
            type="text"
            className="border border-black"
            value={comment}
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
            value={rating}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            onChange={(event, newRating: any) => {
              setRating(newRating)
            }}
          />
        </div>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Edit
        </Button>
      </form>
    </div>
  )
}

export default withGuard(Edit)
