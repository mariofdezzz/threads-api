import { SqliteMockClient } from '#/contexts/shared/sqlite-mock-client.ts'
import { ThreadMother } from '#/contexts/threads/domain/thread-mother.ts'
import { ThreadFinder } from '@/threads/application/finder/thread-finder.ts'
import { SqliteThreadRepository } from '@/threads/infrastructure/sqlite-thread-repository.ts'
import { assertEquals } from 'assert'

Deno.test('Should find an existing thread', async () => {
  const mockClient = await SqliteMockClient.build()
  const repository = new SqliteThreadRepository(mockClient.client)
  const finder = new ThreadFinder(repository)
  const thread = ThreadMother.random()

  await mockClient.insert('threads', thread)
  const foundThread = await finder.find(thread.id.value)

  assertEquals(foundThread?.id.value, thread.id.value)
})
