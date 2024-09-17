import { ThreadSearcher } from '@/threads/application/searcher/thread-sercher.ts'
import { threadRepository } from '~/container/repositories/thread-repository.ts'

export const threadSearcher = new ThreadSearcher(
  threadRepository,
)
