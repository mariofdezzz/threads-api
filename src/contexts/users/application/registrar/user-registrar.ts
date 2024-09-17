import { EventBus } from '@/shared/domain/event/event-bus.ts'
import { Primitives } from '@/shared/domain/primitives.ts'
import { UserRepository } from '@/users/domain/user-repository.ts'
import { User } from '@/users/domain/user.ts'

export class UserRegistrar {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async register(primitives: Primitives<User>) {
    const user = User.create(primitives)

    await this.repository.save(user)
    await this.eventBus.publish(user.pullDomainEvents())
  }
}
