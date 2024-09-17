import { ID } from '@/shared/domain/value-objects/id.ts'
import { UserRepository } from '@/users/domain/user-repository.ts'
import { User } from '@/users/domain/user.ts'

export class UserFinder {
  constructor(
    private readonly repository: UserRepository,
  ) {}

  async find(id: number): Promise<User | null> {
    const userId = new ID(id)

    return await this.repository.find(userId)
  }
}
