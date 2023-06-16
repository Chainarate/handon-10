import { ContentDto } from './dto'
import { _DataState } from './hook'

export interface ContentHook extends _DataState<ContentDto> {
  // Optional, but if we're able to implement below function, it would be helpful :)
  editPost?: (c: Pick<ContentDto, 'comment' | 'rating'>) => Promise<unknown>
}
