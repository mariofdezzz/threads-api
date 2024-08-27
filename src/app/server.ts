import { App } from 'toruk'
import { router } from '~/router/index.ts'

export class Server {
  private server?: Deno.HttpServer
  private readonly abortController = new AbortController()

  constructor() {}

  listen(): Promise<void> {
    const signal = this.abortController.signal

    return new Promise((resolve) => {
      this.server = new App(router).serve({
        signal,
        onListen({ port, hostname }) {
          console.log(`Server started at http://${hostname}:${port}`)
          resolve()
        },
      })
    })
  }

  stop(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.server) return resolve()

      this.server.finished.then(() => {
        resolve()
      })
      this.abortController.abort()
    })
  }
}
