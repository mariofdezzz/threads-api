import { SqliteClientFactory } from '@/shared/infrastructure/persistence/sqlite/sqlite-client-factory.ts'
import { SqliteConfigFactory } from '@/shared/infrastructure/persistence/sqlite/sqlite-config-factory.ts'

export const sqliteClient = SqliteClientFactory.createClient(
  'threads-api',
  await SqliteConfigFactory.getConfig(),
)
