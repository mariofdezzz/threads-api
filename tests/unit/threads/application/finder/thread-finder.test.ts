import { MockRepository } from '#/shared/mock-repository.ts'
import { ThreadFinder } from '@/threads/application/finder/thread-finder.ts'
import { ThreadRepository } from '@/threads/domain/thread-repository.ts'
import { assertEquals } from 'assert'
import { ThreadMother } from '../../domain/thread-mother.ts'

Deno.test('Should find an existing thread', async () => {
  const thread = ThreadMother.random()
  const repository = MockRepository.on<ThreadRepository>('find', thread)
  const finder = new ThreadFinder(repository)

  const foundThread = await finder.find(thread.id.value)

  assertEquals(foundThread?.id.value, thread.id.value)
})

Deno.test('Should not find a non-existing thread', async () => {
  const repository = MockRepository.on<ThreadRepository>('find', null)
  const finder = new ThreadFinder(repository)

  const foundThread = await finder.find(0)

  assertEquals(foundThread, null)
})
