import * as React from 'react'
import { useParams } from 'react-router-dom'
import useContent from '../hooks/useContent'
import Loading from '../component/Loading'
import { useAuth } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating/Rating'
import Button from '@mui/material/Button/Button'
import { Avatar } from '@mui/material'
import ReactPlayer from 'react-player'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import styled from '@emotion/styled'

const Content = () => {
  const { id: postId } = useParams()
  const {
    status: { loading, error, ready },
    data,
    startName,
  } = useContent(postId || '')

  const { id } = useAuth()

  const pageId = data?.postedBy.id

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  })

  // TODO: Display differently given all possible loading, error, and ready state
  if (loading || !ready) return <Loading />

  const { videoTitle, comment, rating, postedBy, creatorName, videoUrl } = data!

  return (
    <div>
      <div>
        <div className="text-2xl text-white mt-10 p-0">CONTENT VIDEO</div>
        <div className="w-11/12 h-auto mx-auto my-4">
          <ReactPlayer url={videoUrl} width={'max'} height={'100vh'} />
        </div>
        <div className="text-white text-left w-11/12 m-auto flex justify-between">
          <div>
            <h4 className="text-xl font-bold">{videoTitle}</h4>
            <h5 className="text-xl font-bold">{creatorName}</h5>
            <p className="text-l my-2">- {comment}</p>
          </div>
          <div className="pb-10 content-end">
            {pageId === id ? (
              <Link to={`/content/${postId}/edit`}>
                <Button type="submit" variant="contained">
                  Edit
                </Button>
              </Link>
            ) : undefined}
          </div>
        </div>
      </div>
      <div className="flex w-11/12 m-auto justify-between pb-20">
        <div className="flex flex-row content-center text-center gap-2">
          <Avatar>{startName}</Avatar>
          <p className="text-gray-400 m-auto">{postedBy.name}</p>
        </div>
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
  )
}

export default Content
// {
//   /*
//     TODO: update the conditional rendering here, if you chosen to work with isOwnPost function, please continue to work on AuthProvider.tsx, otherwise you can use `id` from useAuth()
//      */ isOwnPost && isOwnPost(data!) && (
//     <Link to={`/content/${postId}/edit`}>
//       <img className={classes.icon} src="/edit.svg" alt="Edit" />
//       Edit
//     </Link>
//   )
// }
