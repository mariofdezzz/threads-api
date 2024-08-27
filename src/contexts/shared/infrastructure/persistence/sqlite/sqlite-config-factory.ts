import * as z from 'zod'

const sqliteConfigSchema = z.object({
  database: z.string(),
})

export type SqliteConfig = z.infer<typeof sqliteConfigSchema>

let sqliteConfig: SqliteConfig

try {
  sqliteConfig = sqliteConfigSchema.parse(Deno.env.toObject())
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new Error(
      `🚨 Missing environment variables\n\n` +
        `Expected: ${error.issues.map(({ path }) => path).join(', ')}`,
    )
  }
}

export class SqliteConfigFactory {
  // deno-lint-ignore require-await
  static async getConfig(): Promise<SqliteConfig> {
    return sqliteConfig
  }
}
