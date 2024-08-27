import { ID } from '@/shared/domain/value-objects/id.ts'

export interface Repository<T> {
  save(user: T): Promise<void>
  find(id: ID): Promise<T>
  search(): Promise<T[]>
  upsert(user: T): Promise<void>
  remove(id: ID): Promise<void>
}
