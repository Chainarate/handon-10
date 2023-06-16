import { host } from '../constant'
import { ContentHook } from '../types/content.hook'
import { ContentDto } from '../types/dto'
import { useState, useEffect } from 'react'

const useContent = (postId: string): ContentHook => {
  const [data, setData] = useState<ContentDto | null>(null)
  const [error, setError] = useState<null | unknown>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://${host}/content/${postId}`)
        const data = await res.json()

        setData(data)
        console.log(data.postedBy.id)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return {
    data,
    status: {
      error,
      loading,
      ready: error == null && !loading && data != null,
    },
  }
}

export default useContent
