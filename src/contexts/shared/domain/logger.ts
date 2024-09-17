export interface Logger {
  info(...message: unknown[]): void
  error(...message: (unknown | Error)[]): void
  debug(...message: unknown[]): void
}
