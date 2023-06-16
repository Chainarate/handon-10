export interface _DataState<T> {
  status: {
    loading: boolean
    error: null | unknown
    ready: boolean
  }
  data: T | null
}
