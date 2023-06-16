import * as React from 'react'
import useContentList from '../hooks/useContentList'
import Loading from './Loading'
import ContentCard from './ContentCard'
import classes from './ContentList.module.css'

const ContentList = () => {
  const {
    status: { loading, error, ready },
    data,
  } = useContentList()

  // TODO: Display differently given all possible loading, error, and ready state
  if (loading || !ready) return <Loading />

  return (
    <div className={classes.list}>{data && data.map((content) => <ContentCard key={content.id} {...content} />)}</div>
  )
}

export default ContentList
