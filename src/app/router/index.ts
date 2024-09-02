import { Router } from 'toruk'
import { logger } from 'toruk/middlewares'
import { StatusGetController } from '~/controllers/v1/status-get-controller.ts'
import { ThreadsGetController } from '~/controllers/v1/threads-get-controller.ts'
import { ThreadRepliesGetController } from '~/controllers/v1/threads/thread-replies-get-controller.ts'
import { UserGetController } from '~/controllers/v1/user-get-controller.ts'
import { UsersGetController } from '~/controllers/v1/users-get-controller.ts'
import { UserThreadsGetController } from '~/controllers/v1/users/user-threads-get-controller.ts'
import { StaticAssetsGetController } from '../controllers/v1/static-assets-get-controller.ts'

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
        children: [{
          path: '/:id',
          handler: UserGetController,
          children: [{
            path: '/threads',
            handler: UserThreadsGetController,
          }],
        }],
      },
      {
        path: '/threads',
        handler: ThreadsGetController,
        children: [{
          path: '/:id/replies',
          handler: ThreadRepliesGetController,
        }],
      },
      {
        path: '/images/*',
        handler: StaticAssetsGetController,
      },
    ],
  }],
  use: [
    logger(),
  ],
})
