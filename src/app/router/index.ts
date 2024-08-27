import { Router } from 'toruk'
import { logger } from 'toruk/middlewares'
import { StatusGetController } from '~/controllers/v1/status-get-controller.ts'
import { UsersGetController } from '~/controllers/v1/users-get-controller.ts'

export const router = new Router({
  routes: [{
    path: '/v1',
    children: [
      {
        path: '/status',
        handler: StatusGetController,
      },
      {
        path: '/users',
        handler: UsersGetController,
      },
    ],
  }],
  use: [
    logger(),
  ],
})
