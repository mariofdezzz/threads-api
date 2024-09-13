import { appUrl } from '#/shared/app-url.ts'
import { assertEquals } from 'assert'

Deno.test('Should get a thread', async () => {
  const response = await fetch(new URL('/threads/1', appUrl))
  const body = await response.json().catch(() => {})

  assertEquals(response.status, 200)
  assertEquals(body.id, 1)
})
