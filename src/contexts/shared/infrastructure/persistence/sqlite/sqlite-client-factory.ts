// deno-lint-ignore-file require-await
import { SqliteConfig } from '@/shared/infrastructure/persistence/sqlite/sqlite-config-factory.ts'
import { DB as Client } from 'sqlite'

export class SqliteClientFactory {
  private static clients: Record<string, Client> = {}

  static async createClient(
    contextName: string,
    config: SqliteConfig,
  ): Promise<Client> {
    let client = this.getClient(contextName)

    if (!client) {
      client = await this.createAndConnnectClient(config)

      this.registerClient(client, contextName)
    }

    return client
  }

  private static getClient(contextName: string): Client | undefined {
    return this.clients[contextName]
  }

  private static async createAndConnnectClient(
    config: { database: string },
  ): Promise<Client> {
    const client = new Client(config.database)

    return client
  }

  private static registerClient(client: Client, contextName: string) {
    this.clients[contextName] = client
  }
}
