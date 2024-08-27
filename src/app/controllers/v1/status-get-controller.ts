import { Controller } from '~/controllers/controller.ts'

// GET /v1/status
export const StatusGetController: Controller<'/v1/status'> = () => {
  return new Response('ok')
}
