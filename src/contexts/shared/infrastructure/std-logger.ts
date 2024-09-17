import { Logger } from '@/shared/domain/logger.ts'
import {
  ConsoleHandler,
  getLevelName,
  Logger as DenoStdLogger,
  LogLevels,
} from 'std/log/mod.ts'

export class StdLogger implements Logger {
  private logger: DenoStdLogger

  constructor() {
    const logLevel = Deno.env.get('ENV') === 'dev'
      ? getLevelName(LogLevels.DEBUG)
      : getLevelName(LogLevels.INFO)

    this.logger = new DenoStdLogger(
      'std-logger',
      logLevel,
      {
        handlers: [
          new ConsoleHandler(logLevel),
        ],
      },
    )
  }

  info(...message: unknown[]): void {
    this.logger.info(this.toMessage(message))
  }

  error(...message: (unknown | Error)[]): void {
    this.logger.error(this.toMessage(message))
  }

  debug(...message: unknown[]): void {
    this.logger.debug(this.toMessage(message))
  }

  private toMessage(messages: unknown[]): string {
    return messages.map((m) => String(m)).join(' ')
  }
}
