import { ID } from '@/shared/domain/value-objects/id.ts'
import { ThreadRepository } from '@/threads/domain/thread-repository.ts'

export class ThreadFinder {
  constructor(
    private readonly repository: ThreadRepository,
  ) {}

  async find(id: number) {
    const threadId = new ID(id)

    return await this.repository.find(threadId)
  }
}
