import * as React from 'react'
import { Link } from 'react-router-dom'
import { ContentDto } from '../types/dto'
import classes from './ContentCard.module.css'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import styled from '@emotion/styled'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
})

const ContentCard = ({ id, videoTitle, comment, rating, thumbnailUrl, creatorName, postedBy }: ContentDto) => (
  <div className={classes.card}>
    <Link to={`/content/${id}`} className={classes.card}>
      <img src={thumbnailUrl} alt={`${videoTitle} video thumbnail`} className={classes.video} />

      <div>
        <div className="flex flex-col text-left">
          <h4 className="text-white font-bold">{videoTitle}</h4>
          <h5 className="text-white font-bold">{creatorName}</h5>
        </div>

        <h5 className="text-white text-left mt-2">{comment}</h5>
      </div>

      <div className="flex flex-row justify-between">
        <p className="text-gray-400">{postedBy.name}</p>
        <div>
          <StyledRating
            name="Heart Rate"
            defaultValue={5}
            value={rating}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            readOnly
          />
        </div>
      </div>
    </Link>
  </div>
)

export default ContentCard
