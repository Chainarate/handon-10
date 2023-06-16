import { host } from '../constant'
import { ContentListHook } from '../types/contentList.hook'
import { ContentDto } from '../types/dto'
import { useState, useEffect } from 'react'

const useContentList = (): ContentListHook => {
  const [data, setData] = useState<ContentDto[] | null>(null)
  const [error, setError] = useState<null | unknown>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://${host}/content`)
        const datares = await res.json()

        setData(datares.data)
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

export default useContentList
