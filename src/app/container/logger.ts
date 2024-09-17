import { Logger } from '@/shared/domain/logger.ts'
import { StdLogger } from '@/shared/infrastructure/std-logger.ts'

export const logger: Logger = new StdLogger()
