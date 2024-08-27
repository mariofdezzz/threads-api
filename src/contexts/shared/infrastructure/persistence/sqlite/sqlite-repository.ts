import { PersistenceRepository } from '@/shared/infrastructure/persistence/persistence-repository.ts'
import { DB } from 'sqlite'

export abstract class SqliteRepository<T extends Record<string, unknown>>
  extends PersistenceRepository<T> {
  constructor(protected readonly client: Promise<DB>) {
    super()
  }

  protected async get(id: string): Promise<T | null> {
    throw new Error('Method not implemented.')
  }

  protected async read(): Promise<T[]> {
    return (await this.client).queryEntries<T>('SELECT * FROM users')
  }

  protected create(entity: T): Promise<T> {
    throw new Error('Method not implemented.')
  }

  protected update(entity: T): Promise<T> {
    throw new Error('Method not implemented.')
  }

  protected delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
