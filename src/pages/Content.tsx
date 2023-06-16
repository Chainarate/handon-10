import * as React from 'react'
import { useParams } from 'react-router-dom'
import useContent from '../hooks/useContent'
import Loading from '../component/Loading'
import { useAuth } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating/Rating'
import Button from '@mui/material/Button/Button'

const Content = () => {
  const { id: postId } = useParams()
  const {
    status: { loading, error, ready },
    data,
  } = useContent(postId || '')

  const { id } = useAuth()

  // console.log(id)
  // console.log('Content', data?.postedBy.id)

  const pageId = data?.postedBy.id

  // if (id === pageId) {
  //   console.log('Hello, World')
  // } else {
  //   console.log('Wrong Id')
  // }

  // TODO: Display differently given all possible loading, error, and ready state
  if (loading || !ready) return <Loading />

  const { videoTitle, comment, rating, postedBy } = data!

  return (
    <div>
      <div>
        <div>
          <h4 className="text-white">{videoTitle}</h4>
        </div>

        <div>
          <p className="text-white">{comment}</p>

          <div>
            <Rating name="read-only" value={rating} readOnly />
            {/* <p>
              {[...Array(rating).keys()].map((star) => (
                <img key={star} className={classes.icon} src="/star.svg" alt="Rating Star" />
              ))}
            </p> */}
            <p>
              {/* <span className={classes.emdash}>&mdash;</span>  */}
              {postedBy.name}
            </p>
            <>
              {pageId === id ? (
                <Link to={`/content/${postId}/edit`}>
                  <Button type="submit" variant="contained">
                    Edit
                  </Button>
                </Link>
              ) : undefined}
            </>

            {/* copy below to paste for isOwnPost */}
          </div>
        </div>
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
