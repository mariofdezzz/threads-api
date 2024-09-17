import { UserRegistrar } from '@/users/application/registrar/user-registrar.ts'
import { eventBus } from '~/container/event/event-bus.ts'
import { userRepository } from '~/container/repositories/user-repository.ts'

export const userRegistrar = new UserRegistrar(
  userRepository,
  eventBus,
)
