import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { SearchResult } from '@/shared/domain/search-result.ts'
import { ThreadRepository } from '@/threads/domain/thread-repository.ts'
import { Thread } from '@/threads/domain/thread.ts'

export class ThreadSearcher {
  constructor(
    private readonly repository: ThreadRepository,
  ) {}

  async search(criteria?: Criteria): Promise<SearchResult<Thread>> {
    return await this.repository.search(criteria)
  }
}
