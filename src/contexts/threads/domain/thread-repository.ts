import { Repository } from '@/shared/domain/repository.ts'
import { Thread } from '@/threads/domain/thread.ts'

export interface ThreadRepository extends Repository<Thread> {}
