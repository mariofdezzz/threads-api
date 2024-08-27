import { Repository } from '@/shared/domain/repository.ts'
import { User } from '@/users/domain/user.ts'

export interface UserRepository extends Repository<User> {}
