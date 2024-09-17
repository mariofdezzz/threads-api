import { UserSearcher } from '@/users/application/searcher/user-searcher.ts'
import { userRepository } from '~/container/repositories/user-repository.ts'

export const userSearcher = new UserSearcher(
  userRepository,
)
