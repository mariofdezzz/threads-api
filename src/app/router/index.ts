import { Router } from 'toruk'
import { logger } from 'toruk/middlewares'
import { useJwt } from '~/container/jwt-middleware.ts'
import { StatusGetController } from '~/controllers/v1/status-get-controller.ts'
import { ThreadsGetController } from '../controllers/v1/threads/threads-get-controller.ts'
import { ThreadLikesDeleteController } from '../controllers/v1/threads/likes/thread-likes-delete-controller.ts'
import { ThreadRepliesGetController } from '../controllers/v1/threads/likes/thread-replies-get-controller.ts'
import { UserGetController } from '../controllers/v1/users/user-get-controller.ts'
import { UsersGetController } from '../controllers/v1/users/users-get-controller.ts'
import { UserThreadsGetController } from '../controllers/v1/users/threads/user-threads-get-controller.ts'
import { ImagesGetController } from '../controllers/v1/images-get-controller.ts'
import { ThreadLikesPutController } from '../controllers/v1/threads/likes/thread-likes-put-controller.ts'

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
        children: [
          {
            path: '/:id',
            children: [
              {
                path: '/replies',
                handler: ThreadRepliesGetController,
              },
              {
                path: '/likes',
                method: 'PUT',
                handler: ThreadLikesPutController,
                use: [useJwt],
              },
              {
                path: '/likes',
                method: 'DELETE',
                handler: ThreadLikesDeleteController,
                use: [useJwt],
              },
            ],
          },
        ],
      },
      {
        path: '/images/*',
        handler: ImagesGetController,
      },
    ],
  }],
  use: [
    logger(),
  ],
})
