import { UserFinder } from '@/users/application/finder/user-finder.ts'
import { userRepository } from '~/container/repositories/user-repository.ts'

export const userFinder = new UserFinder(
  userRepository,
)
