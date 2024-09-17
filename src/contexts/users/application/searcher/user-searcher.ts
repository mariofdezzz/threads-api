import { Criteria } from '@/shared/domain/criteria/criteria.ts'
import { SearchResult } from '@/shared/domain/search-result.ts'
import { UserRepository } from '@/users/domain/user-repository.ts'
import { User } from '@/users/domain/user.ts'

export class UserSearcher {
  constructor(
    private readonly repository: UserRepository,
  ) {}

  async search(criteria?: Criteria): Promise<SearchResult<User>> {
    return await this.repository.search(criteria)
  }
}
