import { Repository } from '@/shared/domain/repository.ts'
import { ThreadLike } from '@/thread-likes/domain/thread-like.ts'

export interface ThreadLikeRepository
  extends Pick<Repository<ThreadLike>, 'save'> {
  remove(entity: ThreadLike): Promise<void>
}
